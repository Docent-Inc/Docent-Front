import API from "../utils/axios";

export const useCalendarService = () => {
    return {
        /**
         * 일정 삭제
         */
        async deleteCalendar(calenderId: number) {
            return await API.delete(
                `/diary/calender/delete?calender_id=${calenderId}`,
            );
        },
    };
};
