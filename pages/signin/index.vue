<template>
    <div class="viewport">
        <div>로고</div>
        <div><img :src="kakaoLogo" /></div>
    </div>
</template>

<script setup>
import kakaoLogo from "../../assets/images/logo_kakao_login_medium_wide.png";
</script>

<style lang="scss" scoped>
.viewport {
    justify-content: space-around;
}
</style>
