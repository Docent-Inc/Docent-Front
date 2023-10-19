<template>
    <div class="chat-box-wrapper" :class="{ right: type === 'text' }">
        <!-- 프로필 -->
        <div class="chat-profile" v-if="type === 'docent'">
            <Icon class="ic_profile_ai" />
        </div>

        <!-- 날짜 -->
        <div class="chat-date" v-if="type === 'date'">
            {{ $dayjs(text).format("YYYY년 M월 D일") }}
        </div>

        <!-- 로딩 -->
        <div class="chat-box loading" v-if="type === 'loading'">
            <img :src="loadingGIF" />
        </div>

        <!-- 기본 (도슨트) -->
        <div class="chat-box" v-if="type === 'text2'">{{ text }}</div>

        <!-- 기본 (유저) -->
        <div class="chat-box" v-if="type === 'text'">{{ text }}</div>
    </div>
</template>
<script setup>
import loadingGIF from "../../assets/images/loading-dot.gif";
import Icon from "~/components/common/Icon.vue";
// Lottie Setting
// import lottie from "vue-lottie/src/lottie.vue";
// import lottie from "lottie-web";
// import LoadingDotJSON from "../../assets/images/loading-dot.json";
// import * as animationData from "../../assets/images/loading-dot.json";
// const lottieOptions = {
//     animationData: animationData.nginx.conf,
//     rendererSettings: {
//         viewBoxSize: "480 250 960 540",
//     },
// };

const props = defineProps({
    type: { type: String, required: false, default: "text" },
    text: { type: String, required: false, default: "" },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/colors.scss";
.chat-box-wrapper {
    display: flex;
    justify-content: flex-start;
}
.chat-box-wrapper.right {
    justify-content: flex-end;
}
.chat-box {
    display: flex;
    align-items: center;
    max-width: 90%;

    padding: 12px;
    margin-bottom: 1.5rem;

    color: $vc-indigo-700;
    background: $vc-indigo-200;
    border-radius: 8px;

    font-family: "Pretendard Medium";
    font-size: 14px;
    line-height: 160%;

    white-space: normal;
    word-break: break-all;
    overflow: hidden;
}
.chat-box.right {
    align-self: right;
}
.chat-box.loading {
    width: 78px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    padding: 2rem 1.5rem;
    border-radius: 0.625rem;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    img {
        width: 500%;
        margin-top: 150%;
    }
}
.chat-profile {
    margin: 1rem 0;
}
.chat-date {
    color: $vc-gray-500;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.6);

    text-align: center;
    font-family: "Pretendard";
    font-size: 12px;
    line-height: 160%;
    margin: 2rem auto;
    padding: 6px 42px;
}
</style>
