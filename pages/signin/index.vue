<template>
    <div class="viewport">
        <div class="title-box">
            <div class="title">당신의 공간으로 <br />초대합니다!</div>
            <div class="subtitle">나를 위한 기록을 시작해보세요.</div>
        </div>

        <img :src="kakaoLogo" @click="call" class="button" />
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

.title {
    margin-bottom: 7px;
}

.button {
    background: none;
}
</style>
