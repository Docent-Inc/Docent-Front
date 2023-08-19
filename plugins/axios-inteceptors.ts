import axios from "axios";

export default defineNuxtPlugin(() => {
    axios.interceptors.request.use(
        (config) => {
            console.log("✨axios:", config);
            return config;
        },
        function (error) {
            console.error("✨axios-error:", error);
            return Promise.reject(error);
        }
    );
});
