import { useAxios } from "~/composables/useAxios";
import type { Record } from "~/models/chat";

interface RecordRes {
    MorningDiary: Record[];
    NightDiary: Record[];
}

interface WeatherRes {
    icon: string;
    tmx: string;
}

export const useTodayService = () => {
    const { GET, POST, PUT, DELETE } = useAxios();

    return {
        /**
         * 오늘 일정 조회
         */
        async getTodayCalendar() {
            return await GET(`/today/calender`);
        },
        /**
         * 오늘 기록 조회
         */
        async getTodayRecord() {
            return await GET<RecordRes>(`/today/history`);
        },
        /**
         * 오늘 운세 조회
         */
        async getTodayLucky() {
            return await GET(`/today/luck`);
        },
        /**
         * 오늘 날씨 조회
         */
        async getTodayWeather(lat: string, lon: string) {
            return await GET<WeatherRes>(`/today/weather?x=${lat}&y=${lon}`);
        },
    };
};
