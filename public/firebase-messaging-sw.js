importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCZQkO3jdTZi2KRR_YtG5ZVqr1NiLC3qx4",
    authDomain: "limadi-48272.firebaseapp.com",
    projectId: "limadi-48272",
    storageBucket: "limadi-48272.appspot.com",
    messagingSenderId: "496271938049",
    appId: "1:496271938049:web:67b36a78f58cf22e082600",
    measurementId: "G-W900ZCX0KM"
});


let initMessaging = null;
if (firebase.messaging.isSupported()) {
    initMessaging = firebase.messaging();
}

initMessaging && initMessaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

});

