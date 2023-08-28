<template>
    <h1>나이를 알려주세요</h1>

    <input type="text" v-model="name" />
    <input type="text" disabled />
</template>

<script setup>
definePageMeta({
    layout: "signup",
});
const router = useRouter();
const age = ref("");
</script>

<style lang="scss" scoped></style>
