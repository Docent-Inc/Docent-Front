<template>
    <div class="chat-box-wrapper" :class="{ right: type === 'text' }">
        <!-- 프로필 -->
        <div class="chat-profile" v-if="type === 'docent'">
            <v-icon class="ic_docent" />
            <div>도슨트</div>
        </div>

        <!-- 기본 -->
        <div class="chat-date" v-if="type === 'date'">
            {{ $dayjs(text).format("YYYY년 M월 D일") }}
        </div>

        <!-- 로딩 -->
        <div class="chat-box loading" v-if="type === 'loading'">
            <img :src="loadingGIF" />
        </div>

        <!-- 기본 -->
        <div class="chat-box" v-if="type === 'text'">{{ text }}</div>
    </div>
</template>
<script setup>
import loadingGIF from "../../assets/images/loading-dot.gif";
// Lottie Setting
// import lottie from "vue-lottie/src/lottie.vue";
// import lottie from "lottie-web";
// import LoadingDotJSON from "../../assets/images/loading-dot.json";
// import * as animationData from "../../assets/images/loading-dot.json";
// const lottieOptions = {
//     animationData: animationData.default,
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
.chat-box-wrapper {
    display: flex;
    justify-content: flex-start;
}
.chat-box-wrapper.right {
    justify-content: flex-end;
}
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
    display: flex;
    margin: 0.5rem 0;
    align-items: center;

    color: #010101;
    font-family: Pretendard;
    font-size: 14px;

    .ic_docent {
        margin-right: 5px;
        font-size: 18px;
    }
}

.chat-date {
    width: 100%;
    text-align: center;
    color: #50555c;
    text-align: center;
    font-family: "Pretendard";
    font-size: 0.6875rem;
    line-height: 1.3125rem; /* 190.909% */
    margin: 0 0 2rem 0;
}
</style>
