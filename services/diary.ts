import API from "../utils/axios";

export const useDiaryService = () => {
    return {
        /**
         * 아침 다이어리 조회
         */
        async getMorningdiary(diary_id: number) {
            const res = await API.get(
                `/api/diary/morning/read?diary_id=${diary_id}`
            );
            return res.data;
        },
        /**
         * 저녁 다이어리 조회
         */
        async getNightdiary(diary_id: number) {
            const res = await API.get(
                `/api/diary/night/read?diary_id=${diary_id}`
            );
            return res.data;
        },
        /**
         * 갤러리 목록 조회 (아침, 저녁, 메모)
         */
        async getGalleryList(diary_type: number, page: number) {
            const res = await API.post(`/api/diary/list`, {
                diary_type: diary_type,
                page: page,
            });
            return res.data;
        },
    };
};
