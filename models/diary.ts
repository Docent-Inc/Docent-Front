// models/diary.vue

/**
 * DiaryRatioModel
 */
export interface DiaryRatioModel {
    ratio: DiaryRatio;
}

export interface DiaryRatio {
    max_category: number;
    memo_count: number;
    memo_ratio: number;
    morning_diary_count: number;
    morning_diary_ratio: number;
    night_diary_count: number;
    night_diary_ratio: number;
}

/**
 * DiaryListModel
 */
export interface DiaryListModel {
    list: DiaryList[];
    count: number;
    total_count: number;
}

export interface DiaryList {
    id: number;
    User_id: number;
    diary_name: string;
    diary_type: number;
    resolution?: string;
    image_url?: string;
    background_color?: string;
    create_date: string;
    modify_date: string;
    is_deleted: boolean;
}

/**
 * DiaryModel
 */
export interface DiaryModel {
    diary: Diary;
}

interface Diary {
    User_id: number;
    id: number;
    diary_name: string;
    content: string;
    image_url: string;
    background_color: string; // TODO: string[]
    create_date: string;
    modify_date: string;
    is_deleted: boolean;

    // 해몽 내용 (꿈인 경우에만 사용)
    is_completed?: boolean;
    resolution?: string;
    main_keyword?: string; // TODO: string[]
}

/**
 * MemoModel
 */
export interface MemoModel {
    memo: Memo;
}

interface Memo {
    User_id: number;
    id: number;
    title: string;
    content: string;
    create_date: string;
    modify_date: string;
    is_deleted: boolean;
    tags: string; // TODO: string[]
}

/**
 * Calendar
 */

export interface CalendarModel {
    User_id: number;
    content: string;
    end_time: string;
    id: number;
    is_deleted: boolean;
    start_time: string;
    title: string;
}

export interface CalendarListModel {
    list: CalendarModel[];
}

export interface CalendarMutateModel {
    year: string;
    month: string;
    day: string;
}

/**
 * 메모, 일기, 꿈 생성 reqBody
 */

export interface RecordsReqBodyModel {
    date?: Date; // "2023-12-12 00:00:00",
    title?: string;
    content: string;
}

export interface MemoRecord {
    id: number;
    User_id: number;
    diary_name: string;
    diary_type: number;
    create_date: string;
    modify_date: string;
    is_deleted: boolean;
    content: string;
}

export interface DiaryRecord {
    id: number;
    User_id: number;
    diary_name: string;
    diary_type: number;
    resolution?: string | undefined;
    image_url: string;
    background_color?: string | undefined;
    create_date: string;
    modify_date: string;
    is_deleted: boolean;
}

export type RecordType = "memo" | "diary";

export type RecordResModel = {
    memo: MemoRecord;
    diary: DiaryRecord;
};

export type RecordGeneralResModel = {
    success: boolean;
    message: string;
    data: {
        [key in RecordType]: MemoRecord | DiaryRecord;
    };
};
