import { register } from "register-service-worker";

export function SW() {

    if (process.env.NODE_ENV === "production") {
        // 메시지 수신 서비스 워커 
        // register("/firebase-messaging-sw.js", {
        //     ready() {},
        //     registered() {},
        //     cached() {},
        //     updatefound() {},
        //     updated() {},
        //     offline() {},
        //     error(error) {
        //         console.error(
        //             "Error during service worker registration:",
        //             error,
        //         );
        //     },
        // });

        // console.log(navigator);
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
                console.error(
                    "Error during service worker registration:",
                    error,
                );
            },
        });
    }
}
