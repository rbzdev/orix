// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAsP1FJLdxlmqh4D0oucPhA71N1oCynqA",
  authDomain: "orix-ui.firebaseapp.com",
  projectId: "orix-ui",
  storageBucket: "orix-ui.firebasestorage.app",
  messagingSenderId: "455746328351",
  appId: "1:455746328351:web:1db9396e3e22a78982022a",
  measurementId: "G-JCTXK9E6MQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);