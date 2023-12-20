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

const { getSocialCallback } = useAuthService();
const route = useRoute();
const router = useRouter();

console.log(route);
console.log(route.query.code);
console.log(router);

onMounted(async () => {
    // const res = await getSocialCallback("apple", route.query.code);
    // console.log(">> apple res", res);

    //애플로 로그인 성공 시.
    document.addEventListener("AppleIDSignInOnSuccess", (data) => {
        //handle successful response
        console.log("AppleIDSignInOnSuccess", data);
        //todo success logic
    });
    //애플로 로그인 실패 시.
    document.addEventListener("AppleIDSignInOnFailure", (error) => {
        //handle error.
        console.log("AppleIDSignInOnFailure", error);
        //todo fail logic
    });
});
</script>

<style lang="scss" scoped>
.viewport {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
