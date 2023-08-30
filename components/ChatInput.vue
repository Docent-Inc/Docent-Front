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
                @keydown.enter="send"
                placeholder="도슨트에게 당신의 이야기를 들려주세요"
            />
            <v-icon class="ic_send" @click="send" />
        </div>
    </div>

    <chat-voice v-if="mode === 'VOICE'" @finish="setData" />
</template>

<script lang="ts" setup>
import { useGenerateService } from "../services/generate";
const { generateChat } = useGenerateService();

const mode = ref<string>("INPUT"); // INPUT, VOICE
const data = ref<string>("");

const send = async () => {
    // TODO: Validation
    console.log("data", data.value);

    const res = await generateChat(data.value);
    console.log(res);
};

const setData = (res: string) => {
    data.value = res;
    mode.value = "INPUT";
};
</script>

<style lang="scss" scoped>
.chat-input {
    width: 100%;
    max-width: 500px;
    height: 8rem;
    background: #fff;

    padding: 1.5rem 0;
    z-index: 10;
    position: sticky;
    bottom: 0;

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
        font-size: 14px;
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
