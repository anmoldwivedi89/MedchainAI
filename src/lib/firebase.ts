// Firebase loaded via CDN — zero server-side dependencies
// This file is SSR-safe because everything is behind typeof window checks

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBWRYCcldUcjekGUyUAcqRikPZkvcfaGhA",
  authDomain: "medchain-f3170.firebaseapp.com",
  projectId: "medchain-f3170",
  storageBucket: "medchain-f3170.firebasestorage.app",
  messagingSenderId: "20546639083",
  appId: "1:20546639083:web:02210ca1e5b4cde4b71aae",
  measurementId: "G-PEZWTFB7C1",
};

// CDN URLs for Firebase compat SDK
const CDN_BASE = "https://www.gstatic.com/firebasejs/10.14.1";
const SCRIPTS = [
  `${CDN_BASE}/firebase-app-compat.js`,
  `${CDN_BASE}/firebase-auth-compat.js`,
  `${CDN_BASE}/firebase-firestore-compat.js`,
];

let _loadPromise: Promise<void> | null = null;
let _initialized = false;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

export function loadFirebase(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (_initialized) return Promise.resolve();
  if (_loadPromise) return _loadPromise;

  _loadPromise = (async () => {
    for (const src of SCRIPTS) {
      await loadScript(src);
    }
    const firebase = (window as any).firebase;
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    _initialized = true;
  })();

  return _loadPromise;
}

// Helper getters — call only after loadFirebase() resolves
export function getAuth(): any {
  return (window as any).firebase.auth();
}

export function getDb(): any {
  return (window as any).firebase.firestore();
}
