<template>
    <div class="chat-input">
        <div class="chat-select-box">
            <div
                v-for="(select, idx) in selectList"
                :key="idx"
                class="chat-select"
                :class="{ selected: type === idx + 1 }"
                @click="onSelect(idx)"
            >
                {{ select }}
            </div>
        </div>
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
                            :disabled="isGenerating || mode === 'VOICE'"
                            :rows="rows"
                            :class="{ voice: mode === 'VOICE' }"
                        />

                        <Button
                            v-if="mode === 'INPUT'"
                            class="btn_send"
                            @click="send"
                        />
                    </div>
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

export default {
    name: "ChatInput",
    components: { Button },
    data() {
        return {
            mode: "INPUT",
            data: "",
            selectList: [`🌙  꿈 기록`, "✏️  일기", "🗒️  메모", "🗓️  일정"],
        };
    },
    setup() {},
    computed: {
        ...mapState(useChatStore, ["chatList", "isGenerating", "type"]),
        rows() {
            const minRows = 1;
            const maxRows = 3;
            const rows = this.data.split("\n").length;
            return Math.min(Math.max(rows, minRows), maxRows);
        },
        placeholder() {
            if (this.mode === "INPUT")
                return "Look-i에게 당신의 이야기를 들려주세요";
            else return "Look-i가 듣고 있어요!";
        },
    },
    methods: {
        ...mapActions(useChatStore, ["sendChat", "removeLastChat", "setType"]),
        onSelect(idx) {
            this.selected = idx;
            this.setType(idx + 1);
        },
        async send() {
            // Validation
            if (!this.data || this.data === "") {
                alert("내용을 입력해 주세요.");
                return;
            }
            if (this.isGenerating) return;

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
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.chat-input {
    width: 100%;
    max-width: 500px;

    z-index: 998;
    position: fixed;
    bottom: 0;

    padding-bottom: env(safe-area-inset-bottom);
    padding-bottom: constant(safe-area-inset-bottom);
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
    min-height: 10rem;

    background: rgba(255, 255, 255, 0.5);
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
    width: 80%;
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
        padding: 0.8em 48px 0.8em 1em;
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

    .btn_send {
        position: absolute;
        right: 0;
    }
}

.chat-loading {
    width: 100%;
    height: 40px;
    margin: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    padding: 2rem 1.5rem;

    img {
        height: 160px;
    }
}
</style>
