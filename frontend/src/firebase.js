import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6oUTMTv0dCa07wjqGHHsmhc1h3Gri2nE",
  authDomain: "mini-38fde.firebaseapp.com",
  projectId: "mini-38fde",
  storageBucket: "mini-38fde.appspot.com",
  messagingSenderId: "349061423994",
  appId: "1:349061423994:web:81e39a7961bb681a0b2cc3",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Firebase Auth
export const auth = getAuth(app);

// 🔵 Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// 🗄️ Firestore Database
export const db = getFirestore(app);

export default app;