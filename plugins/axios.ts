// plugins/axios.ts
import API from "~/services/index";
export default defineNuxtPlugin((nuxtApp) => {
    let isRedirecting = false;

    // /signin 페이지 접근 시, isRedirecting = false
    nuxtApp.vueApp.$nuxt.$router.beforeEach((from, to) => {
        if (to.fullPath === "/signin") {
            isRedirecting = false;
        }
    });

    API.interceptors.response.use((response) => {
        // console.log(
        //     "[request]",
        //     response.config.url,
        //     "[response]",
        //     response.data,
        // );
        switch (response.data.status_code) {
            case 4220: // (4220) JWT 토큰이 필요합니다.
                // console.log("nuxtApp.route.path", nuxtApp._route.path);
                if (nuxtApp._route.path !== "/signin" && !isRedirecting) {
                    isRedirecting = true;

                    console.error("로그인 후 이용 가능합니다.");
                    navigateTo("/signin");
                }
                return response;

            default:
                return response;
        }
    });
});
