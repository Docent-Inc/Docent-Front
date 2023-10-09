<template>
    <div class="viewport">
        <img :src="docentSVG" />
    </div>
</template>

<script setup>
import { useAuthService } from "~/services/auth";
import { useUserStore } from "~/store/user";
import docentSVG from "../assets/images/logo_docent_big.svg";
const router = useRouter();

// TODO: 자동로그인 확인 / signin 또는 home으로 넘어간다
onMounted(async () => {
    const { accessToken, refreshToken } = useUserStore();
    if (!accessToken || !refreshToken) {
        setTimeout(() => {
            router.push(`/signin`);
        }, 200);
    }

    const { refresh } = useAuthService();
    const res = await refresh(refreshToken);
    console.log(">> ", res);

    if (res.success) {
        // TODO: 성공 시, 액세스 토큰 저장 후 /home 이동
    } else {
        // TODO: 실패 시, 다 삭제하고 /signin으로 이동
    }
});
</script>

<style lang="scss" scoped>
.viewport {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
