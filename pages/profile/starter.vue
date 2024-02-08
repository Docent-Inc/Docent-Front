<template>
    <main class="viewport container">
        <header>
            <div>회원가입</div>
        </header>
        <section v-if="step === 0" class="signup-form">
            <div class="guide-wrapper">
                <h1>
                    프로필을 작성하기 전,
                    <br />
                    서비스 이용 약관을 확인해주세요.
                </h1>
            </div>
            <div>
                <article class="signup-prop">
                    <SignUpTerms @all-checkboxes-checked="handleAllCheck" />
                </article>
                <button
                    type="button"
                    class="submit-button"
                    :disabled="!isAllChecked"
                    @click="changeComponent"
                >
                    프로필 입력하러가기
                </button>
            </div>
        </section>
        <section v-else class="signup-form">
            <div class="guide-wrapper">
                <h1>
                    {{ step === 1 ? "가입을 환영해요!" : "거의 다 왔어요!" }}
                    <br />
                    프로필을 입력해주세요.
                </h1>
                <div class="guide">프로필은 나중에 변경하실 수 있어요.</div>
            </div>
            <article class="signup-prop">
                <div v-if="step === 1">
                    <label for="nickname">닉네임</label>
                    <SignUpNickname @update:nickname="nickname = $event" />
                </div>
                <div v-else>
                    <div class="signup-prop__title">성별</div>
                    <SignUpGender @update:gender="gender = $event" />
                </div>
            </article>

            <article class="signup-prop">
                <div v-if="step === 1">
                    <div class="signup-prop__title">MBTI</div>
                    <SignUpMBTI @update:mbtiType="mbti = $event" />
                </div>
                <div v-else>
                    <ModifyBirth
                        @birthSelected="onBirthSelected"
                        @onStopSubmit="onStopSubmit"
                    />
                </div>
            </article>

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
                :disabled="!gender"
                @click="signUp"
            >
                가입 완료하기
            </button>
        </section>
    </main>
</template>

<script>
import { mapActions } from "pinia";
import SignUpTerms from "~/components/signup/SignUpTerms.vue";
import SignUpNickname from "~/components/signup/SignUpNickname.vue";
import SignUpMBTI from "~/components/signup/SignUpMBTI.vue";
import SignUpGender from "~/components/signup/SignUpGender.vue";
import ModifyBirth from "~/components/profile-modify/ModifyBirth.vue";
import { useAuthService } from "~/services/auth";
import { useUserStore } from "~/store/user";

export default {
    components: {
        SignUpTerms,
        SignUpNickname,
        SignUpMBTI,
        SignUpGender,
        ModifyBirth,
    },
    data() {
        return {
            step: 0,
            isAllChecked: false,
            nickname: "",
            mbti: "",
            gender: "",
            birthDay: "2023-07-12",
            isDataChanged: false,
        };
    },
    beforeMount() {
        const { $native } = useNuxtApp();
        $native.controlSafeArea(true);
    },
    methods: {
        ...mapActions(useUserStore, ["updateUser"]),
        handleAllCheck(allChecked) {
            this.isAllChecked = allChecked();
        },
        changeComponent() {
            if (this.step !== 2) this.step++;
        },
        onStopSubmit(value) {
            this.isDataChanged = value;
        },
        onBirthSelected(newBirth) {
            this.birthDay = newBirth;
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

            // 231216 - v2 /home -> /chat으로 진입점 변경
            if (res.success) {
                await this.updateUser();
                this.$router.push(`/chat`);
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
