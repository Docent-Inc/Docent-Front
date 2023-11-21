import { GET, POST, DELETE } from "~/services";
import {
    type DiaryModel,
    type MemoModel,
    type DiaryRatioModel,
    type DiaryListModel,
} from "~/models/diary";

export const useDiaryService = () => {
    return {
        /**
         * 아침 다이어리 조회 (꿈)
         */
        async getMorningdiary(diary_id: number) {
            return await GET<DiaryModel>(
                `/diary/morning/read?diary_id=${diary_id}`,
            );
        },
        /**
         * 저녁 다이어리 조회 (일기)
         */
        async getNightdiary(diary_id: number) {
            return await GET<DiaryModel>(
                `/diary/night/read?diary_id=${diary_id}`,
            );
        },
        /**
         * 메모 조회
         */
        async getMemo(memo_id: number) {
            return await GET<MemoModel>(`/diary/memo/read?memo_id=${memo_id}`);
        },

        /**
         * 아침 다이어리 삭제 (꿈)
         */
        async deleteMorningdiary(diary_id: number) {
            return await DELETE<DiaryModel>(
                `/diary/morning/delete?diary_id=${diary_id}`,
            );
        },
        /**
         * 저녁 다이어리 삭제 (일기)
         */
        async deleteNightdiary(diary_id: number) {
            return await DELETE<DiaryModel>(
                `/diary/night/delete?diary_id=${diary_id}`,
            );
        },
        /**
         * 메모 삭제
         */
        async deleteMemo(memo_id: number) {
            return await DELETE<DiaryModel>(
                `/diary/memo/delete?memo_id=${memo_id}`,
            );
        },

        /**
         * 아침 다이어리 조회 - 공유용 (꿈)
         */
        async getShareMorningdiary(diary_id: number) {
            return await GET<DiaryModel>(`/diary/morning/share/${diary_id}`);
        },
        /**
         * 저녁 다이어리 조회 - 공유용 (일기)
         */
        async getShareNightdiary(diary_id: number) {
            return await GET<DiaryModel>(`/diary/night/share/${diary_id}`);
        },

        /**
         * 마이페이지 목록 조회 (아침, 저녁, 메모)
         */
        async getGalleryList(diary_type: number, page: number) {
            return await POST<DiaryListModel>(`/diary/list`, {
                diary_type: diary_type,
                page: page,
            });
        },
        /**
         * 마이페이지 상세 조회 (비율)
         */
        async getRatio() {
            return await GET<DiaryRatioModel>(`/diary/ratio`);
        },

        /**
         * 캘린더 목록 조회
         */
        async getCalendarList(year: number, month: number) {
            return await POST(`/diary/list/calender`, {
                year: year,
                month: month,
            });
        },
        /**
         * 캘린더 조회
         */
        async getCalendar(year: number, month: number, day: number) {
            return await POST(`/diary/list/calender`, {
                year: year,
                month: month,
                day: day,
            });
        },
    };
};
