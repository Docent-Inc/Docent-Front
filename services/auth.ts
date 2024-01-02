import { useAxios } from "~/composables/useAxios";
import type {
    UserModel,
    SocialLoginModel,
    SocialCallbackModel,
    RefreshModel,
    SignupModel,
} from "~/models/auth";

export const useAuthService = () => {
    const { SERVER_MODE } = useRuntimeConfig().public;
    const { GET, POST, PUT, PATCH, DELETE } = useAxios();

    return {
        /**
         * 소셜 로그인 요청
         * (ex. /auth/login/kakao/local)
         */
        async getSocialLogin(service: string) {
            return await GET<SocialLoginModel>(
                `/auth/login/${service}/${SERVER_MODE}`,
            );
        },
        /**
         * 소셜 로그인 콜백
         * (ex. /auth/callback/kakao/local)
         */
        async getSocialCallback(service: string, code: string) {
            return await GET<SocialCallbackModel>(
                `/auth/callback/${service}/${SERVER_MODE}`,
                {
                    params: { code: code },
                },
            );
        },
        /**
         * 초기 정보 등록
         * @body user
         */
        async signup(data: SignupModel) {
            return await PATCH(`/auth/update`, {
                ...data,
            });
        },
        /**
         * 유저 정보 조회
         */
        async getUserInfo() {
            return await GET<UserModel>(`/auth/info`);
        },
        /**
         * 액세스 토큰 재발급
         */
        async refresh(refreshToken: string) {
            return await POST<RefreshModel>(`/auth/refresh`, {
                refresh_token: refreshToken,
            });
        },
    };
};
