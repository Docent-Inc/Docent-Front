importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
);
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);

const firebaseConfig = {
    apiKey: "AIzaSyAR7EVRk7tK2-ygKtecKt9iK6qaEVFSvLs",
    authDomain: "looi-b28fe.firebaseapp.com",
    projectId: "looi-b28fe",
    storageBucket: "looi-b28fe.appspot.com",
    messagingSenderId: "474327539636",
    appId: "1:474327539636:web:0e12bc5c9db1539b9e5ce1",
    measurementId: "G-MNM6B8Q54T",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

/**
 * messaging.onBackgroundMessage - 앱 사용하지 않는 중 메시지 수신 (백그라운드)
 */
messaging.onBackgroundMessage(function (payload) {
    console.log("[Background]", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };
    const notif = new Notification(notificationTitle, notificationOptions);

    notif.onclick = () => {
        const landing_url = payload.data.landing_url;
        const newPath = landing_url ? landing_url : `/chat`;
        window.location.replace = "https://docent.zip" + newPath;
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
