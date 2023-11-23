import type {
    UserModel,
    KakaoCallbackModel,
    KakaoModel,
    RefreshModel,
} from "~/models/auth";
import { GET, POST } from "~/services";

/**
 * @interface signupData
 */
interface signupData {
    nickname: string;
    mbti: string;
    age: string;
    gender: string;
}

export const useAuthService = () => {
    const { KAKAO_SIGNIN_URL, KAKAO_SIGNIN_CALLBACK_URL } =
        useRuntimeConfig().public;
    return {
        /**
         * 카카오 로그인 요청
         */
        async getKakaoLogin() {
            return await GET<KakaoModel>(KAKAO_SIGNIN_URL);
        },
        /**
         * 카카오 콜백 요청
         * @params code
         */
        async getKakaoCallback(code: string) {
            return await GET<KakaoCallbackModel>(KAKAO_SIGNIN_CALLBACK_URL, {
                params: { code: code },
            });
        },
        /**
         * 초기 정보 등록
         * @body user
         */
        async signup(data: signupData) {
            return await POST(`/auth/update`, {
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
