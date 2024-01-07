/**
 * functions.js
 * (App -> Web 앱에서 JavaScript 함수 호출)
 */

import { useAuthService } from "~/services/auth";

export default defineNuxtPlugin((nuxtApp) => {
    const resFCMToken = async (token) => {
        console.log("✈️Hybrid Function Called: \n", token);
        const res = await useAuthService().signup({ push_token: token });
        if (res.success) {
            console.log("*FCM 토큰 등록 성공", res);
            return true;
        }

        console.error("*FCM 토큰 등록 실패", res);
        return false;
    };

    // Native 앱에서 사용할 수 있도록 window 객체에 할당
    if (typeof window !== "undefined") {
        window.resFCMToken = resFCMToken;
    }
});
