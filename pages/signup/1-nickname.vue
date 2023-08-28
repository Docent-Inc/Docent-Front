<template>
    <h1>닉네임을 알려주세요</h1>

    <input type="text" v-model="name" />
</template>

<script setup>
definePageMeta({
    layout: "signup",
});
const router = useRouter();
const name = ref("");
</script>

<style lang="scss" scoped></style>
