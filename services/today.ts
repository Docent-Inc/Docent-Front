import API from "../utils/axios";

export const useTodayService = () => {
    return {
        /**
         * 오늘 일정 조회
         */
        async getTodayCalendar() {
            return await API.get(`/today/calender`);
        },
        /**
         * 오늘 기록 조회
         */
        async getTodayRecord() {
            return await API.get(`/today/history`);
        },
        /**
         * 오늘 운세 조회
         */
        async getTodayLucky() {
            return await API.get(`/today/luck`);
        },
        /**
         * 오늘 날씨 조회
         */
        async getTodayWeather(lat: string, lon: string) {
            return await API.get(`/today/weather?x=${lat}&y=${lon}`);
        },
    };
};
