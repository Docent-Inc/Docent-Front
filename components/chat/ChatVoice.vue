<template>
    <div class="chat-voice" @click="stop">
        <div class="chat-voice-bg">
            <div>
                <img
                    src="@/assets/images/pages/chat/btn_mic_rec_bg2.svg"
                    class="animate__animated animate__pulse animate__infinite"
                />
            </div>

            <div>
                <img
                    src="@/assets/images/pages/chat/btn_mic_rec_bg1.svg"
                    class="animate__animated animate__pulse animate__infinite"
                />
            </div>

            <div>
                <img src="@/assets/images/pages/chat/btn_mic_rec.svg" />
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(["finish", "change"]);
defineExpose({
    cancel,
});
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
            // console.log("🎤 ", transcript);
            emit("change", data.value);
        }
    }
};

// 1) start
onMounted(() => {
    recognition.start();
});

// 2) stop & cancel
function stop() {
    if (recognition) recognition.stop();
    emit("finish", data.value);
}

function cancel() {
    if (recognition) recognition.stop();
    emit("finish", "");
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

.chat-voice-bg {
    position: relative;
    width: 146px;
    height: 146px;

    div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
