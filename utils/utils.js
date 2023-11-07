/**
 * 현재 시간에 따른 타입을 리턴해 주는 함수
 * @param {number} hour
 * 아침 (6:00 - 11:59)
 * 낮(12:00 - 17:59)
 * 저녁 (18:00 - 19:59)
 * 밤 (20:00 - 5:59)
 */
export function getHourType(hour) {
    if (hour >= 6 && hour < 12) {
        return 1;
    } else if (hour >= 12 && hour < 18) {
        return 2;
    } else if (hour >= 18 && hour <= 20) {
        return 3;
    } else {
        return 4;
    }
}

/**
 * 랜덤 인덱스 제너레이터 함수
 * @param {number} min 시작 인덱스
 * @param {number} max 끝 인덱스
 */
export function randomInt(min, max) {
    return Math.floor(random() * (max - min + 1) + min);
}

function random() {
    const x = Math.sin(getRandomNumberBasedOnTime()) * 10000;
    return x - Math.floor(x);
}

function getRandomNumberBasedOnTime() {
    const currentTime = new Date().getTime();
    const randomSeed = currentTime % 11; // 0~10 사이의 숫자를 얻기 위해 11로 나눈 나머지를 사용
    return randomSeed;
}
