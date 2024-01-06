import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { useSettingService } from "./services/setting";

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
const messaging = getMessaging(app);

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
