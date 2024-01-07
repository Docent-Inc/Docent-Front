/**
 * native.js
 * (Web -> App 웹에서 앱에 정의된 Bridge 함수 호출)
 */
import { isIOSApp } from "~/utils/utils";
import { getFCMToken } from "~/firebase/firebase";

export default defineNuxtPlugin(() => {
    const native = {
        /**
         * reqFCMToken - FCM Token 요청
         */
        reqFCMToken: async () => {
            console.log("Call Native bridge [ reqFCMToken ]");

            if (isIOSApp()) {
                window.webkit.messageHandlers.reqFCMToken.postMessage("");
            } else {
                const token = await getFCMToken();
                window.resFCMToken(token);
            }
        },
    };
    return {
        provide: { native },
    };
});
