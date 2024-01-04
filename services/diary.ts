import { useAxios } from "~/composables/useAxios";
import {
    type DiaryModel,
    type MemoModel,
    type DiaryRatioModel,
    type DiaryListModel,
    type CalendarModel,
    type CalendarListModel,
    type RecordsReqBodyModel,
    type RecordResModel,
} from "~/models/diary";
import axios from "axios";

export const useDiaryService = () => {
    const { GET, POST, PUT, PATCH, DELETE } = useAxios();

    return {
        /**
         * 아침 다이어리 조회 (꿈)
         */
        async getMorningdiary(diary_id: number) {
            return await GET<DiaryModel>(
                `/dream/read?dream_id=${diary_id}`,
            );
        },
        /**
         * 저녁 다이어리 조회 (일기)
         */
        async getNightdiary(diary_id: number) {
            return await GET<DiaryModel>(
                `/diary/read?diary_id=${diary_id}`,
            );
        },
        /**
         * 메모 조회
         */
        async getMemo(memo_id: number) {
            return await GET<MemoModel>(`/memo/read?memo_id=${memo_id}`);
        },

        /**
         * 아침 다이어리 생성 (꿈)
         */
        async postMorningDiary(reqBody: RecordsReqBodyModel) {
            return await POST<RecordResModel>(`/dream/create`, reqBody);
        },
        /**
         * 저녁 다이어리 생성 (일기)
         */
        async postNightDiary(reqBody: RecordsReqBodyModel) {
            return await POST<RecordResModel>(`/diary/create`, reqBody);
        },
        /**
         * 메모 생성
         */
        async postMemo(reqBody: RecordsReqBodyModel) {
            return await POST<RecordResModel>(`/memo/create`, reqBody);
        },

        /**
         * 아침 다이어리 Looi 생성 (꿈)
         */
        async generateMorningDiary(diary_id: number) {
            const url = `/dream/generate?dream_id=${diary_id}`;
            return await PATCH<RecordResModel>(url);
        },

        /**
         * 저녁 다이어리 Looi 생성 (일기)
         */
        async generateNightDiary(diary_id: number) {
            const url = `/diary/generate?diary_id=${diary_id}`;
            return await PATCH<RecordResModel>(url);
        },

        /**
         *  메모 Looi 생성
         */

        async generateMemo(memo_id: number) {
            const url = `/memo/generate?memo_id=${memo_id}`;
            return await PATCH<RecordResModel>(url);
        },

        /**
         * 아침 다이어리 삭제 (꿈)
         */
        async deleteMorningdiary(diary_id: number) {
            return await DELETE<DiaryModel>(
                `/dream/delete?dream_id=${diary_id}`,
            );
        },
        /**
         * 저녁 다이어리 삭제 (일기)
         */
        async deleteNightdiary(diary_id: number) {
            return await DELETE<DiaryModel>(
                `/diary/delete?diary_id=${diary_id}`,
            );
        },
        /**
         * 메모 삭제
         */
        async deleteMemo(memo_id: number) {
            return await DELETE<DiaryModel>(
                `/memo/delete?memo_id=${memo_id}`,
            );
        },

        /**
         * 공유된 게시물 조회
         */
        async getSharedDiary(diary_id: string) {
            return await GET<DiaryModel>(`/share/${diary_id}`);
        },

        /**
         * 마이페이지 목록 조회 (아침, 저녁, 메모)
         */
        async getGalleryList(diary_type: string, page: number) {
            return await GET<DiaryListModel>(`/${diary_type}/list?page=${page}`);
        },
        /**
         * 마이페이지 상세 조회 (비율)
         */
        async getRatio() {
            return await GET<DiaryRatioModel>(`/statistics/ratio`);
        },

        /**
         * 캘린더 목록 조회
         */
        async getCalendarList(year: number, month: number) {
            return await GET<CalendarListModel>(`/calendar/list?year=${year}&month=${month}`);
        },
        /**
         * 캘린더 조회
         */
        async getCalendar(year: number, month: number, day: number) {
            return await GET<CalendarModel[]>(`/calendar/list?year=${year}&month=${month}&day=${day}`);
        },

        /**
         * 아침 다이어리 수정 (꿈)
         */
        async putMorningDiary(reqBody: RecordsReqBodyModel, id: string) {
            return await PATCH<RecordResModel>(
                `/dream/update?dream_id=${id}`,
                reqBody,
            );
        },
        /**
         * 저녁 다이어리 수정 (일기)
         */
        async putNightDiary(reqBody: RecordsReqBodyModel, id: string) {
            return await PATCH<RecordResModel>(
                `/diary/update?diary_id=${id}`,
                reqBody,
            );
        },
        /**
         * 메모 수정
         */
        async putMemo(reqBody: RecordsReqBodyModel, id: string) {
            return await PATCH<RecordResModel>(`/memo/update?memo_id=${id}`, reqBody);
        },
    };
};
