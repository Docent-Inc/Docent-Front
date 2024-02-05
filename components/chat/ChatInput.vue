<template>
<!--    <div class="chat-text" v-if="isOpen" ref="chatTextRef">-->
<!--        <div class="chat-text-top">-->
<!--            <Icon class="ic_arrow" @click="openTextarea(false)" />-->
<!--            <span class="header-title"> Looi </span>-->

<!--            <div-->
<!--                class="chat-text-sumbit"-->
<!--                v-if="isValidate.status"-->
<!--                @click="send"-->
<!--            >-->
<!--                <Icon class="ic_send" />입력 완료하기-->
<!--            </div>-->
<!--            <div class="chat-text-sumbit disabled" v-else @click="send">-->
<!--                <Icon class="ic_send_gray" />입력 완료하기-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="input">-->
<!--            <textarea-->
<!--                v-model="data"-->
<!--                maxlength="1000"-->
<!--                :class="{ warn: data.length === LIMITED_CONTENT_LENGTH }"-->
<!--            />-->
<!--            <div-->
<!--                class="character-count"-->
<!--                :class="{ warn: data.length === LIMITED_CONTENT_LENGTH }"-->
<!--            >-->
<!--                {{ data.length }} / {{ LIMITED_CONTENT_LENGTH }} 자-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->

    <div class="chat-input" ref="chatTextRef">
<!--        <div class="chat-select-box" v-if="!(mode === 'VOICE' || isGenerating)">-->
<!--            <div-->
<!--                v-for="(select, idx) in selectList"-->
<!--                :key="idx"-->
<!--                class="chat-select"-->
<!--                :class="{ selected: type === idx + 1 }"-->
<!--                @click="onSelect(idx)"-->
<!--            >-->
<!--                {{ select }}-->
<!--            </div>-->
<!--            <div class="chat-select" @click="onSelect(-1)">↩︎</div>-->
<!--        </div>-->

        <div class="chat-input-box">
            <div v-if="isGenerating" class="chat-loading">
                <img src="@/assets/images/pages/chat/loading-dot.gif" />
            </div>
            <div v-else>
                <div class="chat-input-top">
                    <Button
                        v-if="mode === 'INPUT'"
                        class="btn_mic"
                        @click="setMode('VOICE')"
                    />
                    <Button v-else class="btn_mic_x" @click="cancelVoice" />

                    <div class="input">
                        <textarea
                            v-model="data"
                            :placeholder="placeholder"
                            rows="1"
                            :class="{ voice: mode === 'VOICE' }"
                            :disabled="isGenerating"
                            @input="adjustTextAreaHeight"
                        />
                    </div>
                    <v-icon class="ic_send" @click="send" />
                </div>
                <chat-voice
                    v-if="mode === 'VOICE'"
                    ref="chatVoiceRef"
                    @change="(x) => (data = x)"
                    @finish="setData"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useChatStore } from "../../store/chat";
import Button from "~/components/common/Button.vue";
import Icon from "~/components/common/Icon.vue";
const LIMITED_CONTENT_LENGTH = 1000;

