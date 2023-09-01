import { useChatService } from "../services/chat";
import dayjs from "dayjs";

interface Chat {
    id?: Number;
    User_id?: Number;
    content_type?: Number;

    NightDiary_id?: Number;
    Calender_id?: Number;
    MorningDiary_id?: Number;
    Memo_id?: Number;

    is_deleted?: Body;
    is_chatbot?: Boolean;
    content?: String;
    image_url?: String;
    create_date?: String;
}

export const useChatStore = defineStore("chat", {
    state: () => ({
        list: [] as Chat[],
        chatList: [] as Chat[],
        pageNo: 1,
        totalCounts: 0,
    }),
    actions: {
        async getList() {
            const { getChatList } = useChatService();

            console.log(`✨addChatList(${this.pageNo})`);
            console.log(">>" + this.list.length + "/" + this.totalCounts);
            const res = await getChatList(this.pageNo);
            this.list = [...res.data.list.reverse(), ...this.list];
            this.totalCounts = res.data.total_counts;
            this.pageNo = res.data.page_num + 1;
            console.log(">>> ", this.list);
        },
        async getFirstPage() {
            this.pageNo = 1;
            this.totalCounts = 0;

            const { getChatList } = useChatService();

            console.log(`✨addChatList(${this.pageNo})`);
            console.log(">>" + this.list.length + "/" + this.totalCounts);
            const res = await getChatList(this.pageNo);
            this.list = [...res.data.list.reverse()];
            this.totalCounts = res.data.total_counts;
            this.pageNo = res.data.page_num + 1;
            console.log(">>> ", this.list);
        },
        /**
         * 채팅 리스트 필터링
         * 1) 도슨트가 보낸 첫번째 메시지 위에는 프로필이 노출된다
         * 2) 날짜 일이 바뀌면 상단에 년/월/일이 표시된다
         */
        listToChatList() {
            const result: Chat[] = [];
            if (!this.list.length) return result;

            // 0) 가장 첫 채팅은 날짜 무조건 표시
            result.push({
                content_type: 6,
                content: this.list[0].create_date,
            });

            let isFirstChatbot = true;
            let prevCreateDate = null;

            for (const chat of this.list) {
                // 1) is_chatbot으로 시작하는 모든 채팅 중에서 가장 첫번째 채팅의 위에 도슨트 프로필(5) 추가
                if (chat.is_chatbot && isFirstChatbot) {
                    result.push({
                        content_type: 5,
                        is_chatbot: true,
                    });
                    isFirstChatbot = false;
                } else if (!chat.is_chatbot) {
                    isFirstChatbot = true;
                }

                // 2) create_date 기준으로 일이 바뀌는 시점의 채팅 위에 날짜(6) 데이터 추가
                if (
                    prevCreateDate &&
                    chat.create_date &&
                    dayjs(chat.create_date).format("YYYY/MM/DD") !==
                        dayjs(prevCreateDate).format("YYYY/MM/DD")
                ) {
                    result.push({
                        content_type: 6,
                        content: chat.create_date,
                    });
                }

                result.push(chat);
                prevCreateDate = chat.create_date;
            }

            this.chatList = result;
        },
        setChatList(data: Chat[]) {
            console.log("dd", data);
            this.chatList = data;
        },
    },
});
