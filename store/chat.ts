import { type ChatContentModel } from "~/models/chat";
import { useChatService } from "~/services/chat";
import loadingJSON from "../assets/json/loading.json";
import loadingJSON2 from "../assets/json/loading2.json";
import { useRecordStore } from "./record";
import { type Record } from "~/models/chat";

enum ChatType {
    RESULT = "result",
    LOADING = "loading",
    SELECT = "select", // 231206 - 미사용
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
    type: 0,
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
            // console.log(res);

            const welcomeChat = {
                is_docent: true,
                type: ChatType.SELECT,
                text: `${res.data.text}`,
            };
            this.addChat(welcomeChat);
        },
        /**
         * 도움말 문구 추가 (default = 0)
         */
        async addHelperChat() {
            // if (type === 0) return;
            //
            // const { getHelperChat } = useChatService();
            // const res = await getHelperChat(type);
            const idx = randomInt(0, loadingJSON2.length - 1);
            const loadText = loadingJSON2[idx];


            // loadText에는 문자열이 \n으로 구분되어 있다. split을 통해 배열로 만들어준다. 3초마다 addChat을 호출하여 채팅을 추가한다.
            console.log(loadText.split("\n"))
            loadText.split("\n").forEach((text, index) => {
                setTimeout(() => {
                    const helperChat = {
                        is_docent: true,
                        type: ChatType.DEFAULT,
                        text: text,
                    };
                    this.addChat(helperChat);
                }, index * 3000);
            });
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
                    (chat.is_docent && chat.type !== ChatType.LOADING),
            );
        },
        /**
         * 로딩 채팅 삭제
         */
        async removeChatAt(idx: number) {
            this.chatList.splice(idx, 1);
            // console.log("removed!");
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


            // (3) 채팅 생성
            if (this.type === 1) {
                this.type = 2;
            } else if (this.type === 2) {
                this.type = 1;
            }
            const data = {
                content: input,
                type: this.type,
            };
            console.log(data.type)
            const { sendChat } = useChatService();
            const res = await sendChat(data);
            // console.log("✨generateChat >>> ", res);

            // (4) 로딩 컴포넌트 삭제
            // this.removeLoadingChat();
            // this.isGenerating = false;
            // this.type = 0;

            this.isGenerating = true;

            if (!res.success) {
                const msg = `${res.status_code}  - ${res.message}`;
                console.error("채팅 생성에 실패하였습니다. ", msg, res);
                Object.assign(this.chatList[chatIdx], { type: ChatType.FAIL });

                return res;
            }

            // (5) 결과 채팅 추가
            // const result: ChatContentModel = res.data;
            // const resultChat: Chat = {
            //     is_docent: true,
            //     type: ChatType.RESULT,
            //     result: result,
            // };
            // this.addChat(resultChat);

            // if (result.text_type === 1 || result.text_type === 2) {
            //     const { addOptimisticRecord } = useRecordStore();
            //     addOptimisticRecord(result.content as Record, result.text_type);
            // }
            return res;
        },
        /**
         * Reset Flag
         * goHome()인 경우, resetFlag = true
         */
        setResetFlag(resetFlag: boolean) {
            this.resetFlag = resetFlag;
        },
        setType(type: number) {
            this.type = type;
        },
        reset() {
            Object.assign(this.$state, initialState());
        },
    },
});
