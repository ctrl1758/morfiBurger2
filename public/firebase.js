// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { 
        getDatabase,
        ref,
        onValue,
        onChildAdded,
        push,
        } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

import {collection, query, getDocs, getFirestore,where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBCwkqzsW2hwvmo50GpJTA0lMh9sfyFqPE",
    authDomain: "morfiburger-cce16.firebaseapp.com",
    projectId: "morfiburger-cce16",
    storageBucket: "morfiburger-cce16.appspot.com",
    messagingSenderId: "485513449682",
    appId: "1:485513449682:web:a78c7495ca2bf40475dd0b",
    measurementId: "G-PYX2Y9T4J1"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);



export{ref,push,collection, query, getDocs,db,where}