export default defineNuxtConfig({
    devtools: { enabled: false },
    // ssr: false,
    app: {
        head: {
            // title: "Docent",
            link: [
                { rel: "canonical", href: "https://docent.zip/" },
                { rel: "manifest", href: "/manifest.json" },
                { rel: "assetlinks", href: "/.well-known/assetlinks.json" },
                {
                    rel: "icon",
                    type: "image/ico",
                    href: "/favicon.ico",
                },
                { rel: "apple-touch-icon", href: "/icon.png" },
            ],
            meta: [
                {
                    name: "viewport",
                    content:
                        "width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover",
                },
                { name: "apple-mobile-web-app-capable", content: "yes" },
                { name: "theme-color", content: "#ffffff" },
            ],
        },
        // layoutTransition: { name: "page", mode: "out-in", duration: 500 },
    },
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL,
            BASE_FRONT_URL: process.env.BASE_FRONT_URL,
            SERVER_MODE: process.env.SERVER_MODE,
        },
    },
    css: [
        "@mdi/font/css/materialdesignicons.min.css",
        "vuetify/lib/styles/main.sass",
        "animate.css/animate.min.css",
        "@/assets/scss/base/font.scss",
        "@/assets/scss/base/reset.scss",
        "@/assets/scss/main.scss",
        "@/assets/scss/title.scss",
        "@/assets/scss/icon.scss",
        "@/assets/scss/variables.scss",
    ],
    build: {
        transpile: ["vuetify"],
    },
    modules: [
        "@pinia/nuxt",
        "dayjs-nuxt",
        "nuxt-swiper",
        "nuxt-gtag",
        "@hebilicious/vue-query-nuxt",
    ],
    gtag: {
        id: "G-LJWL49EEVB",
    },
    imports: {
        dirs: ["./stores"],
    },
    vite: {
        server: {
            proxy: {
                "/api": {
                    target: "https://docent.zip",
                    changeOrigin: true,
                },
            },
        },
    },
    pinia: {
        autoImports: ["defineStore", "acceptHMRUpdate"],
    },
    dayjs: {
        locales: ["ko"],
    },
    plugins: [
        {
            src: "~/plugins/v-calendar",
            mode: "client",
        },
        "~/plugins/axios",
        "~/plugins/native", // Native App 함수 호출
        "~/plugins/functions", // Receive From Native App (JavaScript Functions)
    ],
});
