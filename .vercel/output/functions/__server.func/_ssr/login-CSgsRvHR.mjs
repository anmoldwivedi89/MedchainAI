import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion, A as AnimatePresence, u as useMotionValue, a as useTransform, b as animate } from "../_libs/framer-motion.mjs";
import { p as ShieldCheck, s as Mail, L as Lock, t as EyeOff, u as Eye, d as CircleCheck, i as LoaderCircle, A as ArrowRight, v as Activity, w as ShieldAlert, x as Building2, b as Sparkles, P as Pill } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const ROLES = [{
  id: "user",
  label: "User",
  icon: Pill
}, {
  id: "company",
  label: "Company",
  icon: Building2
}, {
  id: "pharmacy",
  label: "Pharmacy",
  icon: ShieldCheck
}, {
  id: "admin",
  label: "Admin",
  icon: ShieldAlert
}];
function Login() {
  const [role, setRole] = reactExports.useState("user");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwStrength = reactExports.useMemo(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  }, [password]);
  function onSubmit(e) {
    e.preventDefault();
    if (!emailValid || password.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 700);
    }, 1100);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen grid lg:grid-cols-2 bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LeftHero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center p-6 lg:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 aurora opacity-30 lg:hidden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }, className: "relative w-full max-w-md rounded-3xl glass-strong p-8 sm:p-10 shadow-elev-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl gradient-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold", children: "MedChain AI" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Sign in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: "Welcome back. Choose your role to continue." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RoleTabs, { role, setRole }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
          window.location.href = "/dashboard";
        }, className: "mt-6 w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card/60 hover:bg-card hover:border-primary/40 transition-all text-sm font-medium ring-focus", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, {}),
          " Continue with Google"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
          " or ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumField, { icon: Mail, type: "email", label: "Email", placeholder: "you@hospital.org", value: email, onChange: (v) => setEmail(v), valid: email.length > 0 ? emailValid : null }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumField, { icon: Lock, type: showPw ? "text" : "password", label: "Password", placeholder: "••••••••", value: password, onChange: (v) => setPassword(v), trailing: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw((v) => !v), className: "text-muted-foreground hover:text-foreground", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }) }),
            password.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordStrength, { score: pwStrength })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 text-muted-foreground cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-3.5 w-3.5 rounded border-border bg-card" }),
              "Remember me"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-primary hover:underline", children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.button, { type: "submit", disabled: loading || success, whileTap: {
            scale: 0.98
          }, className: "btn-premium w-full !py-3.5 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: success ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
            opacity: 0,
            y: 6
          }, animate: {
            opacity: 1,
            y: 0
          }, exit: {
            opacity: 0
          }, className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
            " Signed in"
          ] }, "ok") : loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
            opacity: 0
          }, animate: {
            opacity: 1
          }, exit: {
            opacity: 0
          }, className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            " Authenticating…"
          ] }, "ld") : /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: {
            opacity: 0
          }, animate: {
            opacity: 1
          }, exit: {
            opacity: 0
          }, className: "inline-flex items-center gap-2", children: [
            "Sign in as ",
            role,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }, "go") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center pt-1", children: [
            "No account? ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "text-primary hover:underline", children: "Create one" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 pt-6 border-t border-border grid grid-cols-2 gap-2 text-[10px]", children: ["HIPAA Compliant", "Blockchain Secured", "End-to-End Encrypted", "GDPR Ready"].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 text-emerald" }),
          " ",
          b
        ] }, b)) })
      ] })
    ] })
  ] });
}
function LeftHero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex relative items-center justify-center p-12 border-r border-border overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 aurora opacity-90" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 noise opacity-[0.04]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NetworkAnim, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-elev-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold", children: "MedChain AI" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h2, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.7
      }, className: "font-display text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05]", children: [
        "The trust layer for ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "global medicine" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: "Verify medicines, monitor counterfeit fraud, and access blockchain-anchored audit trails — from one secure console." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LiveStat, { icon: Activity, label: "Verified today", target: 48213 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LiveStat, { icon: ShieldAlert, label: "Alerts prevented", target: 1284 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LiveStat, { icon: Building2, label: "Trusted pharmacies", target: 9742 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground rounded-full px-3 py-1.5 glass", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-primary" }),
        " Powered by Gemini Vision · Anchored on-chain"
      ] })
    ] })
  ] });
}
function NetworkAnim() {
  const nodes = reactExports.useMemo(() => Array.from({
    length: 14
  }).map((_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    d: 6 + Math.random() * 8,
    delay: Math.random() * 4
  })), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full pointer-events-none", viewBox: "0 0 100 100", preserveAspectRatio: "none", children: [
    nodes.map((a, i) => nodes.slice(i + 1).map((b) => {
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist > 28) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke: "url(#g)", strokeWidth: "0.15", opacity: 0.35 }, `${a.id}-${b.id}`);
    })),
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g", x1: "0", y1: "0", x2: "1", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "#00E5FF" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#00FFC2" })
    ] }) }),
    nodes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.circle, { cx: n.x, cy: n.y, r: 0.7, fill: "#00E5FF", animate: {
      opacity: [0.4, 1, 0.4],
      r: [0.6, 1.2, 0.6]
    }, transition: {
      duration: 3 + n.d % 3,
      repeat: Infinity,
      delay: n.delay
    } }, n.id))
  ] });
}
function LiveStat({
  icon: Icon,
  label,
  target
}) {
  const mv = useMotionValue(0);
  const out = useTransform(mv, (v) => Math.round(v).toLocaleString());
  reactExports.useEffect(() => {
    const c = animate(mv, target, {
      duration: 2.4,
      ease: [0.16, 1, 0.3, 1]
    });
    return c.stop;
  }, [mv, target]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl glass p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-primary mb-1.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "text-lg font-display font-bold tabular-nums", children: out }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5", children: label })
  ] });
}
function RoleTabs({
  role,
  setRole
}) {
  const ref = reactExports.useRef(null);
  const [rect, setRect] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const el = ref.current?.querySelector(`[data-role="${role}"]`);
    if (el && ref.current) {
      const p = ref.current.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setRect({
        x: r.left - p.left,
        w: r.width
      });
    }
  }, [role]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative grid grid-cols-4 gap-1 mt-6 rounded-xl border border-border p-1 bg-card/60", children: [
    rect && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layout: true, initial: false, animate: {
      x: rect.x,
      width: rect.w
    }, transition: {
      type: "spring",
      stiffness: 380,
      damping: 32
    }, className: "absolute top-1 bottom-1 rounded-lg gradient-primary opacity-90", style: {
      left: 0
    } }),
    ROLES.map((r) => {
      const I = r.icon;
      const active = role === r.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { "data-role": r.id, onClick: () => setRole(r.id), className: `relative z-10 py-2 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors ${active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(I, { className: "h-3.5 w-3.5" }),
        " ",
        r.label
      ] }, r.id);
    })
  ] });
}
function PremiumField({
  icon: Icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  valid,
  trailing
}) {
  const [focus, setFocus] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-1.5 flex items-center gap-2 rounded-xl border bg-card/60 px-3 py-2.5 transition-all ${focus ? "border-primary/60 shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan)_14%,transparent)]" : "border-border"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${focus ? "text-primary" : "text-muted-foreground"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, placeholder, value, onChange: (e) => onChange(e.target.value), onFocus: () => setFocus(true), onBlur: () => setFocus(false), className: "flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/60" }),
      valid === true && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald" }),
      trailing
    ] })
  ] });
}
function PasswordStrength({
  score
}) {
  const labels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];
  const colors = ["bg-destructive", "bg-warn", "bg-warn", "bg-emerald", "bg-emerald"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex gap-1", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 flex-1 rounded-full ${i < score ? colors[score] : "bg-border"}` }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: labels[score] })
  ] });
}
function GoogleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-4 w-4", viewBox: "0 0 48 48", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FFC107", d: "M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.2-11.5-11.5S17.6 12.5 24 12.5c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.8 0 19.5-8.7 19.5-19.5 0-1.2-.1-2.3-.4-3.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FF3D00", d: "M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 16.3 4.5 9.7 8.8 6.3 14.7z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4CAF50", d: "M24 43.5c5.1 0 9.8-1.9 13.3-5.1l-6.2-5c-2 1.4-4.4 2.1-7.1 2.1-5.3 0-9.7-3.1-11.3-7.5L6.2 33C9.6 39 16.2 43.5 24 43.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#1976D2", d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.3l6.2 5C41.5 35 43.5 30 43.5 24c0-1.2-.1-2.3-.4-3.5z" })
  ] });
}
export {
  Login as component
};
