import { Calendar } from "v-calendar";
import { useCalendarService } from "~/services/calendar";
import { useDiaryService } from "~/services/diary";
import { type CalendarModel } from "~/models/diary";
interface Attribute {
    key: number;
    dates: Date | { start: Date; end: Date };
    customData?: {
        class: string;
        title: string;
    };
    highlight?: boolean | Object;
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
    list: [] as CalendarModel[],
    todos: [] as CalendarModel[],
    overlapAttrs: [],
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
            if (!isNaN(date.getTime())) {
                this.page.year = date.getFullYear();
                this.page.month = date.getMonth() + 1;

                this.getCalendarList();
            }
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
                    fillMode: "solid",
                },
                dates: date,
            });

            this.getCalendarDate();
        },

        /**
         * 현재 페이지의 일정 attr로 세팅
         * (1) 하이라이트 제외 attr 초기화
         * (2) 해당하는 일자에 dot 추가
         */

        setAttributes() {
            this.attributes = this.attributes.filter((e) => e.highlight);
            const overlappingCount: { [key: number]: number } = {};

            this.list.forEach((cal) => {
                const endDate = new Date(cal.end_time);

                for (
                    let startDate = new Date(cal.start_time);
                    startDate.getTime() <= endDate.getTime();
                    startDate.setDate(startDate.getDate() + 1)
                ) {
                    const dateString = startDate.getDate();

                    if (endDate.getHours() === 0) {
                        overlappingCount[dateString + 1] =
                            (overlappingCount[dateString + 1] || 0) + 1;
                    }

                    overlappingCount[dateString] =
                        (overlappingCount[dateString] || 0) + 1;
                }
            });

            this.list.forEach((cal) => {
                const startDate = new Date(cal.start_time);
                const endDate = new Date(cal.end_time);

                const dates = {
                    start: startDate,
                    end: endDate,
                };

                let customClass = "todo-title";

                if (endDate.getDate() > startDate.getDate()) {
                    customClass += " one-more-days";
                }

                const findEventsOnDate = (date: number) => {
                    const eventsOnDate: CalendarModel[] = [];
                    this.list.forEach((event) => {
                        const eventStartDate = new Date(
                            event.start_time,
                        ).getDate();
                        const eventEndDate = new Date(event.end_time).getDate();

                        if (eventStartDate <= date && date <= eventEndDate) {
                            eventsOnDate.push(event);
                        }
                    });
                    return eventsOnDate;
                };

                let overlapNum = -1;
                const count = overlappingCount[startDate.getDate()];

                if (count > 1) {
                    const events = findEventsOnDate(startDate.getDate());

                    overlapNum = events.findIndex((a) => {
                        return Number(a.id) === Number(cal.id);
                    });
                }

                const attr = {
                    key: cal.id,
                    dates: dates,
                    customData: {
                        class:
                            overlapNum > -1
                                ? `${cal.title} ${customClass} overlap-${overlapNum}`
                                : `${cal.title} ${customClass}`,
                        title: cal.title,
                    },
                };

                this.attributes.push(attr);
                this.overlapAttrs = [];
            });
        },

        async getCalendarList() {
            const { getCalendarList } = useDiaryService();
            const res = await getCalendarList(this.page.year, this.page.month);
            console.log(res.data);
            this.list = res.data.list;
            this.setAttributes();
        },
        async getCalendarDate() {
            const { getCalendar } = useDiaryService();
            const res = await getCalendar(
                this.date.date.getFullYear(),
                this.date.date.getMonth() + 1,
                this.date.date.getDate(),
            );

            this.todos = res.data;
        },
        async deleteCalendarItem(calendarId: number, date: Date) {
            try {
                const { deleteCalendar } = useCalendarService();
                await deleteCalendar(calendarId);

                this.setPage(date);
                this.setDate(date);
            } catch (error) {
                console.error(error);
            }
        },
        reset() {
            Object.assign(this.$state, initialState());
        },
    },
});
