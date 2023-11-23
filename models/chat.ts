// models/chat.vue

/**
 * ExampleChatModel
 */
export interface ExampleChatModel {
    type: number;
    is_deleted: boolean;
    id: number;
    text: string;
}

/**
 * ChatContentModel
 */
export interface ChatContentModel {
    diary_id: number;
    text_type: number;
    content: Dream | Record | Diary | Memo | Calender;
}

// content_type 1 - 꿈기록
interface Dream {
    diary_name: String;
    content: String;
    resolution: String;
    image_url: String;
    create_date: String;
}

// content_type 2 - 일기
interface Diary {
    diary_name: String;
    content: String;
    image_url: String;
    create_date: String;
}

export interface Record {
    User_id: number | null;
    background_color: string | null;
    content: string | null;
    create_date: string | null;
    diary_name: string | null;
    diary_type?: number | null;
    id: number | null;
    image_url: string | null;
    is_completed: boolean | null;
    is_deleted: boolean | null;
    main_keyword: string | null;
    modify_date: string | null;
    resolution?: string | null;
}

// content_type 3 - 메모
interface Memo {
    title: String;
    content: String;
    create_date: String;
}

// content_type 4 - 일정
interface Calender {
    title: String;
    content: String;
    start_time: String;
    end_time: String;
}
