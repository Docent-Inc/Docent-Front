import API from "../utils/axios";

export const useGenerateService = () => {
    return {
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
