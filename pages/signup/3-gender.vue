<template>
    <div class="title">성별을 알려주세요</div>

    <div class="input-box">
        <div class="title">나이</div>
        <select-box :options="['남', '여']" />
    </div>
    <div class="input-box">
        <div class="title">나이</div>
        <input type="number" v-model="name" disabled />
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
const gender = ref("");
</script>

<style lang="scss" scoped></style>
