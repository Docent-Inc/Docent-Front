import { Calendar } from "v-calendar";
import { useDiaryService } from "~/services/diary";

interface Attribute {
    key: number;
    dot?: string;
    highlight?: boolean | Object;
    dates: Date[] | Date;
}

interface Calendar {
    id: number;
    diary_name: string;
    start_time: string;
    end_time: string;
}

const initialState = () => ({
    page: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    },
    date: {
        date: new Date(),
        todos: null,
    },
    attributes: [] as Attribute[],
    list: [] as Calendar[],
    todos: [] as Calendar[],
});

export const useCalendarStore = defineStore("calendar", {
    state: initialState,
    actions: {
        /**
         * 현재 페이지 선택
         * (1) 페이지 세팅
         * (2) 해당 페이지(달)의 일정 목록 조회
         */
        setPage(date: Date) {
            this.page.year = date.getFullYear();
            this.page.month = date.getMonth() + 1;

            this.getCalendarList();
        },
        /**
         * 하이라이트 할 날짜 선택
         * (1) 날짜, 페이지 세팅 & 해당 일자 하이라이트
         * (2) 해당 일자의 일정 목록 조회
         */
        setDate(date: Date) {
            this.date.date = date;
            this.setPage(date);

            this.attributes = this.attributes.filter((e) => !e.highlight);
            this.attributes.push({
                key: date.getDate(),
                highlight: {
                    color: "black",
                    fillMode: "outline",
                },
                dates: date,
            });

            this.getCalendar();
        },
        /**
         * 현재 페이지의 일정 attr로 세팅
         * (1) 하이라이트 제외 attr 초기화
         * (2) 해당하는 일자에 dot 추가
         */
        setAttributes() {
            this.attributes = this.attributes.filter((e) => e.highlight);
            this.list.forEach((cal) => {
                const dates = [];
                const start_time = new Date(cal.start_time);
                const end_time = new Date(cal.end_time);
                while (start_time <= end_time) {
                    dates.push(new Date(start_time));
                    start_time.setDate(start_time.getDate() + 1);
                }

                const attr = {
                    key: cal.id,
                    dot: "light-gray",
                    dates: dates,
                };

                this.attributes.push(attr);
            });
        },
        async getCalendarList() {
            const { getCalendarList } = useDiaryService();
            const res = await getCalendarList(this.page.year, this.page.month);
            this.list = res.data;

            this.setAttributes();
        },
        async getCalendar() {
            const { getCalendar } = useDiaryService();
            const res = await getCalendar(
                this.date.date.getFullYear(),
                this.date.date.getMonth() + 1,
                this.date.date.getDate()
            );
            this.todos = res.data;
        },
        reset() {
            Object.assign(this.$state, initialState());
        },
    },
});
