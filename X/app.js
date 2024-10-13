// Firebase Configurations
const firebaseConfig = {
  apiKey: "AIzaSyDHL4CSEjJBdNUI4IozRI-7Suqd4UqUoDI",
  authDomain: "avindia-db2bd.firebaseapp.com",
  databaseURL: "https://avindia-db2bd-default-rtdb.firebaseio.com",
  projectId: "avindia-db2bd",
  storageBucket: "avindia-db2bd.appspot.com",
  messagingSenderId: "970872368951",
  appId: "1:970872368951:web:fe17e10b3a366f86c6b4b2"
};
// Initializing Firebase App
firebase.initializeApp(firebaseConfig);

// Initializing Cloud Messanging
const messaging = firebase.messaging();


// Registering Service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(res => {
        console.log("Register Success");
        messaging.useServiceWorker(res);
    }).catch(e => {
        console.log(e);
    });
}

// Subscribing to push Notifications
const subscribe = () => {
    const token = document.getElementById('token');
    // getting PushNotification permission from browser
    Notification.requestPermission().then(permission => {
        if (permission == "granted") {
            // if Permission is allowed then getting firebase messanging token from firebase
            messaging.getToken().then(currentToken => {
                console.log(currentToken);
                // displaying token in index file
                token.textContent = currentToken;
            });
        } else {
            token.textContent = "Permission not granted";
        }
    }).catch(e=>{
        token.textContent=e;
    });
};


// Sending Push Notifications
const sendPush = () => {
    // Getting From Data when button clicked
    const token = document.getElementById('usertoken').value;
    const notificationTitle = document.getElementById('title').value;
    const notificationBody = document.getElementById('body').value;

    // Adding data to payload for sending push notifications
    let body = {
        to: token,
        notification: {
            title: notificationTitle,
            body: notificationBody,
            click_action: "/",
        }
    };

    // Setting options for push notification
    const options = {
        method: "POST",
        headers: new Headers({
            // Add your server key after key=
            Authorization: "key=ez5sXRH-vcFy-F0KX2MpxQ:APA91bF_J8cXCmrAKT-hK_VO7PVciO5P1mc2yrgM3G_atZZ3I2A7z07TU1jpmqdzHDCKR7erJF35al6ExOmn2rw8Z4yXn91HDqzET1QlJFaFRVmJnNgrp9Dh6ZBqo23Lrh7wZreX0FzV",
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(body)
    };

    // Sending Push notifications to user using fetch api
    fetch("https://fcm.googleapis.com/fcm/send", options)
        .then(res => res.json())
        .then(data => {
            if (data.failure == 1) {
                alert("Token Expire");
            } else {
                alert("Send Success");
            }
        })
        .catch(err => {
            alert(err);
        });
};