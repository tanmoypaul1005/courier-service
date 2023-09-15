import firebase from 'firebase'
// import { Toastr } from '../../Utility/UtilityFunctions';
import useGeneralStore from '../stores/others/generalStore';
import { Toastr } from '../utility/utilityFunctions';

export const firebase_config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}
firebase.initializeApp(firebase_config)

let messaging = null;
if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}

messaging && messaging.onMessage((payload) => {
    // console.log('Message received. ', payload);
    let x = localStorage.getItem('numOfUnreadNotification').toString();
    let y = parseInt(x);
    localStorage.setItem("numOfUnreadNotification", ++y);
    useGeneralStore.getState().setHasUnseenNotification();
    Toastr({ message: payload.notification.body, type: 'success' })
});

export default firebase