<template>
    <div class="viewport">
        <v-progress-circular
            indeterminate
            color="#2C9577"
        ></v-progress-circular>
    </div>
</template>

<script setup>
import { useAuthService } from "../../services/auth";

const { getKakaoCallbackTest, getKakaoCallback } = useAuthService();
const route = useRoute();
const router = useRouter();
console.log(route.query.code);

onMounted(async () => {
    // TODO: test API -> API 변경
    //  const res = await getKakaoCallbackTest(route.query.code);
    const res = await getKakaoCallback(route.query.code);

    console.log(res);

    if (res.success) {
        window.localStorage.setItem("accessToken", res.data.access_token);
        window.localStorage.setItem("name", res.data.user_name);

        if (res.data.is_signup) router.push(`/signup/1-nickname`);
        else router.push(`/home`);
    } else {
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
