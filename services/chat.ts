import API from "../utils/axios";

export const useChatService = () => {
    return {
        /**
         * 채팅 리스트 조회
         */
        async getChatList(page: number) {
            const res = await API.post(`/api/generate/chat/list?page=${page}`);
            return res.data;
        },
    };
};
