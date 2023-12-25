export type CalendarCreateModel = {
    start_time: "string";
    end_time: "string";
    title: "string";
    content: "string";
};

export const useCalendarService = () => {
    const { GET, POST, PUT, PATCH, DELETE } = useAxios();

    return {
        /**
         * 일정 추가
         */
        async createCalendar(data: CalendarCreateModel) {
            return await POST(`/calendar/create`, data);
        },
        /**
         * 일정 수정
         */
        async updateCalendar(calendarId: number, data: CalendarCreateModel) {
            return await PATCH(
                `/calendar/update?calendar_id=${calendarId}`,
                data,
            );
        },
        /**
         * 일정 삭제
         */
        async deleteCalendar(calenderId: number) {
            return await DELETE(
                `/calendar/delete?calendar_id=${calenderId}`,
            );
        },
    };
};
