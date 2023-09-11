import API from "../utils/axios";

export const useGenerateService = () => {
    return {
        /**
         * 채팅 리스트 조회
         */
        async getChatList(page: number) {
            const res = await API.post(`/api/generate/chat/list?page=${page}`);
            return res.data;
        },
        /**
         * 챗봇 대화
         * @body text
         */
        async generateChat(text: string) {
            const res = await API.post(`/api/generate/chat`, {
                content: text,
            });
            return res.data;
        },
    };
};
