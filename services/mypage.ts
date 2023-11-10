import { GET } from "~/services";
import API from "../utils/axios";
import { DiaryRatioModel } from "models/diary";

export const useMypageService = () => {
    return {
        /**
         * 아침 다이어리 조회
         */
        async getMorningdiary(diary_id: number) {
            return await API.get(`/diary/morning/read?diary_id=${diary_id}`);
        },
        /**
         * 저녁 다이어리 조회
         */
        async getNightdiary(diary_id: number) {
            return await API.get(`/diary/night/read?diary_id=${diary_id}`);
        },
        /**
         * 메모 조회
         */
        async getMemo(memo_id: number) {
            return await API.get(`/diary/memo/read?memo_id=${memo_id}`);
        },
        /**
         * 갤러리 목록 조회 (아침, 저녁, 메모)
         */
        async getGalleryList(diary_type: number, page: number) {
            return await API.post(`/diary/list`, {
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
    };
};
