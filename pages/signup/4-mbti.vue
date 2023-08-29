<template>
    <div class="title">Mbti를 알려주세요</div>
    <div class="description">더 정확한 분석이 가능해요!</div>

    <div class="input-box">
        <div class="title">Mbti</div>
        <select-box
            :options="mbtiList"
            @input="(selected) => (mbti = selected)"
        />
    </div>
    <div class="input-box">
        <div class="title">성별</div>
        <select-box
            :options="['남', '여']"
            :disabled="true"
            :default="user.gender"
        />
    </div>
    <div class="input-box">
        <div class="title">나이</div>
        <input type="number" v-model="user.age" disabled />
    </div>
    <div class="input-box">
        <div class="title">닉네임</div>
        <input type="text" v-model="user.nickname" disabled />
    </div>

    <div class="button" :class="{ disabled: !isValidate }" @click="saveMbti">
        다음
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useSignupStore } from "~/store/signup";

export default defineNuxtComponent({
    name: "4-Mbti",
    setup() {
        definePageMeta({
            layout: "signup",
        });
    },
    data() {
        return {
            mbti: "",
            mbtiList: [
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
            ],
        };
    },
    computed: {
        ...mapState(useSignupStore, ["user"]),
        isValidate() {
            return this.mbti !== "";
        },
    },
    methods: {
        saveMbti() {
            // Validation
            if (!this.isValidate) {
                alert("나이는 1글자 이상이어야 합니다.");
                return;
            }

            const { setMbti } = useSignupStore();
            setMbti(this.mbti);
            this.$router.push(`/signup/5-result`);
        },
    },
});
</script>

<style lang="scss" scoped>
.title {
    margin-bottom: 0;
}
.description {
    margin-bottom: 16px;
}
</style>
