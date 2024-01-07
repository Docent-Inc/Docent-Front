/**
 * Firebase.js
 * (Firebase 모듈은 CSR에서 동작하지 않으므로 함수들은 client 모드일 때만 실행됨)
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

/**
 * onMessageListener - 앱 사용 중 메시지 수신 (포그라운드)
 */
export const onMessageListener = () => {
    if (process.client) {
        console.log("hrer");
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        onMessage(messaging, (payload) => {
            const sendMessage = (payload) => {
                const notificationTitle = payload.notification.title;
                const notificationOptions = {
                    body: payload.notification.body,
                    icon: payload.notification.image,
                };
                const notif = new Notification(
                    notificationTitle,
                    notificationOptions,
                );
                notif.onclick = () => {
                    const router = useRouter();
                    router.push("/home");
                    console.log("Notification clicked");
                };
                console.log(notif);
            };
            sendMessage(payload);
        });
    }
};
