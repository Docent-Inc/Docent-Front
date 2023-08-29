<template>
    <div class="title">Mbti를 알려주세요</div>
    <div class="description">더 정확한 분석이 가능해요!</div>

    <div class="input-box">
        <div class="title">Mbti</div>
        <select-box :options="mbtiList" />
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
const mbti = ref("");
</script>

<style lang="scss" scoped>
.title {
    margin-bottom: 0;
}
.description {
    margin-bottom: 16px;
}
</style>
