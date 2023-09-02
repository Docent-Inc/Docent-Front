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
    };
};
