<template>
    <div class="chat-input">
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
</template>

<script>
import { useGenerateService } from "../../services/generate";
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
        };
    },
    setup() {},
    computed: {
        ...mapState(useChatStore, ["chatList", "isGenerating"]),
        rows() {
            const minRows = 1;
            const maxRows = 3;
            const rows = this.data.split("\n").length;
            return Math.min(Math.max(rows, minRows), maxRows);
        },
        placeholder() {
            if (this.mode === "INPUT")
                return "Looki에게 당신의 이야기를 들려주세요";
            else return "Looki가 듣고 있어요!";
        },
    },
    methods: {
        ...mapActions(useChatStore, ["sendChat"]),
        async send() {
            // Validation
            if (!this.data || this.data === "") {
                alert("내용을 입력해 주세요.");
                return;
            }
            if (this.isGenerating) return;

            const res = await this.sendChat(this.data);
            if (res) this.data = "";
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
@import "@/assets/scss/colors.scss";

.chat-input {
    width: 100%;
    max-width: 500px;
    min-height: 10rem;
    background: rgba(255, 255, 255, 0.5);
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);

    padding: 1.5rem 0 3rem;
    z-index: 10;
    position: fixed;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    // display: flex;
    // justify-content: space-evenly;
    // align-items: center;
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
</style>
