<template>
    <div class="title">${닉네임} 님의 정보가 맞나요?</div>

    <div class="input-box">
        <div class="title">Mbti</div>
        <select-box :options="mbtiList" disabled="true" />
    </div>
    <div class="input-box">
        <div class="title">성별</div>
        <select-box :options="['남', '여']" disabled="true" />
    </div>
    <div class="input-box">
        <div class="title">나이</div>
        <input type="number" v-model="name" disabled />
    </div>
    <div class="input-box">
        <div class="title">닉네임</div>
        <input type="text" v-model="name" disabled />
    </div>

    <div class="button">입장하기</div>
</template>

<script setup>
definePageMeta({
    layout: "signup",
});
const mbtiList = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
];
const router = useRouter();
</script>

<style lang="scss" scoped></style>
