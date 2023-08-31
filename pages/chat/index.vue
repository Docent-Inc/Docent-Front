<template>
    <chat-box :is-loading="true" />
    <chat-box
        :is-docent="true"
        text="hi안녕하세요오오오오오ㅗ오반갑습니다라어리니러널ㄴ얼ㅇ널ㅇ너리ㅏㄴ어라ㅣㅇ너라ㅣ너라ㅓㄴd와라라라라라라라런이러ㅣ넝라ㅣ너"
    />
    <chat-result type="1" />
    <chat-result type="2" />
    <chat-result type="3" />
    <chat-result type="4" />
</template>

<script setup>
definePageMeta({
    layout: "chat",
});

import { useChatService } from "../../services/chat";
const { getChatList } = useChatService();
onMounted(async () => {
    const res = await getChatList(1);
    console.log(res);
});

// TODO: lottie test
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "../../assets/images/loading-dot.json";
const anim = ref(null);
const lottieOptions = { animationData: animationData.default };

const handleAnimation = (newAnim) => {
    console.log(newAnim);
    anim.value = newAnim;
};
</script>

<style lang="scss" scoped></style>
