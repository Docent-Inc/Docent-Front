import API from "../utils/axios";

export const useGenerateService = () => {
    return {
        /**
         * 채팅 리스트 조회
         */
        async getChatList(page: number) {
            return await API.get(`/generate/chat/list?page=${page}`);
        },
        /**
         * 챗봇 대화
         * @body text
         */
        async generateChat(text: string) {
            return await API.post(`/generate/chat`, {
                content: text,
            });
        },
        /**
         * 마음 보고서 생성
         */
        async getReport() {
            return await API.get(`/generate/report`);
        },
        // async getReport() {
        //     return await API.get(`/today/report`);
        // },
    };
};
