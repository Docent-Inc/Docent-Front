<template>
    <div class="title">닉네임을 알려주세요</div>
    <div class="input-box">
        <div class="title">닉네임</div>
        <input
            type="text"
            v-model="nickname"
            placeholder="슨트"
            @keyup.enter="saveNickname"
        />
    </div>
    <div
        class="button fixed-bottom"
        :class="{ disabled: !isValidate }"
        @click="saveNickname"
    >
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
            nickname: "",
        };
    },
    computed: {
        ...mapState(useSignupStore, ["user, step"]),
        isValidate() {
            return this.nickname !== "";
        },
    },
    methods: {
        saveNickname() {
            if (!this.isValidate) {
                alert("닉네임은 1글자 이상이어야 합니다.");
                return;
            }

            const { setNickname, setStep } = useSignupStore();
            setNickname(this.nickname);
            setStep(1);

            this.$router.push(`/signup/2-age`);
        },
    },
});
</script>

<style lang="scss" scoped></style>
