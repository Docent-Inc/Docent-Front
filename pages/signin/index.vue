<template>
    <div class="viewport">
        <div class="title-box">
            <h1>당신의 공간으로 <br />초대합니다!</h1>
            <h2>나를 위한 기록을 시작해보세요.</h2>
        </div>

        <div class="button"><img :src="kakaoLogo" @click="call" /></div>
    </div>
</template>

<script setup>
import kakaoLogo from "../../assets/images/button_kakao_login.svg";
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
.title-box {
    width: 100%;
    text-align: start;
    padding: 0 1.5em;
    margin-top: 105px;
}
</style>
