// if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
//     importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// const firebaseConfig = {
//     apiKey: "AIzaSyAR7EVRk7tK2-ygKtecKt9iK6qaEVFSvLs",
//     authDomain: "looi-b28fe.firebaseapp.com",
//     projectId: "looi-b28fe",
//     storageBucket: "looi-b28fe.appspot.com",
//     messagingSenderId: "474327539636",
//     appId: "1:474327539636:web:0e12bc5c9db1539b9e5ce1",
//     measurementId: "G-MNM6B8Q54T",
// };

// const app = firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging(app);

// // 앱이 백그라운드 상태일 때 수신된 메시지는 브라우저의 화면 알림을 트리거
// messaging.onBackgroundMessage(function(payload) {
//     console.log('Received background message ', payload);
  
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body: payload.notification.body,
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
// }