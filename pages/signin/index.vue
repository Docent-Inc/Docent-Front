<template>
    <div class="viewport">
        <div>로고</div>
        <div><img :src="kakaoLogo" @click="call" /></div>
    </div>
</template>

<script setup>
import kakaoLogo from "../../assets/images/logo_kakao_login_medium_wide.png";
import { useAuthService } from "../../services/auth";

const { getKakaoLoginTest, getKakaoLogin } = useAuthService();

const call = async () => {
    const res = await getKakaoLoginTest();
    console.log(res);

    if (res.success) {
        window.location.href = res.data.url;
        console.log("result:", res.data.url);
    } else {
        alert("로그인에 실패했습니다.");
    }
};
</script>

<style lang="scss" scoped>
.viewport {
    justify-content: space-around;
}
</style>
