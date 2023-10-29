import API from "../utils/axios";

export const useTodayService = () => {
    return {
        /**
         * 오늘 일정 조회
         */
        async getTodayCalendar() {
            const res = await API.get(`/today/calender`);
            return res.data;
        },
        /**
         * 오늘 기록 조회
         */
        async getTodayRecord() {
            const res = await API.get(`/today/record`);
            return res.data;
        },
        /**
         * 오늘 운세 조회
         */
        async getTodayLucky() {
            const res = await API.get(`/generate/luck`);
            return res.data;
        },
    };
};
