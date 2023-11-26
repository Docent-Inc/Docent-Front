import axios, { type AxiosRequestConfig } from "axios";
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

        // if (accessToken) {
        if (true) {
            // config.headers["Authorization"] = `Bearer ${accessToken}`;
            // console.log(accessToken);
            config.headers[
                "Authorization"
            ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcmVlMjI5MEBuYXZlci5jb20iLCJleHAiOjE3MDEwMTQ2MTR9.gwCZJKFlXvYkjmlldnGxRYHqLQiuPc7vNJSovRyKKLc`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

//// Interface
interface BaseResponse<T> {
    success: boolean;
    status_code: number;
    message: string;
    data: T;
}

//// Method
export const GET = async <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<BaseResponse<T>> => {
    const response = await API.get(url, config);
    return response.data;
};

export const POST = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
): Promise<BaseResponse<T>> => {
    const response = await API.post(url, data, config);
    return response.data;
};

export const PUT = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
): Promise<BaseResponse<T>> => {
    const response = await API.put(url, data, config);
    return response.data;
};

export const DELETE = async <T>(
    url: string,
    config?: AxiosRequestConfig,
): Promise<BaseResponse<T>> => {
    const response = await API.delete(url, config);
    return response.data;
};

export default API;
