importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');
const firebaseConfig = {
  apiKey: "AIzaSyDHL4CSEjJBdNUI4IozRI-7Suqd4UqUoDI",
  authDomain: "avindia-db2bd.firebaseapp.com",
  databaseURL: "https://avindia-db2bd-default-rtdb.firebaseio.com",
  projectId: "avindia-db2bd",
  storageBucket: "avindia-db2bd.appspot.com",
  messagingSenderId: "970872368951",
  appId: "1:970872368951:web:fe17e10b3a366f86c6b4b2"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();