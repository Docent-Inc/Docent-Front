export default defineNuxtConfig({
    // devtools: { enabled: true },
    css: ["@/assets/scss/reset.scss"],
    vite: {
        server: {
            proxy: {
                "/health": {
                    target: "http://3.36.63.32:8080",
                    changeOrigin: true,
                },
            },
        },
    },
});
