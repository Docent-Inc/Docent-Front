<template>
    <div class="viewport">
        <div class="video-container">
            <client-only>
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
            </client-only>
        </div>
    </div>
</template>

<script setup>
import { useAuthService } from "~/services/auth";
import { useUserStore } from "~/store/user";
import splashVideo from "../assets/video/splash.mp4";

const isChecked = ref(false);
const router = useRouter();

onMounted(() => {
    setTimeout(() => {
        console.log("check", isChecked.value); // TODO [김유신] 스플래시 영상 확인 용, 다음 배포 때 제거
        if (!isChecked.value) checkAutoLogin();
    }, 5000);
});

async function checkAutoLogin() {
    console.log("Called!"); // TODO [김유신] 스플래시 영상 확인 용, 다음 배포 때 제거
    isChecked.value = true;

    const { accessToken, refreshToken } = useUserStore();
    if (!accessToken || !refreshToken) router.push(`/signin`);

    const { refresh } = useAuthService();
    refresh(refreshToken)
        .then((res) => {
            // 성공 시, 액세스 토큰 저장 후 /home 이동
            const { setAccessToken, setRefreshToken, setUser } = useUserStore();

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
            useCookie("refresh_token", {
                expires: refreshTokenExpires,
            }).value = res.data.refresh_token;

            setAccessToken(res.data.access_token);
            setRefreshToken(res.data.refresh_token);
            setUser();

            router.push(`/home`);
        })
        .catch((e) => {
            console.error(e);

            // 실패 시, 다 삭제하고 /signin으로 이동
            const { reset } = useUserStore();
            reset();
            useCookie("access_token").value = null;
            useCookie("refresh_token").value = null;
            router.push(`/signin`);
        });
}
</script>

<style lang="scss" scoped>
.viewport {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--CTA_accent, #a1a1ff);
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
</style>
