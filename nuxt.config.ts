export default defineNuxtConfig({
    // devtools: { enabled: true },
    // ssr: false,
    css: [
        "@mdi/font/css/materialdesignicons.min.css",
        "vuetify/lib/styles/main.sass",
        "@/assets/scss/base/main.scss",
        "@/assets/scss/base/reset.scss",
    ],
    build: {
        transpile: ["vuetify"],
    },
    vite: {
        server: {
            proxy: {
                "/health": {
                    target: "http://3.36.63.32:8080",
                    changeOrigin: true,
                },
                "/api": {
                    target: "https://docent.zip",
                    changeOrigin: true,
                },
            },
        },
    },
});
