<template>
    <div class="wrap">
        <div>여기</div>
    </div>
</template>

<script setup>
import { useAuthService } from "../../services/auth";

const { getKakaoCallbackTest, getKakaoCallback } = useAuthService();
const route = useRoute();
const router = useRouter();
console.log(route.query.code);

onMounted(async () => {
    const res = await getKakaoCallbackTest(route.query.code);
    console.log(res);

    if (res.success) {
        // TODO: 성공 시, 토큰 정보 localstorage에 저장하고 회원가입 여부에 따라 넘기기 token_type
        window.localStorage.setItem("accessToken", res.data.access_token);

        if (res.data.is_signup) router.push(`/signup`);
        else router.push(`/home`);
    } else {
        alert(res.message);
    }
});
</script>

<style lang="scss" scoped></style>
