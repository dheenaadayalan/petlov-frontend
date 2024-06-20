// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "petlov-b955c.firebaseapp.com",
  projectId: "petlov-b955c",
  storageBucket: "petlov-b955c.appspot.com",
  messagingSenderId: "273071479280",
  appId: "1:273071479280:web:384df99073092487ada535",
  measurementId: "G-HXPZEHLGTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)