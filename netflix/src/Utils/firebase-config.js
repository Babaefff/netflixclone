// Import the functions youed  the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAA9pNNwS9atayJyxFlYCjYIcy73IMeP6M",
  authDomain: "netflix-cd398.firebaseapp.com",
  projectId: "netflix-cd398",
  storageBucket: "netflix-cd398.appspot.com",
  messagingSenderId: "540144512345",
  appId: "1:540144512345:web:8d1f3e8016d49c177e3048",
  measurementId: "G-PS5RM1G7QN"
};



const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);