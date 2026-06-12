import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loadFirebase, getAuth, getDb } from "@/lib/firebase";

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
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;
    let mounted = true;

    (async () => {
      try {
        await loadFirebase();
        const auth = getAuth();
        const db = getDb();

        unsubscribe = auth.onAuthStateChanged(async (firebaseUser: any) => {
          if (!mounted) return;

          if (firebaseUser) {
            const u = { uid: firebaseUser.uid, email: firebaseUser.email };
            setUser(u);

            if (ADMIN_EMAILS.includes(firebaseUser.email ?? "")) {
              setRole("admin");
              setCompanyProfile(null);
            } else {
              try {
                const userDoc = await db.collection("users").doc(firebaseUser.uid).get();
                if (userDoc.exists) {
                  const data = userDoc.data();
                  setRole(data.role ?? "user");

                  if (data.role === "company") {
                    const companyDoc = await db.collection("companies").doc(firebaseUser.uid).get();
                    if (companyDoc.exists) {
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
      if (unsubscribe) unsubscribe();
    };
  }, []);

  async function login(email: string, password: string) {
    await loadFirebase();
    await getAuth().signInWithEmailAndPassword(email, password);
  }

  async function register(email: string, password: string) {
    await loadFirebase();
    const cred = await getAuth().createUserWithEmailAndPassword(email, password);
    return { uid: cred.user.uid, email: cred.user.email };
  }

  async function logout() {
    await loadFirebase();
    await getAuth().signOut();
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
