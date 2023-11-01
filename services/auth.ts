import API from "../utils/axios";

/**
 * @interface signupModel
 */
interface signupModel {
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
            return await API.get(KAKAO_SIGNIN_URL);
        },
        /**
         * 카카오 콜백 요청
         * @params code
         */
        async getKakaoCallback(code: string) {
            return await API.get(KAKAO_SIGNIN_CALLBACK_URL, {
                params: { code: code },
            });
        },
        /**
         * 초기 정보 등록
         * @body user
         */
        async signup(data: signupModel) {
            return await API.post(`/auth/update`, {
                ...data,
            });
        },
        /**
         * 유저 정보 조회
         * @body userId
         */
        async getUserInfo() {
            return await API.get(`/auth/info`);
        },
        /**
         * 닉네임 변경 요청
         * @body nickname
         */
        async changeNickname(nickname: string) {
            return await API.post(`/auth/change/nickname`, {
                nickname: nickname,
            });
        },
        /**
         * MBTI 변경 요청
         * @body mbti
         */
        async changeMBTI(mbti: string) {
            return await API.post(`/auth/change/mbti`, {
                mbti: mbti,
            });
        },
        /**
         * 액세스 토큰 재발급
         */
        async refresh(refreshToken: string) {
            return await API.post(`/auth/refresh`, {
                refresh_token: refreshToken,
            });
        },
    };
};
