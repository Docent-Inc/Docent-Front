import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useSettingService } from "~/services/setting";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAR7EVRk7tK2-ygKtecKt9iK6qaEVFSvLs",
    authDomain: "looi-b28fe.firebaseapp.com",
    projectId: "looi-b28fe",
    storageBucket: "looi-b28fe.appspot.com",
    messagingSenderId: "474327539636",
    appId: "1:474327539636:web:0e12bc5c9db1539b9e5ce1",
    measurementId: "G-MNM6B8Q54T",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
// GA 사용 필요할 경우 주석 해제하여 사용
// const analytics = getAnalytics(app);

// subsequent calls to getToken will return from cache.
getToken(messaging, {
    vapidKey:
        "BIpZ0ulrR4xjIQQsiJUyhHKmC1vV681U38HJcXDDcvaHGIye5V5-cxF657EoODQt5a4pRphThXk2_L4OICEN-SI",
})
    .then((currentToken) => {
        if (currentToken) {
            // 서버에 토큰 전송
            const { updateAccount } = useSettingService();
            window.alert(currentToken);
            updateAccount({ push_token: currentToken });
        } else {
            console.log(
                "No registration token available. Request permission to generate one.",
            );
            // 토큰 없으면 알림 권한 요청
            Notification.requestPermission();
        }
    })
    .catch(async (err) => {
        console.log(err);
    });

// 앱 사용 중 메시지 수신
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
