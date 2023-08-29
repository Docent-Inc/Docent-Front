<template>
    <div class="title">나이를 알려주세요</div>

    <div class="input-box">
        <div class="title">나이</div>
        <input type="number" v-model="name" />
    </div>
    <div class="input-box">
        <div class="title">닉네임</div>
        <input type="text" v-model="name" disabled />
    </div>
</template>

<script setup>
definePageMeta({
    layout: "signup",
});
const router = useRouter();
const age = ref("");
</script>

<style lang="scss" scoped></style>
