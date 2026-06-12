import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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

  const isAdmin = ADMIN_EMAILS.includes(user?.email ?? "");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Check if admin
        if (ADMIN_EMAILS.includes(firebaseUser.email ?? "")) {
          setRole("admin");
          setCompanyProfile(null);
        } else {
          // Check Firestore for user role
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setRole(data.role ?? "user");

            // If company, fetch company profile
            if (data.role === "company") {
              const companyDoc = await getDoc(doc(db, "companies", firebaseUser.uid));
              if (companyDoc.exists()) {
                setCompanyProfile(companyDoc.data() as CompanyProfile);
              }
            }
          } else {
            setRole("user");
          }
        }
      } else {
        setRole(null);
        setCompanyProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function register(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  async function logout() {
    await signOut(auth);
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
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
