<template>
    <v-app id="app">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </v-app>
</template>

<script setup>
onMounted(() => {
    // if (this.$isIOSApp()) {
    //     document.documentElement.style.setProperty("--vh", "1vh");
    // } else {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
    window.addEventListener("resize", function () {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", vh + "px");
    });
    // }
});
</script>
