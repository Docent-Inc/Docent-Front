import axios from "axios";
import { useUserStore } from "~/store/user";

const API = axios.create({
    baseURL: "https://docent.zip/api",
    // proxy: true,
});

API.interceptors.request.use(
    (config) => {
        const { accessToken } = useUserStore();
        console.log(accessToken);
        // const accessToken = window.localStorage.getItem("accessToken");

        // console.log("✨axios:", config);
        // console.log("accessToken: ", accessToken);

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// TODO: 에러 핸들링, 일단은 로그인 쪽 여기서 처리 / 후에 미들웨어로 넘기기
API.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        console.error("✨axios-error:", error);

        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                    const url = new URL(window.location.href);
                    if (
                        url.pathname !== "/signin" &&
                        url.pathname !== "/kakao"
                    ) {
                        alert("로그인 후 이용 가능합니다.");
                        navigateTo({
                            path: "/signin",
                            query: { redirectURL: window.location.href },
                        });
                    }

                    break;
                default:
                    return Promise.reject(error.response.data);
            }
        }

        return Promise.reject(error);
    }
);

export default API;
