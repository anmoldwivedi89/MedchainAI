import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ─── Admin email(s) — hardcoded, only these can access /admin ───
const ADMIN_EMAILS = ["shobhitgupta19052005@gmail.com"];

export type UserRole = "admin" | "company" | "pharmacy" | "user";

interface CompanyProfile {
  companyName: string;
  verified: boolean;
  registeredAt: string;
}

interface AuthContextType {
  user: { uid: string; email: string | null } | null;
  role: UserRole | null;
  loading: boolean;
  isAdmin: boolean;
  companyProfile: CompanyProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<{ uid: string; email: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  isAdmin: false,
  companyProfile: null,
  login: async () => {},
  register: async () => ({ uid: "", email: null }),
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ uid: string; email: string | null } | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = ADMIN_EMAILS.includes(user?.email ?? "");

  useEffect(() => {
    // Skip on server
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    let unsub: (() => void) | undefined;
    let mounted = true;

    (async () => {
      try {
        const { initializeApp, getApps } = await import("firebase/app");
        const { getAuth, onAuthStateChanged } = await import("firebase/auth");
        const { getFirestore, doc, getDoc } = await import("firebase/firestore");

        const firebaseConfig = {
          apiKey: "AIzaSyBWRYCcldUcjekGUyUAcqRikPZkvcfaGhA",
          authDomain: "medchain-f3170.firebaseapp.com",
          projectId: "medchain-f3170",
          storageBucket: "medchain-f3170.firebasestorage.app",
          messagingSenderId: "20546639083",
          appId: "1:20546639083:web:02210ca1e5b4cde4b71aae",
          measurementId: "G-PEZWTFB7C1",
        };

        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
        const auth = getAuth(app);
        const db = getFirestore(app);

        unsub = onAuthStateChanged(auth, async (firebaseUser) => {
          if (!mounted) return;

          if (firebaseUser) {
            const u = { uid: firebaseUser.uid, email: firebaseUser.email };
            setUser(u);

            if (ADMIN_EMAILS.includes(firebaseUser.email ?? "")) {
              setRole("admin");
              setCompanyProfile(null);
            } else {
              try {
                const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                if (userDoc.exists()) {
                  const data = userDoc.data();
                  setRole(data.role ?? "user");

                  if (data.role === "company") {
                    const companyDoc = await getDoc(doc(db, "companies", firebaseUser.uid));
                    if (companyDoc.exists()) {
                      setCompanyProfile(companyDoc.data() as CompanyProfile);
                    }
                  }
                } else {
                  setRole("user");
                }
              } catch {
                setRole("user");
              }
            }
          } else {
            setUser(null);
            setRole(null);
            setCompanyProfile(null);
          }
          setLoading(false);
        });
      } catch (err) {
        console.error("Firebase init error:", err);
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      if (unsub) unsub();
    };
  }, []);

  async function login(email: string, password: string) {
    const { initializeApp, getApps } = await import("firebase/app");
    const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth");
    const firebaseConfig = {
      apiKey: "AIzaSyBWRYCcldUcjekGUyUAcqRikPZkvcfaGhA",
      authDomain: "medchain-f3170.firebaseapp.com",
      projectId: "medchain-f3170",
      storageBucket: "medchain-f3170.firebasestorage.app",
      messagingSenderId: "20546639083",
      appId: "1:20546639083:web:02210ca1e5b4cde4b71aae",
    };
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function register(email: string, password: string) {
    const { initializeApp, getApps } = await import("firebase/app");
    const { getAuth, createUserWithEmailAndPassword } = await import("firebase/auth");
    const firebaseConfig = {
      apiKey: "AIzaSyBWRYCcldUcjekGUyUAcqRikPZkvcfaGhA",
      authDomain: "medchain-f3170.firebaseapp.com",
      projectId: "medchain-f3170",
      storageBucket: "medchain-f3170.firebasestorage.app",
      messagingSenderId: "20546639083",
      appId: "1:20546639083:web:02210ca1e5b4cde4b71aae",
    };
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const auth = getAuth(app);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return { uid: cred.user.uid, email: cred.user.email };
  }

  async function logout() {
    const { initializeApp, getApps } = await import("firebase/app");
    const { getAuth, signOut } = await import("firebase/auth");
    const firebaseConfig = {
      apiKey: "AIzaSyBWRYCcldUcjekGUyUAcqRikPZkvcfaGhA",
      authDomain: "medchain-f3170.firebaseapp.com",
      projectId: "medchain-f3170",
      storageBucket: "medchain-f3170.firebasestorage.app",
      messagingSenderId: "20546639083",
      appId: "1:20546639083:web:02210ca1e5b4cde4b71aae",
    };
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const auth = getAuth(app);
    await signOut(auth);
    setUser(null);
    setRole(null);
    setCompanyProfile(null);
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, isAdmin, companyProfile, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
