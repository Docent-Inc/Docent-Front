<template>
    <v-app id="app">
        <NuxtLayout>
            <NuxtPage />
            <ModalLoginModal />
            <ModalLoding />
            <ModalConfirmModal />
            <ModalCustomModal />
            <ModalSimpleModal />
        </NuxtLayout>
    </v-app>
</template>

<script setup>
import { SW } from "./registerServiceWorker";

onMounted(() => {
    if ("serviceWorker" in navigator) {
        SW();
    }
    //// START - IOS APP인 경우 vh 로직
    // const userAgent = navigator.userAgent.toLowerCase();
    // if (
    //     userAgent.includes("iphone") ||
    //     userAgent.includes("ipod") ||
    //     userAgent.includes("ipad")
    // ) {
    //     document.documentElement.style.setProperty("--vh", "1vh");
    // } else {
    //// END

    // 초기 뷰포트 높이 설정
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // 창 크기가 변경될 때마다 뷰포트 높이 업데이트
    window.addEventListener("resize", () => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
    // }
    (function (c, l, a, r, i, t, y) {
        c[a] =
            c[a] ||
            function () {
                (c[a].q = c[a].q || []).push(arguments);
            };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "jsur0l64cq");
});
useHeadSafe({
    script: [{ id: "xss-script", innerHTML: 'alert("xss")' }],
    meta: [{ "http-equiv": "refresh", content: "0;javascript:alert(1)" }],
});
useHead({
    titleTemplate: (productCategory) => {
        return productCategory ? `${productCategory} - Look` : "Look";
    },
});
useSeoMeta({
    ogTitle: "Look",
    description: "일상부터 마음까지, 나만의 AI 친구",
    ogDescription: "일상부터 마음까지, 나만의 AI 친구",
    ogImage: "/og_img.png",
    twitterCard: "summary_large_image",
    ogUrl: "https://docent.zip",
    ogType: "website",
    ogSiteName: "Look",
    twitterTitle: "Look",
    twitterDescription: "일상부터 마음까지, 나만의 AI 친구",
    twitterImage: "/og_img.png",
});
</script>
