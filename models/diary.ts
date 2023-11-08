// models/diary.vue

/**
 * DiaryListModel
 */
export interface DiaryListModel {
    list: DiaryList[];
    count: number;
    total_MorningDiary_count: number;
    total_NightDiary_count: number;
    total_Memo_count: number;
    // 통계 정보
    max_category: number;
    MoriningDiary_ratio: number;
    NightDiary_ratio: number;
    Memo_ratio: number;
}

interface DiaryList {
    id: number;
    User_id: number;
    diary_name: string;
    diary_type: number;
    resolution?: string;
    image_url: string;
    background_color: string;
    create_date: string;
    modify_date: string;
    is_deleted: boolean;
}
