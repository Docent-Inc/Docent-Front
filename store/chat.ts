import { useGenerateService } from "../services/generate";
import dayjs from "dayjs";
enum ChatType {
    RESULT = "result",
    LOADING = "loading",
    SELECT = "select",
    DEFAULT = "default",
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

interface ChatContent {
    id: Number;
    content_type: Number;
    content: Dream | Diary | Memo | Calender;
}

interface Chat {
    is_docent: Boolean;
    type?: ChatType;
    text?: String;
    result?: ChatContent;
}

export const useChatStore = defineStore("chat", {
    state: () => ({
        list: [] as Chat[],
    }),
    actions: {
        addChat() {},
    },
});
