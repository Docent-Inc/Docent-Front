import axios from "axios";
import { useUserStore } from "~/store/user";

const API = axios.create({
    baseURL: "https://docent.zip/api",
    // proxy: true,
});

API.interceptors.request.use(
    (config) => {
        const { accessToken } = useUserStore();

        // console.log("✨axios:", accessToken);
        // console.log("request", config.url);

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (res) => {
        // console.log("response", res.request.responseURL);
        return res;
    },
    (error) => {
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                    const url = new URL(window.location.href);
                    if (
                        url.pathname !== "/signin" &&
                        url.pathname !== "/kakao" &&
                        url.pathname !== "/"
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
