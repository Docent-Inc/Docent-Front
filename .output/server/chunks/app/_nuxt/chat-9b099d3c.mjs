import { d as defineStore } from '../server.mjs';
import { u as useGenerateService } from './generate-2edefba2.mjs';
import dayjs from 'dayjs';

const useChatStore = defineStore("chat", {
  state: () => ({
    list: [],
    chatList: [],
    pageNo: 1,
    totalCounts: 0,
    isFirstPage: false,
    reload: false
    // reload
  }),
  actions: {
    async getList() {
      const { getChatList } = useGenerateService();
      console.log(`\u2728addChatList(${this.pageNo})`);
      console.log(">>" + this.list.length + "/" + this.totalCounts);
      const res = await getChatList(this.pageNo);
      if (!res.success) {
        const msg = `${res.status_code}  - ${res.message}`;
        console.log("Error! > ", msg, res);
        alert(msg);
        return;
      }
      this.list = [...res.data.list.reverse(), ...this.list];
      this.totalCounts = res.data.total_counts;
      this.pageNo = res.data.page_num + 1;
    },
    async getFirstPage() {
      this.pageNo = 1;
      this.totalCounts = 0;
      const { getChatList } = useGenerateService();
      console.log(`\u2728addChatList(${this.pageNo})`);
      console.log(">>" + this.list.length + "/" + this.totalCounts);
      const res = await getChatList(this.pageNo);
      this.list = [...res.data.list.reverse()];
      this.totalCounts = res.data.total_counts;
      this.pageNo = res.data.page_num + 1;
      this.reload = true;
    },
    /**
     * 채팅 리스트 필터링
     * 1) 도슨트가 보낸 첫번째 메시지 위에는 프로필이 노출된다
     * 2) 날짜 일이 바뀌면 상단에 년/월/일이 표시된다
     */
    listToChatList() {
      const result = [];
      if (!this.list.length)
        return result;
      result.push({
        content_type: 6,
        content: this.list[0].create_date
      });
      let isFirstChatbot = true;
      let prevCreateDate = null;
      for (const chat of this.list) {
        if (chat.is_chatbot && isFirstChatbot) {
          result.push({
            content_type: 5,
            is_chatbot: true
          });
          isFirstChatbot = false;
        } else if (!chat.is_chatbot) {
          isFirstChatbot = true;
        }
        if (prevCreateDate && chat.create_date && dayjs(chat.create_date).format("YYYY/MM/DD") !== dayjs(prevCreateDate).format("YYYY/MM/DD")) {
          result.push({
            content_type: 6,
            content: chat.create_date
          });
        }
        result.push(chat);
        prevCreateDate = chat.create_date;
      }
      this.chatList = result;
    },
    setChatList(data) {
      this.chatList = data;
    },
    setIsFirstPage(boolean) {
      this.isFirstPage = boolean;
    },
    setReload(boolean) {
      this.reload = boolean;
    }
  }
});

export { useChatStore as u };
//# sourceMappingURL=chat-9b099d3c.mjs.map
