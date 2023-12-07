export const useCalendarService = () => {
    const { GET, POST, PUT, DELETE } = useAxios();

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