export default {
    name: "ChatInput",
    components: { Button, Icon },
    data() {
        return {
            mode: "INPUT",
            data: "",
            selectList: [`🌙  꿈 기록`, "✏️  일기", "🗒️  메모", "🗓️  일정"],
            isOpen: false,
            LIMITED_CONTENT_LENGTH: LIMITED_CONTENT_LENGTH,
            textAreaHeight: 0,
        };
    },
    setup() {},
    computed: {
        ...mapState(useChatStore, ["chatList", "isGenerating", "type"]),
        placeholder() {
            if (this.mode === "INPUT")
                return "Looi에게 당신의 이야기를 들려주세요";
            return "Looi가 듣고 있어요!";
        },
        isValidate() {
            if (!this.data || this.data === "")
                return {
                    status: false,
                    msg: "내용을 입력해 주세요.",
                };

            if (this.data.length > LIMITED_CONTENT_LENGTH)
                return {
                    status: false,
                    msg: `${LIMITED_CONTENT_LENGTH}자까지 입력 가능합니다.`,
                };

            return {
                status: true,
                msg: "",
            };
        },
    },
    mounted() {
        window.visualViewport.addEventListener("resize", this.resizeViewport);
        // 포커스가 있을 때 safe area 패딩을 조정하는 클래스 추가
        window.addEventListener('focusin', this.handleFocusIn);
        // 포커스가 사라질 때 클래스 제거
        window.addEventListener('focusout', this.handleFocusOut);
    },
    beforeUnmount() {
      // 이벤트 리스너 제거
      window.removeEventListener('focusin', this.handleFocusIn);
      window.removeEventListener('focusout', this.handleFocusOut);
    },
    beforeMount() {
        window.visualViewport.removeEventListener(
            "resize",
            this.resizeViewport,
        );
    },
    methods: {
        ...mapActions(useChatStore, ["sendChat", "removeLastChat", "setType"]),
      handleFocusIn() {
        console.log('focusin');
        if (this.$refs.chatTextRef) {
          this.$refs.chatTextRef.style.bottom = "0"; // 직접 bottom 스타일 속성 설정
        }
      },
      handleFocusOut() {
        console.log('focusout');
        if (this.$refs.chatTextRef) {
          // 원래 bottom 스타일로 되돌리기 (예를 들어 safe-area-inset-bottom을 사용했다면)
          this.$refs.chatTextRef.style.bottom = `calc(env(safe-area-inset-bottom))`;
        }
      },

      adjustTextAreaHeight($event) {
          const textarea = $event.target;
          const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10); // textarea의 line-height를 계산
          const maxRows = 5;
          const maxHeight = lineHeight * maxRows; // 최대 높이를 계산 (line-height * 최대 줄 수)

          textarea.style.height = "auto"; // textarea 높이를 auto로 임시 설정하여 현재 내용을 모두 담을 수 있는 높이를 계산
          const requiredHeight = textarea.scrollHeight; // 현재 내용을 모두 담기 위해 필요한 높이

          if (requiredHeight > maxHeight) {
            // 필요한 높이가 최대 높이보다 크면 최대 높이를 사용하고 스크롤바 활성화
            textarea.style.height = `${maxHeight}px`;
            textarea.style.overflowY = "scroll"; // 내용이 최대 높이를 초과할 경우 스크롤바 활성화
          } else {
            // 필요한 높이가 최대 높이 이하면 필요한 만큼만 높이 설정
            textarea.style.height = `${requiredHeight}px`;
            textarea.style.overflowY = "hidden"; // 스크롤바 비활성화
          }
        },
      onSelect(idx) {
            this.selected = idx;
            this.setType(idx + 1);
        },
        async send() {
            // Validation
            if (!this.isValidate.status) {
                this.$eventBus.$emit("onConfirmModal", {
                    title: this.isValidate.msg,
                });
                return;
            }
            if (this.isGenerating) return;
            this.openTextarea(false);
            const res = await this.sendChat(this.data);
            if (res.success) this.data = "";
            else {
                this.$eventBus.$emit("onConfirmModal", {
                    title: "채팅 생성에 실패했습니다.",
                    desc: res.message,
                });
            }
        },
        setData(res) {
            this.data = res;
            this.mode = "INPUT";
        },
        setMode(mode) {
            if (!this.isGenerating) this.mode = mode;
        },
        cancelVoice() {
            this.$eventBus.$emit("onCustomModal", {
                title: "정말 음성입력을 취소하시겠어요?",
                desc: "취소하시면 입력한 내용이 사라져요!",
                callback: () => {
                    this.$refs.chatVoiceRef.cancel();
                },
            });
        },
        openTextarea(to) {
            if (this.mode === "VOICE") return;
            this.isOpen = to;
        },
        // resizeViewport() {
        //     // console.log("RESIZE - ", window.visualViewport?.height);
        //     if (window.visualViewport && this.$refs.chatTextRef) {
        //         const currentVisualViewport = window.visualViewport.height;
        //         this.$refs.chatTextRef.style.height = `${currentVisualViewport}px`;
        //     }
        // },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.chat-text {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;

    // IOS safe-area 고려
    padding-bottom: env(safe-area-inset-bottom);
    padding-bottom: constant(safe-area-inset-bottom);

    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(16px);
    z-index: 998;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .chat-text-top {
        display: flex;
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 1.5rem;
        gap: 10px;
        z-index: 999;

        .chat-text-sumbit {
            position: absolute;
            top: 50;
            right: 1.5rem;

            border-radius: 8px;
            background: $vc-indigo-500;
            color: $vc-white;
            padding: 6px 12px;

            /* c1/c1_bold_12 */
            font-family: $font-bold;
            font-size: 12px;
            line-height: 160%; /* 19.2px */

            display: flex;
            gap: 8px;

            &.disabled {
                background: $vc-gray-200;
                color: $vc-gray-400;
                font-family: $font-default;
            }
        }
    }

    .input {
        width: 90%;
        height: calc(100% - (60px + 3rem));
        margin: 0 auto;

        flex-direction: column;
        justify-content: center;
        align-items: center;

        textarea {
            width: 100%;
            height: 100%;
        }

        .character-count {
            width: 100%;
            text-align: right;
            color: $vc-gray-500;
            font-size: 0.8em;

            &.warn {
                color: $vc-red-500;
            }
        }
    }
}

