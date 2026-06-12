import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWRYCcldUcjekGUyUAcqRikPZkvcfaGhA",
  authDomain: "medchain-f3170.firebaseapp.com",
  projectId: "medchain-f3170",
  storageBucket: "medchain-f3170.firebasestorage.app",
  messagingSenderId: "20546639083",
  appId: "1:20546639083:web:02210ca1e5b4cde4b71aae",
  measurementId: "G-PEZWTFB7C1",
};

// Lazy-initialize only on client side to avoid SSR crashes
let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;

function getApp(): FirebaseApp {
  if (!_app) {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getApp());
  }
  return _auth;
}

export function getFirebaseDb(): Firestore {
  if (!_db) {
    _db = getFirestore(getApp());
  }
  return _db;
}

// For backward compat — these will throw on server if called at module level
// But are safe when called inside useEffect/event handlers (client only)
export const auth = typeof window !== "undefined" ? getFirebaseAuth() : (null as unknown as Auth);
export const db = typeof window !== "undefined" ? getFirebaseDb() : (null as unknown as Firestore);
export default _app;
