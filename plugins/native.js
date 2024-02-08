/**
 * native.js
 * (Web -> App 웹에서 앱에 정의된 Bridge 함수 호출)
 */
import { isIOSApp } from "~/utils/utils";
import { getFCMToken } from "~/firebase/firebase";

export default defineNuxtPlugin(() => {
    const native = {
        // 기존 reqFCMToken 함수
        reqFCMToken: async () => {
            console.log("Call Native bridge [ reqFCMToken ]");
            if (isIOSApp()) {
                window.webkit.messageHandlers.reqFCMToken.postMessage("");
            } else {
                const token = await getFCMToken();
                window.resFCMToken(token);
            }
        },
        // controlSafeArea 함수를 native 객체에 추가
        controlSafeArea: async (tf) => {
            if (window.webkit && window.webkit.messageHandlers.adjustSafeArea) {
                window.webkit.messageHandlers.adjustSafeArea.postMessage(tf);
                setTimeout(() => {
                    const event = new Event('resize');
                    window.dispatchEvent(event);
                    const element = document.querySelector(".contents");
                    const currentHeight = parseFloat(getComputedStyle(element).height);
                    if (tf === false) {
                        const newHeight = currentHeight - 57;
                        element.style.height = `${newHeight}px`;
                    }
                    else {
                        const newHeight = currentHeight + 57;
                        element.style.height = `${newHeight}px`;
                    }
                }, 300); // 300ms 딜레이
            }
        },
        // openKakaoLink 함수를 native 객체에 추가
        openKakaoLink: async (url) => {
            if (isIOSApp() && window.webkit && window.webkit.messageHandlers.openKakaoLink) {
                window.webkit.messageHandlers.openKakaoLink.postMessage(url);
            }
            else {
                window.location.href = url;
            }
        },
        openLink: async (url) => {
            if (isIOSApp() && window.webkit && window.webkit.messageHandlers.openLink) {
                window.webkit.messageHandlers.openLink.postMessage(url);
            } else {
                window.location.href = url;
            }
        }
    };

    // native 객체를 Nuxt 애플리케이션에 제공
    return {
        provide: { native },
    };
});