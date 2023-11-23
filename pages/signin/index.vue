<template>
    <main class="viewport container">
        <section class="logo-wrapper">
            <div class="logo-box">
                <v-icon alt="Look Logo" class="logo_look_white" />
                <h1 class="blind">look</h1>
            </div>
            <h2>
                스스로를 돌아볼 수 있는 <br />
                당신만의 공간으로 초대합니다.
            </h2>
            <h3>나를 위한 기록을 시작해보세요.</h3>
        </section>
        <section class="oauth-wrapper">
            <article class="oauth-box" @click="callKakaoLogin">
                <div class="oauth-box__logo kakao">
                    <v-icon alt="Kakao Logo" class="logo_kakao" />
                </div>
                <h2 class="oauth-login">카카오로 로그인</h2>
            </article>
            <!-- <article class="oauth-box">
                <div class="oauth-box__logo">
                    <v-icon alt="Line Logo" class="logo_line" />
                </div>

                <h2>라인으로 시작하기</h2>
            </article> -->
        </section>
    </main>
    <!-- 토스트 -->
    <Toast
        v-if="isOAuthFailed"
        @click="isOAuthFailed = false"
        text="로그인에 실패했습니다. 다시 시도해주세요."
        :top="60"
    />
</template>

<script>
import { useAuthService } from "../../services/auth";
import Toast from "~/components/common/Toast.vue";

export default {
    components: { Toast },
    data() {
        return {
            isOAuthFailed: false,
        };
    },
    methods: {
        async callKakaoLogin() {
            const { getKakaoLogin } = useAuthService();
            const res = await getKakaoLogin();

            if (res.success) {
                window.location.href = res.data.url;
            } else {
                this.isOAuthFailed = true;
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
    color: $vc-white;
    width: 100%;
    height: 100%;
    background: get-gradient-bg-accent(180);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.logo-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo-box {
        width: 153px;
        height: 70px;

        i {
            width: 100%;
            height: 100%;
        }
    }

    h2 {
        margin: 3.6rem 0 1.2rem 0;
        font-size: 2.4rem;
        text-align: center;
        font-family: $font-bold;
    }
}

.oauth-wrapper {
    width: 100%;
    height: 48px;
    .oauth-box {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        background: #06c755;
        margin-bottom: 1.2rem;
        font-family: $font-medium;
        padding-right: 1.5rem;

        &:nth-child(1) {
            color: $vc-gray-800;
            background: #fee500;
        }

        &__logo {
            width: 35px;
            height: 35px;
            margin-right: 1.2rem;

            i {
                width: 100%;
                height: 100%;
            }

            &.kakao {
                width: 45px;
                height: 45px;
            }
        }
    }
}
</style>
