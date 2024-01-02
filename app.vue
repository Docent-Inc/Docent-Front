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
    // Service Worker 세팅
    if ("serviceWorker" in navigator) {
        SW();
    }

    // Viewport 세팅
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    // Clarity 세팅
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

/**
 * Head
 */
useHeadSafe({
    script: [{ id: "xss-script", innerHTML: 'alert("xss")' }],
    meta: [{ "http-equiv": "refresh", content: "0;javascript:alert(1)" }],
});
useHead({
    titleTemplate: (productCategory) => {
        return productCategory ? `${productCategory} - Looi` : "Looi";
    },
});
useSeoMeta({
    ogTitle: "나만의 기록 비서 Looi",
    description: `당신의 기록을 더욱 쉽고 가치있게!`,
    ogDescription: `당신의 기록을 더욱 쉽고 가치있게!`,
    ogImage:
        "https://kr.object.ncloudstorage.com/looi/%EA%B7%B8%EB%9E%98%ED%94%BD%20%EF%BC%86%20%EC%8D%B8%EB%84%A4%EC%9D%BC%20%EC%9D%B4%EB%AF%B8%EC%A7%80.png",
    twitterCard: "summary_large_image",
    ogType: "website",
    ogSiteName: "나만의 기록 비서 Looi",
    twitterTitle: "나만의 기록 비서 Looi",
    twitterDescription: `당신의 기록을 더욱 쉽고 가치있게!`,
    twitterImage:
        "https://kr.object.ncloudstorage.com/looi/%EA%B7%B8%EB%9E%98%ED%94%BD%20%EF%BC%86%20%EC%8D%B8%EB%84%A4%EC%9D%BC%20%EC%9D%B4%EB%AF%B8%EC%A7%80.png",
});
</script>
