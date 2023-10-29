import axios from "axios";
import { useUserStore } from "~/store/user";

const API = axios.create({
    baseURL: "https://docent.zip/api",
    validateStatus: function (status) {
        return true;
    },
});

API.interceptors.request.use(
    (config) => {
        const { accessToken } = useUserStore();

        // console.log("config", config);
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use((res) => {
    const url = new URL(window.location.href);
    switch (res.data.status_code) {
        case 4220: // (4220) JWT 토큰이 필요합니다.
            // if (
            //     url.pathname !== "/signin" &&
            //     url.pathname !== "/kakao" &&
            //     url.pathname !== "/signup"
            // ) {
            //     // alert("로그인 후 이용 가능합니다.");
            //     navigateTo("/signin");
            // }
            return res.data;
        default:
            return res.data;
    }
});

export default API;
