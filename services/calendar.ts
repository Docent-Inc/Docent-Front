import { DELETE } from "~/services";

export const useCalendarService = () => {
    return {
        /**
         * 일정 삭제
         */
        async deleteCalendar(calenderId: number) {
            return await DELETE(
                `/diary/calender/delete?calender_id=${calenderId}`,
            );
        },
    };
};
