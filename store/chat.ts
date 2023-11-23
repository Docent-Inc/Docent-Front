import { ChatContentModel } from "~/models/chat";
import { useChatService } from "~/services/chat";
import loadingJSON from "../assets/json/loading.json";

enum ChatType {
    RESULT = "result",
    LOADING = "loading",
    SELECT = "select",
    DEFAULT = "default",
    SUCCESS = "success",
    FAIL = "fail",
}

interface Chat {
    is_docent: Boolean;
    type?: ChatType;
    text?: String;
    result?: ChatContentModel;
}

const initialState = () => ({
    chatList: [] as Chat[],
    isGenerating: false,
    resetFlag: false, // unmounted 시, 초기화 여부 플래그
});

export const useChatStore = defineStore("chat", {
    state: initialState,
    actions: {
        /**
         * 세션스토리지에서 불러온 채팅 리스트 저장
         * @param initList (Chat[])
         */
        async initChatList(initList: Chat[]) {
            this.chatList = initList;
        },
        /**
         * 첫 인사 문구 추가
         * @param type
         */
        async addWelcomeChat(type: number) {
            const { getWelcomeChat } = useChatService();
            const res = await getWelcomeChat(type);
            console.log(res);

            const welcomeChat = {
                is_docent: true,
                type: ChatType.SELECT,
                text: `${res.data.text} \n기록 예시가 필요한가요?`,
                selectList: [
                    "꿈을 해석하고 싶어요!",
                    "일기를 쓰고 싶어요!",
                    "메모를 하고 싶어요!",
                    "일정을 입력하고 싶어요!",
                ],
            };
            this.addChat(welcomeChat);
        },
        /**
         * 도움말 문구 추가
         */
        async addHelperChat(type: number) {
            const { getHelperChat } = useChatService();
            const res = await getHelperChat(type);

            const helperChat = {
                is_docent: true,
                type: ChatType.DEFAULT,
                text: res.data.text,
            };
            this.addChat(helperChat);
        },
        /**
         * 채팅 추가
         * @param chat (Chat)
         */
        async addChat(chat: Chat) {
            this.chatList.push(chat);
            return this.chatList.length - 1;
        },
        /**
         * 로딩 채팅 삭제
         */
        async removeLoadingChat() {
            this.chatList = this.chatList.filter(
                (chat) =>
                    !chat.is_docent ||
                    (chat.is_docent && chat.type !== ChatType.LOADING)
            );
        },
        /**
         * 로딩 채팅 삭제
         */
        async removeChatAt(idx: number) {
            this.chatList.splice(idx, 1);
            console.log("removed!");
        },
        /**
         * 채팅 리스트 초기화
         */
        async removeAllChat() {
            this.chatList = [];
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
                type: ChatType.SUCCESS,
            };
            const chatIdx = await this.addChat(chat);

            // (2) 로딩 컴포넌트 추가
            const idx = randomInt(0, loadingJSON.length - 1);
            const loadText = loadingJSON[idx];
            const loadChat: Chat = {
                is_docent: true,
                type: ChatType.LOADING,
                text: loadText,
            };
            this.addChat(loadChat);
            this.isGenerating = true;

            // (3) 채팅 생성
            const { sendChat } = useChatService();
            const res = await sendChat(input);
            console.log("✨generateChat >>> ", res);

            // (4) 로딩 컴포넌트 삭제
            this.removeLoadingChat();
            this.isGenerating = false;

            if (!res.success) {
                const msg = `${res.status_code}  - ${res.message}`;
                console.log("채팅 생성 실패 >>> ", msg, res);
                Object.assign(this.chatList[chatIdx], { type: ChatType.FAIL });

                return res;
            }

            // (5) 결과 채팅 추가
            const result: ChatContentModel = res.data;
            const resultChat: Chat = {
                is_docent: true,
                type: ChatType.RESULT,
                result: result,
            };
            this.addChat(resultChat);

            return res;
        },
        /**
         * Reset Flag
         * goHome()인 경우, resetFlag = true
         */
        setResetFlag(resetFlag: boolean) {
            this.resetFlag = resetFlag;
        },
        reset() {
            Object.assign(this.$state, initialState());
        },
    },
});
