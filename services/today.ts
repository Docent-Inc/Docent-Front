import type { Record } from '~/models/chat';
import { GET } from "~/services";

interface Diaries {
    MorningDiary: Record[];
    NightDiary: Record[];
}
interface RecordRes {
    data: Diaries;
    message: string;
    status_code: number;
    success: boolean;
}

export const useTodayService = () => {
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
        async getTodayRecord(): Promise<RecordRes> {
            return await GET(`/today/history`);
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
            return await GET(`/today/weather?x=${lat}&y=${lon}`);
        },
    };
};
