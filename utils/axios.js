import axios from "axios";

const API = axios.create({
    baseURL: process.env.baseURL,
    // proxy: true,
});

API.interceptors.request.use(
    (config) => {
        const accessToken = window.localStorage.getItem("accessToken");

        // console.log("✨axios:", config);
        // console.log("accessToken: ", accessToken);

        config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
    },
    function (error) {
        console.error("✨axios-error:", error);
        return Promise.reject(error);
    }
);

// TODO: 여기서 500번대 에러 처리
API.interceptors.response.use(
    (res) => {
        // console.log("✨axios-resp: ", res);
        return res;
    },
    (error) => {
        // console.error("✨axios-error:", error);
        return Promise.reject(error);
    }
);

export default API;
