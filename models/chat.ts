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
    diary_id: Number;
    text_type: Number;
    content: Dream | Diary | Memo | Calender;
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
