// Firebase helper — ONLY import this from client-side code (useEffect, event handlers)
// NEVER import at module level in files that run during SSR

const firebaseConfig = {
  apiKey: "AIzaSyBWRYCcldUcjekGUyUAcqRikPZkvcfaGhA",
  authDomain: "medchain-f3170.firebaseapp.com",
  projectId: "medchain-f3170",
  storageBucket: "medchain-f3170.firebasestorage.app",
  messagingSenderId: "20546639083",
  appId: "1:20546639083:web:02210ca1e5b4cde4b71aae",
  measurementId: "G-PEZWTFB7C1",
};

export async function getFirebaseApp() {
  const { initializeApp, getApps } = await import("firebase/app");
  return getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
}

export async function getFirebaseAuth() {
  const { getAuth } = await import("firebase/auth");
  const app = await getFirebaseApp();
  return getAuth(app);
}

export async function getFirebaseDb() {
  const { getFirestore } = await import("firebase/firestore");
  const app = await getFirebaseApp();
  return getFirestore(app);
}
