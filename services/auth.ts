import API from "../utils/axios";

export const useAuthService = () => {
    return {
        /**
         * 카카오 테스트 로그인 요청
         */
        async getKakaoLoginTest() {
            const res = await API.get(`/api/auth/kakao/test`);
            return res.data;
        },
        /**
         * 카카오 로그인 요청
         */
        async getKakaoLogin() {
            const res = await API.get(`/api/auth/kakao`);
            return res.data;
        },
        /**
         * 카카오 콜백 요청
         * @params code
         */
        async getKakaoCallback(code: string) {
            const res = await API.get(`/api/auth/kakao/callback`, {
                params: { code: code },
            });
            return res.data;
        },
        /**
         * 카카오 테스트 콜백 요청
         * @params code
         */
        async getKakaoCallbackTest(code: string) {
            const res = await API.get(`/api/auth/kakao/callback/test`, {
                params: { code: code },
            });
            return res.data;
        },
        /**
         * 닉네임 변경 요청
         * @body nickname
         */
        async changeNickname(nickname: string) {
            const res = await API.post(`/api/auth/change/nickname`, {
                nickname: nickname,
            });
            return res.data;
        },
        /**
         * MBTI 변경 요청
         * @body mbti
         */
        async changeMBTI(mbti: string) {
            const res = await API.post(`/api/auth/change/mbti`, {
                mbti: mbti,
            });
            return res.data;
        },
    };
};
