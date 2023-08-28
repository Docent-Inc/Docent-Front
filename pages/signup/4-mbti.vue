<template>
    <h1>Mbti를 알려주세요</h1>
    <h3>더 정확한 분석이 가능해요!</h3>

    <input type="text" v-model="mbti" />
    <input type="text" disabled />
    <input type="text" disabled />
    <input type="text" disabled />
</template>

<script setup>
definePageMeta({
    layout: "signup",
});
const router = useRouter();
const mbti = ref("");
</script>

<style lang="scss" scoped></style>
