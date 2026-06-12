import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "firebase/auth";

// ─── Admin email(s) — hardcoded, only these can access /admin ───
const ADMIN_EMAILS = ["shobhitgupta19052005@gmail.com"];

export type UserRole = "admin" | "company" | "pharmacy" | "user";

interface CompanyProfile {
  companyName: string;
  verified: boolean;
  registeredAt: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  isAdmin: boolean;
  companyProfile: CompanyProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const isAdmin = ADMIN_EMAILS.includes(user?.email ?? "");

  // Only run Firebase logic on client
  useEffect(() => {
    setIsClient(true);

    // Dynamic import to prevent SSR from pulling in Firebase
    let unsub: (() => void) | undefined;

    async function initAuth() {
      const { onAuthStateChanged } = await import("firebase/auth");
      const { getFirebaseAuth } = await import("@/lib/firebase");
      const { doc, getDoc } = await import("firebase/firestore");
      const { getFirebaseDb } = await import("@/lib/firebase");

      const auth = getFirebaseAuth();
      const db = getFirebaseDb();

      unsub = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
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
          setRole(null);
          setCompanyProfile(null);
        }
        setLoading(false);
      });
    }

    initAuth();

    return () => {
      if (unsub) unsub();
    };
  }, []);

  async function login(email: string, password: string) {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    const { getFirebaseAuth } = await import("@/lib/firebase");
    await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  }

  async function register(email: string, password: string) {
    const { createUserWithEmailAndPassword } = await import("firebase/auth");
    const { getFirebaseAuth } = await import("@/lib/firebase");
    const cred = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
    return cred.user;
  }

  async function logout() {
    const { signOut } = await import("firebase/auth");
    const { getFirebaseAuth } = await import("@/lib/firebase");
    await signOut(getFirebaseAuth());
    setRole(null);
    setCompanyProfile(null);
  }

  // On server: render children immediately with loading state (no Firebase)
  if (!isClient) {
    return (
      <AuthContext.Provider value={{ user: null, role: null, loading: true, isAdmin: false, companyProfile: null, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, isAdmin, companyProfile, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
