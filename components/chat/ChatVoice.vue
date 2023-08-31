<template>
    <div class="chat-voice">
        <div>
            {{ data }}
        </div>
        <v-icon class="ic_voice big" @click="stop" />
    </div>
</template>

<script setup>
const data = ref("");

// Web Speech API
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ko";
recognition.continuous = true;

recognition.onresult = (e) => {
    for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
        let transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
            data.value += transcript;
            console.log("🎤 ", transcript);
        }
    }
};

// 1) start
onMounted(() => {
    recognition.start();
});

// 2) stop
const emit = defineEmits(["finish"]);
function stop() {
    if (recognition) recognition.stop();
    emit("finish", data.value);
}
</script>

<style lang="scss" scoped>
.chat-voice {
    width: 100%;
    height: 100%;
    // background: #00000067;
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;

    div {
        font-family: Pretendard;
        color: #010101;
        font-size: 14px;
        text-align: center;

        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        margin-bottom: calc(7.44rem + 15rem);
    }
}

.ic_voice.big {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    margin-bottom: 7.44rem;
    font-size: 15rem;
    z-index: 20;
}
</style>
