<template>
    <div class="title">{{ user.nickname }} 님의 정보가 맞나요?</div>

    <div class="input-box">
        <div class="title">Mbti</div>
        <select-box :options="mbtiList" :disabled="true" :default="user.mbti" />
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

    <div class="button" @click="signup">입장하기</div>
</template>

<script>
import { mapState } from "pinia";
import { useSignupStore } from "~/store/signup";
import { useAuthService } from "../../services/auth";

export default defineNuxtComponent({
    name: "4-Mbti",
    setup() {
        definePageMeta({
            layout: "signup",
        });
    },
    data() {
        return {
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
    },
    methods: {
        async signup() {
            console.log(this.user);
            const { signup } = useAuthService();

            const res = await signup(this.user);
            console.log(res);

            if (res.success) {
                this.$router.push(`/home`);
            }
        },
    },
});
</script>

<style lang="scss" scoped></style>
