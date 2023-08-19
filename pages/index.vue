<template>
    <div class="wrap">
        <div>로고</div>
    </div>
</template>

<script setup>
const router = useRouter();

// TODO: 자동로그인 확인 / signin 또는 home으로 넘어간다
onMounted(() => {
    setTimeout(() => {
        router.push(`/signin`);
        console.log("timeout!");
    }, 200);
});
</script>

<style lang="scss" scoped></style>
