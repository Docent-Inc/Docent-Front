<template>
    <div class="viewport">
        <div class="video-container">
            <!-- <client-only>
                <video
                    class="video"
                    ref="videoRef"
                    autoplay
                    muted
                    playsinline
                    @ended="checkAutoLogin"
                >
                    <source :src="splashVideo" type="video/mp4" />
                </video>
            </client-only> -->

            <!-- <div id="logo_box"> -->
            <img
                src="@/assets/images/commons/logos/logo_v2_white.svg"
                id="logo"
                class="small"
            />
            <!-- </div> -->
        </div>
    </div>
</template>

<script setup>
import { useAuthService } from "~/services/auth";
import { useUserStore } from "~/store/user";
import splashVideo from "../assets/video/splash.mp4";

const { $native } = useNuxtApp();

const isChecked = ref(false);
const router = useRouter();
// console.log("check", isChecked.value); // TODO [김유신] 스플래시 영상 확인 용, 다음 배포 때 제거

onMounted(() => {
    setTimeout(() => {
        // isOnboarding = true, 온보딩 화면으로 이동
        const isOnboarding = window.localStorage.getItem("isOnboarding");
        if (!isOnboarding) {
            router.replace(`/onboarding`);
            return;
        }

        // isOnboarding = false, 자동 로그인 체크
        checkAutoLogin();
    }, 1000); // 1초
});

// console.log("Called!"); // TODO [김유신] 스플래시 영상 확인 용, 다음 배포 때 제거
async function checkAutoLogin() {
    // (1) 리프레시 토큰 존재하지 않으면 로그인 필요
    const refreshToken = useCookie("refresh_token").value;
    if (!refreshToken) {
        router.replace(`/signin`);
        return;
    }

    // (2) 리프레시 토큰 존재 시, 갱신
    const { refresh } = useAuthService();
    const res = await refresh(refreshToken);
    if (!res.success) {
        // 실패 시, 다 삭제하고 /signin으로 이동
        const { reset } = useUserStore();
        reset();
        useCookie("access_token").value = null;
        useCookie("refresh_token").value = null;
        router.replace(`/signin`);

        return;
    }

    // 성공 시, 저장 후 /chat 이동
    // 231216 - v2 /home -> /chat으로 진입점 변경
    const { setAccessToken, setRefreshToken, updateUser } = useUserStore();

    const now = new Date();
    const accessTokenExpires = new Date(
        now.getTime() + res.data.expires_in * 1000,
    );
    const refreshTokenExpires = new Date(
        now.getTime() + res.data.refresh_expires_in * 1000,
    );

    useCookie("access_token", {
        expires: accessTokenExpires,
    }).value = res.data.access_token;
    useCookie("expires_in", {
        expires: accessTokenExpires,
    }).value = String(accessTokenExpires);
    useCookie("refresh_token", {
        expires: refreshTokenExpires,
    }).value = res.data.refresh_token;

    setAccessToken(res.data.access_token);
    setRefreshToken(res.data.refresh_token);
    await updateUser();
    $native.reqFCMToken(); // FCM Token 갱신

    router.replace(`/chat`);
}
</script>

<style lang="scss" scoped>
.viewport {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--CTA_accent, #9398ff); // 9398FF a1a1ff
}

.video-container {
    width: 100%;
    // max-width: 1000px;
    display: flex;
    justify-content: center;
    margin-inline: auto;
}

video {
    width: 100%;
    height: auto;
}

#logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 167px;
    height: 216px;
}
</style>
