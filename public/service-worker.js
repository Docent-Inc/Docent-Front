// This is the "Offline copy of pages" service worker
const CACHE = "pwabuilder-offline";

importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js",
);

self.addEventListener("message", (event) => {
    // console.log(event);
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

workbox.setConfig({ debug: false });
workbox.routing.registerRoute(
    new RegExp("/*"),
    new workbox.strategies.NetworkFirst({
        cacheName: CACHE,
    }),
);
