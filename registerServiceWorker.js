import { register } from "register-service-worker";

export function SW() {
    // if (process.env.NODE_ENV === "production") {
    navigator.serviceWorker.addEventListener("message", (event) => {
        if (typeof event.data === "string" && event.data.includes("docent")) {
            window.location.href = event.data;
        } else if (event.data.data.landing_url) {
            window.location.href = `https://docent.zip${event.data.data.landing_url}`;
        }
    });

    navigator.serviceWorker.addEventListener("notificationclick", (event) => {
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
                            (new URL(client.url).hostname.includes("docent") ||
                                new URL(client.url).hostname.includes(
                                    "bmongsmong",
                                )) &&
                            "focus" in client
                        ) {
                            foundWindowClient = client;
                            // console.log(event.currentTarget.clients);
                            break;
                        }
                    }

                    if (foundWindowClient) {
                        return foundWindowClient
                            .focus()
                            .then((focusedClient) => {
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

    register(`/service-worker.js`, {
        ready() {
            // console.log(
            //     "App is being served from cache by a service worker.\n" +
            //         "For more details, visit https://goo.gl/AFskqB",
            // );
        },
        registered() {
            // console.log("Service worker has been registered.");
        },
        cached() {
            // console.log("Content has been cached for offline use.");
        },
        updatefound() {
            // console.log("New content is downloading.");
        },
        updated() {
            // console.log("New content is available; please refresh.");
        },
        offline() {
            // console.log(
            //     "No internet connection found. App is running in offline mode.",
            // );
        },
        error(error) {
            console.error("Error during service worker registration:", error);
        },
    });
    // }
}
