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
        window.localStorage.setItem("accessToken", res.data.access_token);
        window.localStorage.setItem("name", res.data.user_name);

        if (res.data.is_signup) router.push(`/signup`);
        else router.push(`/home`);
    } else {
        alert(res.message);
    }
});
</script>

<style lang="scss" scoped></style>