.chat-text-box {
    width: 100%;
    max-width: 500px;

    z-index: 998;
    position: fixed;
    top: 0;

    //padding-bottom: env(safe-area-inset-bottom);
    //padding-bottom: constant(safe-area-inset-bottom);
}

.chat-input {
    width: 100%;
    max-width: 500px;
    // height: calc(8rem + 3rem + 1.5rem); // 12.5rem

    z-index: 997;
    position: fixed;
    bottom: env(safe-area-inset-bottom);
    bottom: constant(safe-area-inset-bottom);
}
.chat-select-box {
    height: 3rem;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;

    display: flex;
    flex-wrap: wrap;
    gap: 8px; /* 각 아이템 사이의 간격 */

    .chat-select {
        border-radius: 8px;
        background: #f5f7fff4;
        color: $vc-gray-500;
        font-family: "Pretendard";
        font-size: 12px;
        line-height: 160%; /* 19.2px */
        padding: 8px 12px;
        cursor: pointer;

        white-space: pre;
    }

    .chat-select.selected {
        background: $vc-violet-200;
        color: $vc-violet-500;
        font-family: "Pretendard Medium";
    }
}
.chat-input-box {
    width: 100%;
    // height: 8rem;

    background: rgba(255, 255, 255, 255);
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);

    padding: 1.5rem 0;
}

.chat-input-top {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.ic_voice.big {
    position: absolute;
    bottom: 0;
    margin-bottom: 7.44rem;
    font-size: 15rem;
    z-index: 20;
}

.input {
    width: 70%;
    max-width: 500px;
    min-height: 48px;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    textarea {
        width: 100%;
        min-height: 48px;
        padding: 0.8em 1em 0.8em 1em;
        margin: 0 auto;
        border-radius: 10px;
        overflow: hidden;
        resize: none;

        background: $vc-indigo-100;
        color: $vc-gray-700;
        font-family: "Pretendard";
        font-size: 16px;
        line-height: calc(16px * 1.4); /* 150% */
    }
    textarea::placeholder {
        color: #50555c;
        font-size: 12px;
    }
    textarea.voice::placeholder {
        color: $vc-indigo-500;
        font-size: 14px;
        font-family: "Pretendard SemiBold";
        line-height: 160%; /* 22.4px */
    }
    textarea:focus {
        border: 1px solid $vc-indigo-400;
        outline: none;
    }
    textarea.warn {
        border: 1px solid $vc-red-400;
        outline: none;
    }
}

.chat-loading {
    width: 100%;
    height: 40px;
    // margin: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    padding: 2rem 1.5rem;

    img {
        height: 160px;
    }
}
.textarea {
  overflow-y: auto; // 스크롤이 필요할 때만 y축 스크롤바가 나타나도록 설정합니다.

  &::-webkit-scrollbar {
    display: none; // Webkit 브라우저(Chrome, Safari 등)에서 스크롤바를 숨깁니다.
  }

  -ms-overflow-style: none; // IE, Edge에서 스크롤바를 숨깁니다.
  scrollbar-width: none; // Firefox에서 스크롤바를 숨깁니다.
}
</style>
