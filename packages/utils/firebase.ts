// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Todo: Config env variables with turbo repo
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB__Inv29cJ5ylISYQY4LHLIeoFxZLr7s",
  authDomain: "todo-app-cd552.firebaseapp.com",
  projectId: "todo-app-cd552",
  storageBucket: "todo-app-cd552.appspot.com",
  messagingSenderId: "5980170796",
  appId: "1:5980170796:web:eee5e66f754f42cb007f89",
  measurementId: "G-XS0E67K61C",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase);

// I'll handle analytics later
// export const analytics = getAnalytics(app);
