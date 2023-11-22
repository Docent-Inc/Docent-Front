<template>
    <div class="viewport">
        <v-progress-circular
            indeterminate
            color="#9398FF"
        ></v-progress-circular>
    </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";
import { useAuthService } from "../../services/auth";

const { getKakaoCallbackTest, getKakaoCallback } = useAuthService();
const route = useRoute();
const router = useRouter();
// console.log(route.query.code);

onMounted(async () => {
    const res = await getKakaoCallback(route.query.code);
    // console.log(res);

    if (res.success) {
        // 로그인 성공 시, 쿠키/store 세팅
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
        useCookie("expires_in", {
            expires: accessTokenExpires,
        }).value = String(accessTokenExpires);
        useCookie("refresh_token", {
            expires: refreshTokenExpires,
        }).value = res.data.refresh_token;

        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);

        if (res.data.is_signup) router.push(`/profile/starter`);
        else router.push(`/home`);
    } else {
        const { reset } = useUserStore();
        reset();
        alert(res.message);
    }
});
</script>

<style lang="scss" scoped>
.viewport {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
