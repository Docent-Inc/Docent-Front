<template>
    <div class="title">성별을 알려주세요</div>

    <div class="input-box">
        <div class="title">나이</div>
        <select-box
            :options="['남', '여']"
            @input="(selected) => (gender = selected)"
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

    <div class="button" :class="{ disabled: !isValidate }" @click="saveGender">
        다음
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useSignupStore } from "~/store/signup";

export default defineNuxtComponent({
    name: "1-Nickname",
    setup() {
        definePageMeta({
            layout: "signup",
        });
    },
    data() {
        return {
            gender: "",
        };
    },
    computed: {
        ...mapState(useSignupStore, ["user", "step"]),
        isValidate() {
            return this.gender !== "";
        },
    },
    mounted() {
        if (this.step !== 2) {
            this.$router.push(`/signup/1-nickname`);
        }
    },
    methods: {
        saveGender() {
            // Validation
            if (this.gender === "") {
                alert("나이는 1글자 이상이어야 합니다.");
                return;
            }

            const { setGender, setStep } = useSignupStore();
            setGender(this.gender);
            setStep(3);
            this.$router.push(`/signup/4-mbti`);
        },
    },
});
</script>

<style lang="scss" scoped></style>
