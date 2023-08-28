<template>
    <h1>슨트 님의 정보가 맞나요?</h1>

    <input type="text" disabled />
    <input type="text" disabled />
    <input type="text" disabled />
    <input type="text" disabled />

    <button>입장하기</button>
</template>

<script setup>
definePageMeta({
    layout: "signup",
});
const router = useRouter();
</script>

<style lang="scss" scoped></style>
