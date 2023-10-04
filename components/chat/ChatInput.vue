<template>
    <div class="chat-input">
        <v-icon
            class="ic_voice"
            v-if="mode === 'INPUT'"
            @click="mode = 'VOICE'"
        />
        <div class="input">
            <input
                type="text"
                v-model="data"
                placeholder="도슨트에게 당신의 이야기를 들려주세요"
                :disabled="isGenerating"
            />
            <v-icon class="ic_send" @click="send" />
        </div>
    </div>

    <chat-voice v-if="mode === 'VOICE'" @finish="setData" />
</template>

<script>
import { useGenerateService } from "../../services/generate";
import { mapState, mapActions } from "pinia";
import { useChatStore } from "../../store/chat";

export default {
    name: "ChatInput",
    data() {
        return {
            mode: "INPUT", // INPUT, VOICE
            data: "",
            isGenerating: false,
        };
    },
    setup() {},
    computed: {
        ...mapState(useChatStore, ["chatList"]),
    },
    methods: {
        ...mapActions(useChatStore, [
            "setChatList",
            "getFirstPage",
            "setReload",
        ]),
        async send() {
            // Validation
            if (!this.data || this.data === "") {
                alert("내용을 입력해 주세요.");
                return;
            }

            if (this.isGenerating) return;

            const { generateChat } = useGenerateService();

            // 로딩 컴포넌트 추가
            const list = this.chatList;
            list.push({ content_type: 7 });
            this.setChatList(list);
            this.isGenerating = true;
            // this.setReload(true);

            const res = await generateChat(this.data);
            console.log("✨generateChat >>> ", this.data);

            if (!res.success) {
                const msg = `${res.status_code}  - ${res.message}`;
                console.log("Error! > ", msg, res);
                alert(msg);
            }

            this.data = "";
            this.getFirstPage();
            this.isGenerating = false;
        },
        setData(res) {
            this.data = res;
            this.mode = "INPUT";
        },
    },
};
</script>

<style lang="scss" scoped>
.chat-input {
    width: 100%;
    max-width: 500px;
    height: 10rem;
    background: #fff;

    padding-top: 1.5rem;
    padding-bottom: 3rem;
    z-index: 10;
    position: fixed;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    display: flex;
    justify-content: center;
    align-items: center;
    .ic_voice {
        font-size: 56px;
    }
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
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
        width: 100%;
        height: 100%;
        padding: 0.8em 2.5em 0.8em 1em;
        margin: 0 auto;
        border-radius: 10px;
        border: 0.3px solid #000;
        color: #000;
        font-family: "Pretendard";
        font-size: 16px;
        line-height: 1.3125rem; /* 150% */
    }
    input::placeholder {
        color: #50555c;
    }
    .ic_send {
        position: absolute;
        right: 0;
        margin-right: 1rem;
        font-size: 15px;
    }
}
</style>
