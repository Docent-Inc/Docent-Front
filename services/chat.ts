import API from "../utils/axios";

export const useChatService = () => {
    return {
        /**
         * 채팅 리스트 조회
         * 20231120 - 미사용
         */
        async getChatList(page: number) {
            return await API.get(`/chat/list?page=${page}`);
        },
        /**
         * 챗봇 대화
         * @body text
         */
        async sendChat(text: string) {
            return await API.post(`/chat`, {
                content: text,
            });
        },
        /**
         * 채팅방 입장 문구
         * @param type 문구 타입 (1 = 새벽, 2 = 아침, 3 = 낮, 4 = 밤)
         */
        async getWelcomeChat(type: number) {
            return await API.get(`/chat/welcome?type=${type}`);
        },
        /**
         * 채팅 도움말 문구
         * @param type 문구 타입 (1 = 일기, 2 = 꿈, 3 = 메모, 4 = 일정)
         */
        async getHelperChat(type: number) {
            return await API.get(`/chat/helper?type=${type}`);
        },
    };
};
