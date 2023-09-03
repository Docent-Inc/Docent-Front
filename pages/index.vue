<template>
    <div class="viewport">
        <img :src="docentSVG" />
    </div>
</template>

<script setup>
import docentSVG from "../assets/images/logo_docent_big.svg";
const router = useRouter();

// TODO: 자동로그인 확인 / signin 또는 home으로 넘어간다
onMounted(() => {
    setTimeout(() => {
        router.push(`/signin`);
        console.log("timeout!");
    }, 200);
});
</script>

<style lang="scss" scoped>
.viewport {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
