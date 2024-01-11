/**
 * Firebase.js
 * (Firebase 모듈은 CSR에서 동작하지 않으므로 함수들은 client 모드일 때만 실행됨)
 */
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { isIOSApp } from "~/utils/utils";

const firebaseConfig = {
    apiKey: "AIzaSyAR7EVRk7tK2-ygKtecKt9iK6qaEVFSvLs",
    authDomain: "looi-b28fe.firebaseapp.com",
    projectId: "looi-b28fe",
    storageBucket: "looi-b28fe.appspot.com",
    messagingSenderId: "474327539636",
    appId: "1:474327539636:web:0e12bc5c9db1539b9e5ce1",
    measurementId: "G-MNM6B8Q54T",
};

/**
 * getFCMToken - FCM Token 가져오는 함수
 * @return currentToken
 */
export async function getFCMToken() {
    if (process.client) {
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        const currentToken = await getToken(messaging, {
            vapidKey:
                "BIpZ0ulrR4xjIQQsiJUyhHKmC1vV681U38HJcXDDcvaHGIye5V5-cxF657EoODQt5a4pRphThXk2_L4OICEN-SI",
        });

        // 토큰이 없는 경우, 권한 요청 후 빈 스트링 '' 리턴
        if (!currentToken) {
            console.error(
                "No registration token available. Request permission to generate one.",
            );
            Notification.requestPermission();
            return "";
        }
        return currentToken;
    }
}

function isNewNotificationSupported() {
    if (!window.Notification || !Notification.requestPermission) return false;
    if (Notification.permission == "granted") {
        // Ensure that Notification.permission is "default" before testing
        Notification.requestPermission().then((permission) => {
            if (permission === "default") {
                throw new Error(
                    "You must only call this *before* calling Notification.requestPermission(), otherwise this feature detect would bug the user with an actual notification!",
                );
            }
        });
    }
    try {
        new Notification("");
    } catch (e) {
        if (e.name == "TypeError") return false;
    }
    return true;
}

/**
 * onMessageListener - 앱 사용 중 메시지 수신 (포그라운드)
 */
export const onMessageListener = () => {
    if (process.client) {
        console.log("Foreground Message Listener registered!");

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        const isMobile = /Mobile/.test(navigator.userAgent);

        if (!isMobile) {
            onMessage(messaging, (payload) => {
                console.log("[Foreground]", payload);
                const { BASE_FRONT_URL } = useRuntimeConfig().public;

                const notificationTitle = payload.data.title;
                const notificationOptions = {
                    body: payload.data.body + "포어",
                    image: payload.data.image_url,
                    icon: "https://docent.zip/icon.png",
                };

                const notif = new Notification(
                    notificationTitle,
                    notificationOptions,
                );
                console.log(notif);
                notif.onclick = (event) => {
                    event.preventDefault();
                    const landing_url = payload.data.landing_url;
                    const newPath = landing_url ? landing_url : "/chat";
                    window.location.href = `${BASE_FRONT_URL}${newPath}`;
                    notif.close();
                };
            });
        } else if (!isIOSApp() && isMobile) {
            console.log("Mobile:AOS");
            registration.showNotification(
                notificationTitle,
                notificationOptions,
            );
        }
    }
};
