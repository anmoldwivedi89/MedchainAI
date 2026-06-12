import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, ArrowRight, Mail, Lock, Eye, EyeOff, CheckCircle2,
  Loader2, Sparkles, Activity, Building2, Pill, ShieldAlert,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — MedChain AI" }] }),
  component: Login,
});

const ROLES = [
  { id: "user", label: "User", icon: Pill },
  { id: "company", label: "Company", icon: Building2 },
  { id: "pharmacy", label: "Pharmacy", icon: ShieldCheck },
  { id: "admin", label: "Admin", icon: ShieldAlert },
] as const;

function Login() {
  const [role, setRole] = useState<(typeof ROLES)[number]["id"]>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwStrength = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s; // 0..4
  }, [password]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailValid || password.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => { window.location.href = "/dashboard"; }, 700);
    }, 1100);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background overflow-hidden">
      {/* LEFT — animated hero */}
      <LeftHero />

      {/* RIGHT — glass card */}
      <div className="relative flex items-center justify-center p-6 lg:p-12">
        <div className="absolute inset-0 aurora opacity-30 lg:hidden" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md rounded-3xl glass-strong p-8 sm:p-10 shadow-elev-3"
        >
          <div className="lg:hidden mb-6 flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl gradient-primary grid place-items-center">
              <ShieldCheck className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold">MedChain AI</span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground mt-1.5">Welcome back. Choose your role to continue.</p>

          {/* Role pill tabs */}
          <RoleTabs role={role} setRole={setRole} />

          {/* Google */}
          <button
            type="button"
            onClick={() => { window.location.href = "/dashboard"; }}
            className="mt-6 w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card/60 hover:bg-card hover:border-primary/40 transition-all text-sm font-medium ring-focus"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <PremiumField
              icon={Mail}
              type="email"
              label="Email"
              placeholder="you@hospital.org"
              value={email}
              onChange={(v) => setEmail(v)}
              valid={email.length > 0 ? emailValid : null}
            />
            <div>
              <PremiumField
                icon={Lock}
                type={showPw ? "text" : "password"}
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(v) => setPassword(v)}
                trailing={
                  <button type="button" onClick={() => setShowPw((v) => !v)} className="text-muted-foreground hover:text-foreground">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
              {password.length > 0 && <PasswordStrength score={pwStrength} />}
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="inline-flex items-center gap-2 text-muted-foreground cursor-pointer">
                <input type="checkbox" className="h-3.5 w-3.5 rounded border-border bg-card" />
                Remember me
              </label>
              <Link to="/login" className="text-primary hover:underline">Forgot password?</Link>
            </div>

            <motion.button
              type="submit"
              disabled={loading || success}
              whileTap={{ scale: 0.98 }}
              className="btn-premium w-full !py-3.5 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.span key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Signed in
                  </motion.span>
                ) : loading ? (
                  <motion.span key="ld" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Authenticating…
                  </motion.span>
                ) : (
                  <motion.span key="go" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                    Sign in as {role} <ArrowRight className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <p className="text-xs text-muted-foreground text-center pt-1">
              No account? <Link to="/register" className="text-primary hover:underline">Create one</Link>
            </p>
          </form>

          {/* Security badges */}
          <div className="mt-7 pt-6 border-t border-border grid grid-cols-2 gap-2 text-[10px]">
            {[
              "HIPAA Compliant",
              "Blockchain Secured",
              "End-to-End Encrypted",
              "GDPR Ready",
            ].map((b) => (
              <div key={b} className="inline-flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-emerald" /> {b}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Left hero ---------- */
function LeftHero() {
  return (
    <div className="hidden lg:flex relative items-center justify-center p-12 border-r border-border overflow-hidden">
      <div className="absolute inset-0 aurora opacity-90" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 noise opacity-[0.04]" />
      <NetworkAnim />

      <div className="relative max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-elev-2">
            <ShieldCheck className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold">MedChain AI</span>
        </Link>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05]"
        >
          The trust layer for <span className="gradient-text">global medicine</span>.
        </motion.h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Verify medicines, monitor counterfeit fraud, and access blockchain-anchored audit trails — from one secure console.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-3">
          <LiveStat icon={Activity} label="Verified today" target={48213} />
          <LiveStat icon={ShieldAlert} label="Alerts prevented" target={1284} />
          <LiveStat icon={Building2} label="Trusted pharmacies" target={9742} />
        </div>

        <div className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground rounded-full px-3 py-1.5 glass">
          <Sparkles className="h-3 w-3 text-primary" /> Powered by Gemini Vision · Anchored on-chain
        </div>
      </div>
    </div>
  );
}

function NetworkAnim() {
  // floating blockchain-style nodes
  const nodes = useMemo(
    () => Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      d: 6 + Math.random() * 8,
      delay: Math.random() * 4,
    })),
    [],
  );
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > 28) return null;
          return (
            <line
              key={`${a.id}-${b.id}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="url(#g)" strokeWidth="0.15" opacity={0.35}
            />
          );
        }),
      )}
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00E5FF" />
          <stop offset="1" stopColor="#00FFC2" />
        </linearGradient>
      </defs>
      {nodes.map((n) => (
        <motion.circle
          key={n.id}
          cx={n.x} cy={n.y} r={0.7}
          fill="#00E5FF"
          animate={{ opacity: [0.4, 1, 0.4], r: [0.6, 1.2, 0.6] }}
          transition={{ duration: 3 + (n.d % 3), repeat: Infinity, delay: n.delay }}
        />
      ))}
    </svg>
  );
}

function LiveStat({ icon: Icon, label, target }: { icon: any; label: string; target: number }) {
  const mv = useMotionValue(0);
  const out = useTransform(mv, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    const c = animate(mv, target, { duration: 2.4, ease: [0.16, 1, 0.3, 1] });
    return c.stop;
  }, [mv, target]);
  return (
    <div className="rounded-xl glass p-3">
      <Icon className="h-3.5 w-3.5 text-primary mb-1.5" />
      <motion.div className="text-lg font-display font-bold tabular-nums">{out}</motion.div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

/* ---------- Role tabs ---------- */
function RoleTabs({ role, setRole }: { role: string; setRole: (r: any) => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = useState<{ x: number; w: number } | null>(null);
  useEffect(() => {
    const el = ref.current?.querySelector(`[data-role="${role}"]`) as HTMLElement | null;
    if (el && ref.current) {
      const p = ref.current.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setRect({ x: r.left - p.left, w: r.width });
    }
  }, [role]);
  return (
    <div ref={ref} className="relative grid grid-cols-4 gap-1 mt-6 rounded-xl border border-border p-1 bg-card/60">
      {rect && (
        <motion.div
          layout
          initial={false}
          animate={{ x: rect.x, width: rect.w }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="absolute top-1 bottom-1 rounded-lg gradient-primary opacity-90"
          style={{ left: 0 }}
        />
      )}
      {ROLES.map((r) => {
        const I = r.icon;
        const active = role === r.id;
        return (
          <button
            key={r.id}
            data-role={r.id}
            onClick={() => setRole(r.id)}
            className={`relative z-10 py-2 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors ${
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <I className="h-3.5 w-3.5" /> {r.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Premium field ---------- */
function PremiumField({
  icon: Icon, label, type, placeholder, value, onChange, valid, trailing,
}: {
  icon: any; label: string; type: string; placeholder?: string;
  value: string; onChange: (v: string) => void;
  valid?: boolean | null; trailing?: React.ReactNode;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div
        className={`mt-1.5 flex items-center gap-2 rounded-xl border bg-card/60 px-3 py-2.5 transition-all ${
          focus
            ? "border-primary/60 shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan)_14%,transparent)]"
            : "border-border"
        }`}
      >
        <Icon className={`h-4 w-4 ${focus ? "text-primary" : "text-muted-foreground"}`} />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/60"
        />
        {valid === true && <CheckCircle2 className="h-4 w-4 text-emerald" />}
        {trailing}
      </div>
    </label>
  );
}

function PasswordStrength({ score }: { score: number }) {
  const labels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];
  const colors = ["bg-destructive", "bg-warn", "bg-warn", "bg-emerald", "bg-emerald"];
  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex-1 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i < score ? colors[score] : "bg-border"}`} />
        ))}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{labels[score]}</span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.2-11.5-11.5S17.6 12.5 24 12.5c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.8 0 19.5-8.7 19.5-19.5 0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 16.3 4.5 9.7 8.8 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 43.5c5.1 0 9.8-1.9 13.3-5.1l-6.2-5c-2 1.4-4.4 2.1-7.1 2.1-5.3 0-9.7-3.1-11.3-7.5L6.2 33C9.6 39 16.2 43.5 24 43.5z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.3l6.2 5C41.5 35 43.5 30 43.5 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}
