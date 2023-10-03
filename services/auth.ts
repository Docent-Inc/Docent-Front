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
            const res = await API.get(KAKAO_SIGNIN_URL);
            return res.data;
        },
        /**
         * 카카오 콜백 요청
         * @params code
         */
        async getKakaoCallback(code: string) {
            const res = await API.get(KAKAO_SIGNIN_CALLBACK_URL, {
                params: { code: code },
            });
            return res.data;
        },
        /**
         * 초기 정보 등록
         * @body user
         */
        async signup(data: signupModel) {
            const res = await API.post(`/auth/update`, {
                ...data,
            });
            return res.data;
        },
        /**
         * 유저 정보 조회
         * @body userId
         */
        async getUserInfo() {
            const res = await API.get(`/admin/user/info`);
            return res.data;
        },
        /**
         * 닉네임 변경 요청
         * @body nickname
         */
        async changeNickname(nickname: string) {
            const res = await API.post(`/auth/change/nickname`, {
                nickname: nickname,
            });
            return res.data;
        },
        /**
         * MBTI 변경 요청
         * @body mbti
         */
        async changeMBTI(mbti: string) {
            const res = await API.post(`/auth/change/mbti`, {
                mbti: mbti,
            });
            return res.data;
        },
        /**
         * 액세스 토큰 재발급
         */
        async refresh(refreshToken: string) {
            const res = await API.post(`/auth/refresh`, {
                "refresh-token": refreshToken,
            });
            return res.data;
        },
    };
};
