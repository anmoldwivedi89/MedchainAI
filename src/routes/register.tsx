import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight, Loader2, Building2, Pill, Store } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — MedChain AI" }] }),
  component: Register,
});

const ROLES = [
  { id: "user", label: "User", icon: Pill },
  { id: "company", label: "Company", icon: Building2 },
  { id: "pharmacy", label: "Pharmacy", icon: Store },
] as const;

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "company" | "pharmacy">("user");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !name) return;
    if (role === "company" && !companyName) return;

    setLoading(true);
    setError("");

    try {
      const user = await register(email, password);

      // Save user doc in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      // If company, create company profile (unverified)
      if (role === "company") {
        await setDoc(doc(db, "companies", user.uid), {
          companyName,
          email,
          verified: false,
          rejected: false,
          registeredAt: new Date().toISOString(),
          ownerId: user.uid,
        });
      }

      // Redirect based on role
      if (role === "company") {
        navigate({ to: "/company" });
      } else {
        navigate({ to: "/dashboard" });
      }
    } catch (err: any) {
      setError(
        err.message?.includes("email-already-in-use")
          ? "This email is already registered"
          : err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative">
      <div className="absolute inset-0 aurora opacity-70" />
      <div className="relative w-full max-w-md rounded-2xl glass-strong p-8">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg gradient-primary grid place-items-center">
            <ShieldCheck className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">MedChain AI</span>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground mt-1">Get started in seconds.</p>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4 mt-6">
          <F label="Full Name" placeholder="Dr. Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)} required />
          <F label="Email" type="email" placeholder="you@hospital.org" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <F label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {/* Role selection */}
          <div>
            <span className="text-xs text-muted-foreground">Register as</span>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {ROLES.map((r) => {
                const I = r.icon;
                const active = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`py-2.5 rounded-lg border text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-all ${
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-sidebar-accent text-muted-foreground"
                    }`}
                  >
                    <I className="h-3.5 w-3.5" /> {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Company name — only if company role */}
          {role === "company" && (
            <F
              label="Company Name"
              placeholder="Helix Pharma Pvt Ltd"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg gradient-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Creating account...
              </>
            ) : (
              <>
                Create account <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            Already have one?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function F({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input {...p} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-card border border-border focus:border-primary outline-none text-sm" />
    </label>
  );
}
