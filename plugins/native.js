/**
 * native.js
 * (Web -> App 웹에서 앱에 정의된 Bridge 함수 호출)
 */
import { isIOSApp } from "~/utils/utils";

export default defineNuxtPlugin(() => {
    const native = {
        reqFCMToken: () => {
            console.log("Call Native bridge [ reqFCMToken ]");

            if (isIOSApp()) {
                window.webkit.messageHandlers.reqFCMToken.postMessage("");
                return;
            }

            console.error("Failed Native bridge [ reqFCMToken ]");
        },
    };
    return {
        provide: { native },
    };
});
