<template>
    <lottie
        :width="100"
        :height="100"
        :options="lottieOptions"
        v-on:animCreated="handleAnimation"
    />
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
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
