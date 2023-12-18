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

/**
 * 배경 색상 밝기 판단 함수
 * @param {string[]} backgroundColors - ex. ['rgb(255, 255, 255)']
 */
export function getTextColorForBackground(backgroundColors) {
    let totalBrightness = 0;
    backgroundColors.forEach((color) => {
        const rgb = color.match(/\d+/g).map(Number);
        totalBrightness += getBrightness(rgb[0], rgb[1], rgb[2]);
    });
    const avgBrightness = totalBrightness / backgroundColors.length;
    return avgBrightness > 128 ? "#1F2937" : "#fff";
}

function getBrightness(r, g, b) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

/**
 * 위도, 경도 가져오기
 */
export async function getCoordinates() {
    return new Promise((resolve, reject) => {
        const isPermissionDenied = localStorage.getItem(
            "locationPermissionDenied",
        );

        if (isPermissionDenied) {
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                    handlePermissionDenied();
                },
            );
        } else {
            reject(new Error("위치 정보 수집이 허가되지 않았습니다"));
            handlePermissionDenied();
        }
    });
}

function handlePermissionDenied() {
    localStorage.setItem("locationPermissionDenied", "true");
}

/**
 * 만료 n분 전 확인
 * @param {string} date - Date 객체 String으로 된 것
 * @param {number} minute - n분 전인지 확인
 */
export function isExpiredIn(date, minute) {
    const expirationDate = new Date(date);
    const now = new Date();

    const diff = expirationDate - now;
    const minutesInMilliseconds = minute * 60 * 1000;

    return diff <= minutesInMilliseconds;
}

/**
 * html escape
 */
export function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"']/g, function (match) {
        switch (match) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case '"':
                return "&quot;";
            case "'":
                return "&#039;";
            default:
                return match;
        }
    });
}
