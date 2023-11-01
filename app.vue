<template>
    <v-app id="app">
        <NuxtLayout>
            <NuxtPage />
            <ModalLoginModal />
            <ModalLoding />
            <ModalConfirmModal />
            <ModalCustomModal />
        </NuxtLayout>
    </v-app>
</template>

<script setup>
onMounted(() => {
    // 초기 뷰포트 높이 설정
    const userAgent = navigator.userAgent.toLowerCase();
    if (
        userAgent.includes("iphone") ||
        userAgent.includes("ipod") ||
        userAgent.includes("ipad")
    ) {
        document.documentElement.style.setProperty("--vh", "1vh");
    } else {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);

        // 창 크기가 변경될 때마다 뷰포트 높이 업데이트
        window.addEventListener("resize", () => {
            vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        });
    }
});
</script>
