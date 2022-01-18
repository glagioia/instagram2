// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgaOmUFa64_34Qm05TgjcMFhVx6qsIbmc",
  authDomain: "instagram2-a660e.firebaseapp.com",
  projectId: "instagram2-a660e",
  storageBucket: "instagram2-a660e.appspot.com",
  messagingSenderId: "202335967077",
  appId: "1:202335967077:web:6fb0b67a856da0abdbf38c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();


export { app, db, storage };