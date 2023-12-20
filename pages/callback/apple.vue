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
console.log(window.location);
console.log(router);

onMounted(async () => {
    const res = await getSocialCallback("apple", route.query.code);
    console.log(">> apple res", res);
});
</script>

<style lang="scss" scoped>
.viewport {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
