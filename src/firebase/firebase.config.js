// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApBl5QyVte3JI00gfFsC4LDCY1mapgVac",
    authDomain: "rcnmovie.firebaseapp.com",
    projectId: "rcnmovie",
    storageBucket: "rcnmovie.firebasestorage.app",
    messagingSenderId: "375922164463",
    appId: "1:375922164463:web:b157b9f47a432c2608911a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;