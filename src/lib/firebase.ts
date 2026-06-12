import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWRYCcldUcjekGUyUAcqRikPZkvcfaGhA",
  authDomain: "medchain-f3170.firebaseapp.com",
  projectId: "medchain-f3170",
  storageBucket: "medchain-f3170.firebasestorage.app",
  messagingSenderId: "20546639083",
  appId: "1:20546639083:web:02210ca1e5b4cde4b71aae",
  measurementId: "G-PEZWTFB7C1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
