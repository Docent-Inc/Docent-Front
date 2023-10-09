import { A as API } from '../server.mjs';

const useGenerateService = () => {
  return {
    /**
     * 채팅 리스트 조회
     */
    async getChatList(page) {
      const res = await API.post(`/generate/chat/list?page=${page}`);
      return res.data;
    },
    /**
     * 챗봇 대화
     * @body text
     */
    async generateChat(text) {
      const res = await API.post(`/generate/chat`, {
        content: text
      });
      return res.data;
    },
    /**
     * 마음 보고서 생성
     */
    async getReport() {
      const res = await API.get(`/generate/report`);
      return res.data;
    }
  };
};

export { useGenerateService as u };
//# sourceMappingURL=generate-2edefba2.mjs.map
