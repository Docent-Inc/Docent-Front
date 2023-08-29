<template>
    <div class="title">닉네임을 알려주세요</div>

    <div class="input-box">
        <div class="title">닉네임</div>
        <input type="text" v-model="name" placeholder="슨트" />
    </div>
</template>

<script setup>
definePageMeta({
    layout: "signup",
});
const router = useRouter();
const name = ref("");
</script>

<style lang="scss" scoped></style>
