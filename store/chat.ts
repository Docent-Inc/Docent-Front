import { useGenerateService } from "../services/generate";
enum ChatType {
    RESULT = "result",
    LOADING = "loading",
    SELECT = "select",
    DEFAULT = "default",
}

// content_type 1 - 꿈기록
interface Dream {
    diary_name: String;
    content: String;
    resolution: String;
    image_url: String;
    create_date: String;
}

// content_type 2 - 일기
interface Diary {
    diary_name: String;
    content: String;
    image_url: String;
    create_date: String;
}

// content_type 3 - 메모
interface Memo {
    title: String;
    content: String;
    create_date: String;
}

// content_type 4 - 일정
interface Calender {
    title: String;
    content: String;
    start_time: String;
    end_time: String;
}

interface ChatContent {
    diary_id: Number;
    text_type: Number;
    content: Dream | Diary | Memo | Calender;
}

interface Chat {
    is_docent: Boolean;
    type?: ChatType;
    text?: String;
    result?: ChatContent;
}

export const useChatStore = defineStore("chat", {
    state: () => ({
        chatList: [] as Chat[],
        isGenerating: false,
    }),
    actions: {
        /**
         * 세션스토리지에서 불러온 채팅 리스트 저장
         * @param initList (Chat[])
         */
        async initChatList(initList: Chat[]) {
            this.chatList = initList;
        },
        /**
         * 채팅 추가
         * @param chat (Chat)
         */
        async addChat(chat: Chat) {
            this.chatList.push(chat);
        },
        /**
         * 로딩 채팅 삭제
         */
        async removeChat() {
            this.chatList = this.chatList.filter(
                (chat) =>
                    !chat.is_docent ||
                    (chat.is_docent && chat.type !== ChatType.LOADING)
            );
        },
        /**
         * 채팅 전송
         * @param input
         */
        async sendChat(input: string) {
            // (1) 내가 보낸 채팅 추가
            const chat = {
                is_docent: false,
                text: input,
            };
            this.addChat(chat);

            // (2) 로딩 컴포넌트 추가
            const loadChat: Chat = {
                is_docent: true,
                type: ChatType.LOADING,
                text: "Lookie가 열심히 기록을 확인하고 있어요!",
            };
            this.addChat(loadChat);
            this.isGenerating = true;

            // (3) 채팅 생성
            const { generateChat } = useGenerateService();
            const res = await generateChat(input);
            console.log("✨generateChat >>> ", res);

            // (4) 로딩 컴포넌트 삭제
            this.removeChat();
            this.isGenerating = false;

            if (!res.success) {
                const msg = `${res.status_code}  - ${res.message}`;
                console.log("Error! > ", msg, res);
                alert(msg);

                return false;
            }

            // (5) 결과 채팅 추가
            const result: ChatContent = res.data;
            const resultChat: Chat = {
                is_docent: true,
                type: ChatType.RESULT,
                result: result,
            };
            this.addChat(resultChat);

            return true;
        },
    },
});
