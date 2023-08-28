<template>
    <h1>성별을 알려주세요</h1>

    <input type="text" v-model="gender" />
    <input type="text" disabled />
    <input type="text" disabled />
</template>

<script setup>
definePageMeta({
    layout: "signup",
});
const router = useRouter();
const gender = ref("");
</script>

<style lang="scss" scoped></style>
