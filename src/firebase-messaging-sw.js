importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
  apiKey: "AIzaSyAJOqxGKXYqJcJMEPAsUuVJx3BMEWW-73k",
  authDomain: "epitech-serverless.firebaseapp.com",
  projectId: "epitech-serverless",
  storageBucket: "epitech-serverless.appspot.com",
  messagingSenderId: "711705843792",
  appId: "1:711705843792:web:2692726515f46e06cbd955"
});
const messaging = firebase.messaging();
