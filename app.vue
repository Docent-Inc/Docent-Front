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
        return productCategory ? `${productCategory} - Looi` : "Looi";
    },
});
useSeoMeta({
    ogTitle: "나만의 기록 비서 Looi",
    description: `당신의 기록을 더욱 쉽고 가치있게!`,
    ogDescription: `당신의 기록을 더욱 쉽고 가치있게!`,
    ogImage: "https://kr.object.ncloudstorage.com/looi/%EA%B7%B8%EB%9E%98%ED%94%BD%20%EF%BC%86%20%EC%8D%B8%EB%84%A4%EC%9D%BC%20%EC%9D%B4%EB%AF%B8%EC%A7%80.png",
    twitterCard: "summary_large_image",
    ogType: "website",
    ogSiteName: "나만의 기록 비서 Looi",
    twitterTitle: "나만의 기록 비서 Looi",
    twitterDescription: `당신의 기록을 더욱 쉽고 가치있게!`,
    twitterImage: "https://kr.object.ncloudstorage.com/looi/%EA%B7%B8%EB%9E%98%ED%94%BD%20%EF%BC%86%20%EC%8D%B8%EB%84%A4%EC%9D%BC%20%EC%9D%B4%EB%AF%B8%EC%A7%80.png",
});
</script>
