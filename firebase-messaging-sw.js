import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

import { useSettingService } from "./services/setting";
// import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: "AIzaSyAR7EVRk7tK2-ygKtecKt9iK6qaEVFSvLs",
    authDomain: "looi-b28fe.firebaseapp.com",
    projectId: "looi-b28fe",
    storageBucket: "looi-b28fe.appspot.com",
    messagingSenderId: "474327539636",
    appId: "1:474327539636:web:0e12bc5c9db1539b9e5ce1",
    measurementId: "G-MNM6B8Q54T",
};
console.log("firebase on");
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
// GA 사용 필요할 경우 주석 해제하여 사용
// const analytics = getAnalytics(app);

// Get registration token. Initially this makes a network call, once retrieved

// 브라우저에서 알림 권한 설정 요청
function requestPermission() {
    console.log("권한 요청 중...");
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("알림 권한이 허용됨");

            // FCM 메세지 처리
            showNotification();
        } else {
            console.log("알림 권한 허용 안됨");
        }
    });
}

requestPermission();

// subsequent calls to getToken will return from cache.
getToken(messaging, {
    vapidKey:
        "BIpZ0ulrR4xjIQQsiJUyhHKmC1vV681U38HJcXDDcvaHGIye5V5-cxF657EoODQt5a4pRphThXk2_L4OICEN-SI",
})
    .then((currentToken) => {
        if (currentToken) {
            // 서버에 토큰 전송
            const { updateAccount } = useSettingService();
            console.log(currentToken);
            updateAccount({ push_token: currentToken });
        } else {
            // 토큰 없으면 알림 권한 요청
            requestPermission();
            console.log(
                "No registration token available. Request permission to generate one.",
            );
        }
    })
    .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
    });

// function showNotification() {
//     let notificationOptions = {
//         body: "Some Notification information",
//         icon: "<>",
//     };
//     let notif = new Notification("My New Notification", notificationOptions);

//     notif.onclick = () => {
//         console.log("Notification clicked");
//     };
// }

// 사용자가 현재 웹페이지를 보고 있을 때는 데이터 및 알림 페이로드를 페이지에서 직접 수신
onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
});

// 앱이 백그라운드 상태일 때 수신된 메시지는 브라우저의 화면 알림을 트리거
messaging.onBackgroundMessage(function (payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
