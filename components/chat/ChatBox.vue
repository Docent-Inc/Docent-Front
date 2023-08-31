<template>
    <!-- 프로필 -->
    <div class="chat-profile" v-if="isDocent">
        <v-icon class="ic_docent" />
        <div>도슨트</div>
    </div>

    <!-- 로딩 -->
    <div class="chat-box loading" v-if="isLoading">
        <lottie :width="100" :options="lottieOptions" />
    </div>
    <!-- 기본 -->
    <div class="chat-box" v-else>
        {{ text }}
    </div>
</template>
<script setup>
// Lottie Setting
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "../../assets/images/loading-dot.json";
const lottieOptions = {
    animationData: animationData.default,
    rendererSettings: {
        viewBoxSize: "480 250 960 540",
    },
};

const props = defineProps({
    isLoading: { type: Boolean, required: false, default: false },
    isDocent: { type: Boolean, required: false, default: false },
    text: { type: String, required: false, default: "" },
});
</script>

<style lang="scss" scoped>
.chat-box {
    display: flex;
    padding: 1.0625rem 2rem;
    align-items: center;

    max-width: 90%;
    border-radius: 0.625rem;
    border: 0.3px solid #000;
    margin-bottom: 1.5rem;

    color: #010101;
    font-family: "Pretendard";
    font-size: 14px;
    line-height: 21px; /* 150% */
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
}

.chat-box.loading {
    width: 78px;
    height: 50px;
    padding: 0;
}

.chat-profile {
    display: flex;
    margin-bottom: 0.5rem;
    align-items: center;

    color: #010101;
    font-family: Pretendard;
    font-size: 14px;

    .ic_docent {
        margin-right: 5px;
        font-size: 18px;
    }
}
</style>
