<template>
    <main class="viewport container">
        <section class="logo-wrapper">
            <div class="logo-box">
                <Icon alt="Looi Logo" class="logo_look_white" />
                <h1 class="blind">looi</h1>
            </div>
            <h2>
                스스로를 돌아볼 수 있는 <br />
                당신만의 공간으로 초대합니다.
            </h2>
            <h3>나를 위한 기록을 시작해보세요.</h3>
        </section>

        <section class="oauth-wrapper">
            <article class="oauth-box kakao" @click="callSocialLogin('kakao')">
                <div class="oauth-box__logo kakao">
                    <Icon alt="Kakao Logo" class="logo_kakao" />
                </div>
                <h2 class="oauth-login">카카오로 로그인</h2>
            </article>
            <!-- <article class="oauth-box line">
                <div class="oauth-box__logo">
                    <v-icon alt="Line Logo" class="logo_line" />
                </div>

                <h2>라인으로 시작하기</h2>
            </article> -->
            <article
                v-if="isIOS"
                class="oauth-box apple"
                @click="callSocialLogin('apple')"
            >
                <div class="oauth-box__logo">
                    <v-icon alt="Apple Logo" class="logo_apple" />
                </div>

                <h2>Apple으로 계속하기</h2>
            </article>
        </section>
    </main>
</template>

<script>
import { useAuthService } from "../../services/auth";
import Toast from "~/components/common/Toast.vue";
import { isIOS } from "~/utils/utils";
import Icon from "~/components/common/Icon.vue";

export default {
    components: { Toast, Icon },
    data() {
        return {
            isOAuthFailed: false,
            isIOS: false,
        };
    },
    methods: {
        async callSocialLogin(service) {
            const { getSocialLogin } = useAuthService();
            const res = await getSocialLogin(service);
            if (res.success) {
                const { $native } = useNuxtApp();
                await $native.openKakaoLink(res.data.url);
            } else {
                this.isOAuthFailed = true;
                alert("로그인에 실패하였습니다.\n", res.message);
            }
        },
    },
    mounted() {
        this.isIOS = isIOS();
        const { $native } = useNuxtApp();
        $native.controlSafeArea(false);
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
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    .oauth-box {
        width: 100%;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        background: #000;

        font-family: $font-medium;
        padding-right: 1.5rem;

        &.kakao {
            color: $vc-gray-800;
            background: #fee500;
        }
        &.line {
            background: #06c755;
        }

        &.apple {
            background: $vc-black;
            color: $vc-white;
        }

        &__logo {
            margin-right: 1.2rem;
        }
    }
}
</style>
