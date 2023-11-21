<template>
    <main class="viewport container">
        <header>
            <div>회원가입</div>
        </header>
        <div class="signup-form">
            <section class="guide-wrapper">
                <h1>
                    {{ step === 1 ? "가입을 환영해요!" : "거의 다 왔어요!" }}
                    <br />
                    프로필을 입력해주세요.
                </h1>
                <div class="guide">프로필은 나중에 변경하실 수 있어요.</div>
            </section>
            <section class="signup-prop">
                <div v-if="step === 1">
                    <label for="nickname">닉네임</label>
                    <SignUpNickname @update:nickname="nickname = $event" />
                </div>
                <div v-else>
                    <div class="signup-prop__title">성별</div>
                    <SignUpGender @update:gender="gender = $event" />
                </div>
            </section>

            <section class="signup-prop">
                <div v-if="step === 1">
                    <div class="signup-prop__title">MBTI</div>
                    <SignUpMBTI @update:mbtiType="mbti = $event" />
                </div>
                <div v-else>
                    <ModifyBirth @birthSelected="birthDay = $event" />
                </div>
            </section>

            <button
                v-if="step === 1"
                type="button"
                class="submit-button"
                :disabled="!nickname || !(mbti.length === 4)"
                @click="changeComponent"
            >
                다음
            </button>
            <button
                v-else
                type="submit"
                class="submit-button"
                :disabled="!gender || !birthDay"
                @click="signUp"
            >
                가입 완료하기
            </button>
        </div>
    </main>
</template>

<script>
import { mapActions } from "pinia";
import SignUpNickname from "~/components/signup/SignUpNickname.vue";
import SignUpMBTI from "~/components/signup/SignUpMBTI.vue";
import SignUpGender from "~/components/signup/SignUpGender.vue";
import ModifyBirth from "~/components/profile-modify/ModifyBirth.vue";
import { useAuthService } from "~/services/auth";
import { useUserStore } from "~/store/user";

export default {
    components: { SignUpNickname, SignUpMBTI, SignUpGender, ModifyBirth },
    data() {
        return {
            nickname: "",
            mbti: "",
            gender: "",
            birthDay: "",
            step: 1,
        };
    },
    methods: {
        ...mapActions(useUserStore, ["updateUser"]),
        changeComponent() {
            if (this.step === 1) this.step = 2;
        },
        async signUp(event) {
            event.preventDefault();

            const requestBody = {
                nickname: this.nickname,
                mbti: this.mbti,
                birth: this.birthDay,
                gender: this.gender,
            };

            const { signup } = useAuthService();

            const res = await signup(requestBody);
            console.log(res);

            if (res.success) {
                await this.updateUser();
                this.$router.push(`/home`);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.container {
    padding: $padding-default;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    header {
        width: 100%;
        height: 32px;
        font-family: $font-semi-bold;
    }

    .signup-form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}
.guide-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;

    h1 {
        margin: 3.6rem 0 1.2rem 0;
        font-size: 2.4rem;
        font-family: $font-bold;
    }

    .guide {
        font-size: 1.4rem;
        color: $vc-gray-400;
        margin-bottom: 1rem;
    }
}

.signup-prop {
    width: 100%;

    h2,
    label {
        display: block;
        font-family: $font-medium;
        margin-bottom: 1.2rem;
    }

    &__title {
        margin-bottom: 1.2rem;
    }
}

.submit-button {
    width: 100%;
    height: 48px;
    background: $vc-accent;
    color: $vc-white;
    font-family: $font-medium;
    border-radius: 12px;

    &:disabled {
        background: $vc-gray-200;
        color: $vc-gray-400;
    }
}
</style>
