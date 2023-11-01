/**
 * 현재 시간에 따른 타입을 리턴해 주는 함수
 * @param {number} hour
 * 아침 (6:00 - 11:59)
 * 낮(12:00 - 17:59)
 * 저녁 (18:00 - 23:59)
 * 새벽 (00:00 - 5:59)
 */
export function getHourType(hour) {
    if (hour >= 6 && hour < 12) {
        return 2;
    } else if (hour >= 12 && hour < 18) {
        return 3;
    } else if (hour >= 18 && hour <= 23) {
        return 4;
    } else {
        return 1;
    }
}
