export default defineNuxtConfig({
    // devtools: { enabled: true },
    // ssr: false,
    css: [
        "@mdi/font/css/materialdesignicons.min.css",
        "vuetify/lib/styles/main.sass",
        "@/assets/scss/base/font.scss",
        "@/assets/scss/base/reset.scss",
        "@/assets/scss/main.scss",
        "@/assets/scss/title.scss",
        "@/assets/scss/icon.scss",
    ],
    build: {
        transpile: ["vuetify"],
    },
    modules: ["@pinia/nuxt", "dayjs-nuxt", "nuxt-swiper"],
    imports: {
        dirs: ["./stores"],
    },
    vite: {
        server: {
            proxy: {
                "/health": {
                    target: "https://http://3.36.63.32:8080",
                    changeOrigin: true,
                },
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
    app: {
        head: {
            title: "Docent",
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
            ],
        },
    },
    dayjs: {
        locales: ["ko"],
    },
});
