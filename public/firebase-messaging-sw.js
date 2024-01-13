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

self.addEventListener("notificationclick", (event) => {
    event.notification.close(); // 알림 닫기

    const landing_url = event.notification.data;
    const newPath = landing_url ? landing_url : `/chat`;

    const urlToOpen = new URL(`https://docent.zip${newPath}`);

    event.waitUntil(
        clients
            .matchAll({
                type: "window",
                includeUncontrolled: true, // 포커스된 창이 없을 때 새 창 열기
            })
            .then((windowClients) => {
                let foundWindowClient = null;
                // 이미 열려 있는 창에서 동일한 URL을 찾기 위한 로직 추가
                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i];

                    if (
                        new URL(client.url).hostname.includes("localhost") &&
                        "focus" in client
                    ) {
                        foundWindowClient = client;
                        // console.log(event.currentTarget.clients);
                        break;
                    }
                }

                if (foundWindowClient) {
                    return foundWindowClient.focus().then((focusedClient) => {
                        if ("navigate" in focusedClient) {
                            focusedClient.postMessage(urlToOpen.href);
                        }
                    });
                } else if (clients.openWindow) {
                    return clients.openWindow(urlToOpen.href);
                }
            }),
    );
});

messaging.onBackgroundMessage(function (payload) {
    console.log("[Background]", payload);

    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        image: payload.data.image_url,
        icon: "https://docent.zip/icon.png",
        data: payload.data.landing_url,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
