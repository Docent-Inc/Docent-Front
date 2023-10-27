<template>
    <div class="chat-voice" @click="stop">
        <!-- <div>
            {{ data }}
        </div> -->
        <div
            class="chat-voice-bg2 animate__animated animate__pulse animate__infinite"
        >
            <div
                class="chat-voice-bg1 animate__animated animate__infinite animate__pulse"
            >
                <img src="@/assets/images/btn_mic_rec.svg" />
            </div>
        </div>
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
            emit("change", data.value);
        }
    }
};

// 1) start
onMounted(() => {
    // recognition.start();
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
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3rem 0 0;
}

.chat-voice-bg1 {
    background: url("../../assets/images/btn_mic_rec_bg1.svg") no-repeat
        center/cover;
    width: 116px;
    height: 116px;

    display: flex;
    justify-content: center;
    align-items: center;
}
.chat-voice-bg2 {
    background: url("../../assets/images/btn_mic_rec_bg2.svg") no-repeat
        center/cover;
    width: 146px;
    height: 146px;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
