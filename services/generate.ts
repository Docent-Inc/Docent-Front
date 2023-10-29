import API from "../utils/axios";

export const useGenerateService = () => {
    return {
        /**
         * 채팅 리스트 조회
         */
        async getChatList(page: number) {
            const res = await API.get(`/generate/chat/list?page=${page}`);
            return res.data;
        },
        /**
         * 챗봇 대화
         * @body text
         */
        async generateChat(text: string) {
            const res = await API.post(`/generate/chat`, {
                content: text,
            });
            return res.data;
        },
        /**
         * 마음 보고서 생성
         */
        async getReport() {
            const res = await API.get(`/generate/report`);
            return res.data;
        },
        // async getReport() {
        //     const res = await API.get(`/today/report`);
        //     console.log(res.data);
        //     return res.data;
        // },
    };
};
