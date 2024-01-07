/**
 * Firebase.js
 */
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

// 앱 사용 중 메시지 수신
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
