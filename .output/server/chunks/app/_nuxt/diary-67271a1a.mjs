import { A as API } from '../server.mjs';

const useDiaryService = () => {
  return {
    /**
     * 아침 다이어리 조회
     */
    async getMorningdiary(diary_id) {
      const res = await API.get(
        `/diary/morning/read?diary_id=${diary_id}`
      );
      return res.data;
    },
    /**
     * 저녁 다이어리 조회
     */
    async getNightdiary(diary_id) {
      const res = await API.get(`/diary/night/read?diary_id=${diary_id}`);
      return res.data;
    },
    /**
     * 메모 조회
     */
    async getMemo(memo_id) {
      const res = await API.get(`/diary/memo/read?memo_id=${memo_id}`);
      return res.data;
    },
    /**
     * 갤러리 목록 조회 (아침, 저녁, 메모)
     */
    async getGalleryList(diary_type, page) {
      const res = await API.post(`/diary/list`, {
        diary_type,
        page
      });
      return res.data;
    },
    /**
     * 캘린더 목록 조회
     */
    async getCalendarList(year, month) {
      const res = await API.post(`/diary/list/calender`, {
        year,
        month
      });
      return res.data;
    },
    /**
     * 캘린더 조회
     */
    async getCalendar(year, month, day) {
      const res = await API.post(`/diary/list/calender`, {
        year,
        month,
        day
      });
      return res.data;
    }
  };
};

export { useDiaryService as u };
//# sourceMappingURL=diary-67271a1a.mjs.map
