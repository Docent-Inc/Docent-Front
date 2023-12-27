// composables/useApi.ts
import axios, {type AxiosResponse, type AxiosRequestConfig, Canceler} from "axios";
import { useUserStore } from "~/store/user";

interface BaseResponse<T> {
    success: boolean;
    status_code: number;
    message: string;
    data: T;
}
// const pendingRequests = new Map(); // 전역 변수로 정의
export function useAxios() {
    const { SERVER_MODE, BASE_URL } = useRuntimeConfig().public;

    // console.log("SERVER_MODE", SERVER_MODE);
    // console.log("BASE_URL", BASE_URL);

    const API = axios.create({
        baseURL: BASE_URL,
        validateStatus: function (status) {
            return true;
        },
    });
    const cancelRequest = (url: string) => {
    //     if (pendingRequests.has(url)) {
    //         const cancelToken = pendingRequests.get(url);
    //         console.log("cancelToken", cancelToken)
    //         cancelToken();
    //         pendingRequests.delete(url);
    //         console.log("pendingRequests", pendingRequests)
    //     }
    //     console.log("pendingRequests", pendingRequests)
    };

    API.interceptors.request.use(
        (config) => {
            const { accessToken } = useUserStore();

            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            // const tokenSource = axios.CancelToken.source();
            // config.cancelToken = tokenSource.token;
            // pendingRequests.set(config.url, tokenSource.cancel);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    const GET = async <T>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<BaseResponse<T>> => {
        const response: AxiosResponse<BaseResponse<T>> = await API.get(
            url,
            config,
        );
        return response.data;
    };

    const POST = async <T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<BaseResponse<T>> => {
        const response: AxiosResponse<BaseResponse<T>> = await API.post(
            url,
            data,
            config,
        );
        return response.data;
    };

    const PUT = async <T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<BaseResponse<T>> => {
        const response: AxiosResponse<BaseResponse<T>> = await API.put(
            url,
            data,
            config,
        );
        return response.data;
    };

    const PATCH = async <T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<BaseResponse<T>> => {
        const response: AxiosResponse<BaseResponse<T>> = await API.patch(
            url,
            data,
            config,
        );
        return response.data;
    }

    const DELETE = async <T>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<BaseResponse<T>> => {
        const response: AxiosResponse<BaseResponse<T>> = await API.delete(
            url,
            config,
        );
        return response.data;
    };

    return {
        API,
        GET,
        POST,
        PATCH,
        PUT,
        DELETE,
        cancelRequest,
    };
}
