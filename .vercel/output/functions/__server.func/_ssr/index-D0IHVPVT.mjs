import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion, A as AnimatePresence, c as useInView, u as useMotionValue, a as useTransform, b as animate } from "../_libs/framer-motion.mjs";
import { p as ShieldCheck, A as ArrowRight, S as ScanLine, W as Check, B as Brain, l as MapPin, c as BadgeCheck, v as Activity, Y as Zap, h as Cpu, L as Lock, g as ChevronDown } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, X as XAxis, T as Tooltip, a as Area, P as PieChart, b as Pie, c as Cell } from "../_libs/recharts.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AmbientBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LogosStrip, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Problem, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorks, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustStack, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Pipeline, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Audit, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChartsRow, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Pharmacies, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BigStats, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQ, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTABanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
const Eyebrow = ({
  children
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono uppercase tracking-[0.2em]", children });
function CountUp({
  to,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  format = true
}) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px"
  });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => {
    const n = Number(latest.toFixed(decimals));
    return `${prefix}${format ? n.toLocaleString() : n.toFixed(decimals)}${suffix}`;
  });
  reactExports.useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1]
    });
    return controls.stop;
  }, [inView, to, duration, mv]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { children: rounded }) });
}
function Reveal({
  children,
  delay = 0,
  y = 22,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className, initial: {
    opacity: 0,
    y
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-80px"
  }, transition: {
    duration: 0.65,
    delay,
    ease: [0.16, 1, 0.3, 1]
  }, children });
}
function AmbientBackground() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 z-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-[0.18]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full", style: {
      background: "radial-gradient(closest-side, color-mix(in oklab, var(--cyan) 35%, transparent), transparent)"
    }, animate: {
      x: [0, 60, -20, 0],
      y: [0, 30, -10, 0]
    }, transition: {
      duration: 22,
      repeat: Infinity,
      ease: "easeInOut"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute top-1/3 -right-40 h-[460px] w-[460px] rounded-full", style: {
      background: "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 30%, transparent), transparent)"
    }, animate: {
      x: [0, -50, 20, 0],
      y: [0, -40, 20, 0]
    }, transition: {
      duration: 26,
      repeat: Infinity,
      ease: "easeInOut"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full", style: {
      background: "radial-gradient(closest-side, color-mix(in oklab, #8b5cf6 25%, transparent), transparent)"
    }, animate: {
      x: [0, 40, -30, 0],
      y: [0, -20, 30, 0]
    }, transition: {
      duration: 28,
      repeat: Infinity,
      ease: "easeInOut"
    } })
  ] });
}
function Nav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 h-16 flex items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg gradient-primary grid place-items-center glow-cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tracking-tight", children: "MedChain AI" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-7 text-sm text-muted-foreground ml-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how", className: "hover:text-foreground transition-colors", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "hover:text-foreground transition-colors", children: "Platform" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#blockchain", className: "hover:text-foreground transition-colors", children: "Blockchain" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#faq", className: "hover:text-foreground transition-colors", children: "FAQ" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-sm text-muted-foreground hover:text-foreground px-3 py-2", children: "Sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/verify", className: "text-sm font-medium px-4 py-2 rounded-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity inline-flex items-center gap-2", children: [
        "Verify Medicine ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
      ] })
    ] })
  ] }) });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 aurora opacity-90" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-7xl mx-auto px-6 pt-20 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5
        }, className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Eyebrow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-1.5 w-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" })
          ] }),
          "v2.4 Enterprise Live"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.05
        }, className: "text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.05]", children: [
          "Building ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Trust" }),
          " in",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Every Medicine"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.15
        }, className: "mt-6 text-lg text-muted-foreground max-w-xl", children: "AI-powered medicine verification, counterfeit detection, pharmacy intelligence, and blockchain-backed trust records — in a single enterprise platform." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.25
        }, className: "mt-9 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/verify", className: "group relative inline-flex items-center gap-2 px-5 py-3 rounded-xl gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-cyan overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-4 w-4" }),
            " Verify Now"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-strong font-medium hover:bg-card transition-colors", children: [
            "Explore Platform ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-emerald" }),
            " HIPAA Compliant"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-emerald" }),
            " Blockchain Verified"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-emerald" }),
            " Gemini AI"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.7,
        delay: 0.35
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveTerminal, {}) })
    ] }) })
  ] });
}
const MEDICINES = [{
  name: "Paracetamol 500mg",
  lot: "PCM-782-901-AX",
  auth: 98,
  risk: "Low"
}, {
  name: "Amoxicillin 250mg",
  lot: "AMX-441-220-KQ",
  auth: 96,
  risk: "Low"
}, {
  name: "Dolo 650",
  lot: "DLO-118-993-RT",
  auth: 99,
  risk: "Low"
}, {
  name: "Azithromycin 500mg",
  lot: "AZM-552-018-PB",
  auth: 94,
  risk: "Low"
}, {
  name: "Metformin 850mg",
  lot: "MET-309-771-HQ",
  auth: 91,
  risk: "Medium"
}, {
  name: "Crocin Advance",
  lot: "CRA-660-122-XV",
  auth: 97,
  risk: "Low"
}, {
  name: "Insulin Glargine",
  lot: "INS-204-885-JM",
  auth: 95,
  risk: "Low"
}];
const STEPS = [{
  k: "Scanning",
  icon: ScanLine
}, {
  k: "OCR Reading",
  icon: Cpu
}, {
  k: "AI Analysis",
  icon: Brain
}, {
  k: "Blockchain Verification",
  icon: Lock
}, {
  k: "Result Generated",
  icon: BadgeCheck
}];
function LiveTerminal() {
  const [idx, setIdx] = reactExports.useState(0);
  const [step, setStep] = reactExports.useState(0);
  const med = MEDICINES[idx];
  reactExports.useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => {
        if (s < STEPS.length - 1) return s + 1;
        return s;
      });
    }, 750);
    return () => clearInterval(t);
  }, [idx]);
  reactExports.useEffect(() => {
    const t = setInterval(() => {
      setStep(0);
      setIdx((i) => (i + 1) % MEDICINES.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);
  const done = step >= STEPS.length - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-strong p-3 shadow-2xl relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-px rounded-2xl pointer-events-none", style: {
      background: "linear-gradient(135deg, color-mix(in oklab, var(--cyan) 40%, transparent), transparent 60%)",
      mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
      WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
      padding: 1
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card/85 border border-border overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-9 border-b border-border flex items-center px-4 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-destructive/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-warn/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-emerald/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-4 text-[10px] font-mono text-muted-foreground tracking-widest uppercase", children: "verification terminal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5 text-[10px] font-mono text-emerald", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-1.5 w-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75 animate-ping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald" })
          ] }),
          "LIVE"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-9 bottom-0 overflow-hidden pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute left-0 right-0 h-24", style: {
        background: "linear-gradient(180deg, transparent, color-mix(in oklab, var(--cyan) 30%, transparent), transparent)"
      }, initial: {
        y: "-30%"
      }, animate: {
        y: "120%"
      }, transition: {
        duration: 2.4,
        ease: "linear",
        repeat: Infinity
      } }, `scan-${idx}`) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 8
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -8
        }, transition: {
          duration: 0.4
        }, className: "rounded-xl bg-primary/10 border border-primary/20 p-5 flex items-center gap-4 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute inset-0 opacity-30", style: {
            background: "radial-gradient(600px circle at 0% 0%, color-mix(in oklab, var(--cyan) 50%, transparent), transparent 40%)"
          }, animate: {
            opacity: [0.2, 0.45, 0.2]
          }, transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-lg bg-background/60 grid place-items-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-6 w-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-mono text-primary uppercase tracking-widest flex items-center gap-1", children: [
              STEPS[step].k,
              /* @__PURE__ */ jsxRuntimeExports.jsx(TypingDots, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-semibold", children: med.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground font-mono", children: [
              "Lot ",
              med.lot
            ] })
          ] })
        ] }, med.name) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1.5", children: STEPS.map((s, i) => {
          const active = i <= step;
          const Icon = s.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
              backgroundColor: active ? "color-mix(in oklab, var(--cyan) 18%, transparent)" : "transparent",
              borderColor: active ? "color-mix(in oklab, var(--cyan) 60%, transparent)" : "var(--border)"
            }, className: "h-8 w-8 rounded-md border grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-3.5 w-3.5 ${active ? "text-primary" : "text-muted-foreground"}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 w-full rounded-full bg-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "h-full bg-primary", initial: {
              width: 0
            }, animate: {
              width: active ? "100%" : "0%"
            }, transition: {
              duration: 0.5
            } }) })
          ] }, s.k);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Authenticity", value: done ? `${med.auth}%` : "—", pulse: done, highlight: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Status", value: done ? "Verified ✓" : "Pending", color: done ? "text-emerald" : "text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Risk", value: done ? med.risk : "—", color: done ? med.risk === "Low" ? "text-emerald" : "text-warn" : "" })
        ] })
      ] })
    ] })
  ] });
}
function TypingDots() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex gap-0.5 ml-1", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { className: "inline-block h-1 w-1 rounded-full bg-primary", animate: {
    opacity: [0.2, 1, 0.2]
  }, transition: {
    duration: 1,
    repeat: Infinity,
    delay: i * 0.18
  } }, i)) });
}
function Metric({
  label,
  value,
  color = "",
  pulse = false,
  highlight = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg border p-3 bg-background/40 relative overflow-hidden ${highlight ? "border-primary/30" : "border-border"}`, children: [
    pulse && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute inset-0 rounded-lg", style: {
      boxShadow: "inset 0 0 24px color-mix(in oklab, var(--cyan) 35%, transparent)"
    }, animate: {
      opacity: [0.4, 0.9, 0.4]
    }, transition: {
      duration: 2,
      repeat: Infinity
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground relative", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 6
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0,
      y: -6
    }, transition: {
      duration: 0.3
    }, className: `text-lg font-semibold mt-1 relative ${color}`, children: value }, String(value)) })
  ] });
}
function LogosStrip() {
  const items = ["WHO Guidelines", "FDA Standards", "ISO 27001", "HIPAA Ready", "GDPR Compliant", "Polygon Verified"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border/60 bg-card/30 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase mb-5", children: "Trusted by regulators, manufacturers & 12,000+ pharmacies" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs text-muted-foreground tracking-wide uppercase", children: items.map((i, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { initial: {
      opacity: 0,
      y: 6
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: k * 0.05
    }, children: i }, i)) })
  ] }) });
}
function Problem() {
  const pts = [{
    v: 200,
    prefix: "$",
    suffix: "B+",
    l: "Counterfeit drug market funding organized crime globally."
  }, {
    v: 1,
    suffix: "M+",
    l: "Preventable deaths per year caused by substandard medication."
  }, {
    v: 72,
    suffix: "%",
    l: "Of patients lack confidence in the medicine they receive."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 border-b border-border/60 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "The problem" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-semibold tracking-tight mt-4", children: "A trust crisis in global healthcare." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-md", children: "Patients have no reliable way to know whether the medicine in their hand is real. Regulators lack real-time intelligence. Pharmacies have no trust signal." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4", children: pts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.1,
      duration: 0.6
    }, whileHover: {
      y: -4
    }, className: "rounded-2xl glass p-6 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_var(--cyan)] transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { to: p.v, prefix: p.prefix || "", suffix: p.suffix || "", duration: 1.6 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-3 leading-relaxed", children: p.l })
    ] }, p.l)) })
  ] }) });
}
function HowItWorks() {
  const steps = [{
    i: ScanLine,
    t: "Scan or upload",
    d: "Snap a photo of the packaging or upload at the point of sale."
  }, {
    i: Brain,
    t: "AI verifies in 1.8s",
    d: "Computer vision + OCR match packaging against the manufacturer ledger."
  }, {
    i: ShieldCheck,
    t: "Trust score returned",
    d: "Authenticity score, batch compliance, and history details are instantly delivered."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "how", className: "py-24 border-b border-border/60 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "The solution" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-semibold tracking-tight mt-4", children: "Three steps from suspicion to certainty." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-4", children: steps.map((s, i) => {
      const Icon = s.i;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.12,
        duration: 0.6
      }, whileHover: {
        y: -6
      }, className: "rounded-2xl glass p-7 relative hover:border-primary/40 hover:shadow-[0_0_40px_-12px_var(--cyan)] transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-5 right-5 text-[10px] font-mono text-muted-foreground", children: [
          "0",
          i + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 rounded-xl bg-primary/15 grid place-items-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: s.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-2 leading-relaxed", children: s.d })
      ] }, s.t);
    }) })
  ] }) });
}
function TrustStack() {
  const feats = [{
    t: "Computer vision OCR",
    d: "Reads names, doses, and expiry in 24+ languages."
  }, {
    t: "Manufacturer ledger",
    d: "Direct from 350+ pharmaceutical companies."
  }, {
    t: "Real-time fraud graph",
    d: "Counterfeit reports aggregated across regions."
  }, {
    t: "Trusted pharmacy network",
    d: "12,847 verified dispensaries and counting."
  }, {
    t: "Blockchain audit trail",
    d: "Every verification anchored on Polygon for compliance."
  }, {
    t: "Enterprise SLAs",
    d: "99.99% uptime, edge-ready, observable end-to-end."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features", className: "py-24 border-b border-border/60 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Platform" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-semibold tracking-tight mt-4 max-w-2xl", children: "The trust stack the industry has been waiting for." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-4 mt-12", children: feats.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 18
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i % 3 * 0.1 + Math.floor(i / 3) * 0.05,
      duration: 0.5
    }, whileHover: {
      y: -5
    }, className: "rounded-2xl glass p-6 hover:border-primary/40 hover:shadow-[0_0_36px_-14px_var(--cyan)] transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-8 rounded-full gradient-primary mb-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: f.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-2 leading-relaxed", children: f.d })
    ] }, f.t)) })
  ] }) });
}
function Pipeline() {
  const stages = ["Medicine Image", "OCR Extraction", "Medicine Matching", "Packaging Analysis", "Fraud Intelligence", "AI Risk Analysis", "Blockchain Validation", "Authenticity Score"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 border-b border-border/60 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "The core engine" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-semibold tracking-tight mt-4 max-w-2xl", children: "Eight-stage pipeline. One score." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mt-12", children: stages.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 15
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.07,
      duration: 0.5
    }, whileHover: {
      y: -4
    }, className: `rounded-xl border p-5 bg-card/40 transition-all ${i === 7 ? "border-primary/50 bg-primary/5 shadow-[0_0_30px_-12px_var(--cyan)]" : "border-border hover:border-primary/40 hover:shadow-[0_0_24px_-12px_var(--cyan)]"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-[10px] font-mono uppercase tracking-widest mb-2 ${i === 7 ? "text-primary" : "text-muted-foreground"}`, children: [
        "Stage 0",
        i + 1
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: s })
    ] }, s)) })
  ] }) });
}
const LEDGER_TEMPLATES = ["Pfizer Batch Verification", "Insulin Glargine Validation", "WHO Compliance Check", "Manufacturer Approval", "Geo Verification — Mumbai", "Lipitor 20mg Distribution", "Metformin 850mg Batch", "Cipla OCR Match", "Polygon Anchor Receipt", "Apollo Pharmacy Audit"];
function makeRow() {
  const id = "#0x" + Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, "0");
  return {
    id,
    n: LEDGER_TEMPLATES[Math.floor(Math.random() * LEDGER_TEMPLATES.length)],
    t: "just now"
  };
}
function Audit() {
  const [rows, setRows] = reactExports.useState([{
    id: "#0xF8A1",
    n: "Pfizer Batch Verification",
    t: "2m ago"
  }, {
    id: "#0xA42C",
    n: "Insulin Glargine Validation",
    t: "14m ago"
  }, {
    id: "#0xBC09",
    n: "WHO Compliance Check",
    t: "1h ago"
  }, {
    id: "#0x9134",
    n: "Manufacturer Approval",
    t: "3h ago"
  }]);
  reactExports.useEffect(() => {
    const t = setInterval(() => {
      setRows((r) => [makeRow(), ...r.slice(0, 4)]);
    }, 3500);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "blockchain", className: "py-24 border-b border-border/60 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Accountability" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-semibold tracking-tight mt-4 leading-tight", children: [
        "Immutable audit trail.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Regulator-ready."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Every scan, every verification, and every report is anchored to a tamper-proof ledger. Export proofs for FDA, WHO, and EMA in one click." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-7 space-y-3 text-sm", children: ["Direct-source manufacturer batches", "Full availability history tracking", "Geo-fencing for regional permits"].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-5 rounded-full bg-emerald/15 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-emerald" }) }),
        l
      ] }, l)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-strong p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground uppercase tracking-widest", children: "Audit Ledger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-emerald px-2 py-0.5 rounded border border-emerald/30 bg-emerald/10 font-mono flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { className: "h-1.5 w-1.5 rounded-full bg-emerald", animate: {
            opacity: [0.4, 1, 0.4]
          }, transition: {
            duration: 1.4,
            repeat: Infinity
          } }),
          "LIVE"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, initial: {
        opacity: 0,
        x: -20,
        height: 0
      }, animate: {
        opacity: 1,
        x: 0,
        height: "auto"
      }, exit: {
        opacity: 0,
        x: 20,
        height: 0
      }, transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }, className: "flex items-center justify-between p-3 rounded-lg border border-border bg-background/40 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono text-muted-foreground", children: r.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm truncate", children: r.n })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-mono shrink-0", children: r.t })
      ] }, r.id)) }) })
    ] }) })
  ] }) });
}
const trendData = Array.from({
  length: 12
}).map((_, i) => ({
  x: `W${i + 1}`,
  v: 40 + Math.round(Math.sin(i / 2) * 18 + i * 4)
}));
const riskData = [{
  name: "Authentic",
  value: 84
}, {
  name: "In-Transit",
  value: 10
}, {
  name: "Flagged",
  value: 6
}];
const RISK_COLORS = ["var(--emerald)", "var(--cyan)", "var(--destructive)"];
function ChartsRow() {
  const [data, setData] = reactExports.useState(trendData);
  reactExports.useEffect(() => {
    const t = setInterval(() => {
      setData((d) => {
        const next = [...d.slice(1), {
          x: `W${parseInt(d[d.length - 1].x.slice(1)) + 1}`,
          v: 40 + Math.round(Math.random() * 50)
        }];
        return next;
      });
    }, 3e3);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 border-b border-border/60 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Live intelligence" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-semibold tracking-tight mt-4 max-w-2xl", children: "See counterfeits before they reach a patient." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4 mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-6 hover:border-primary/30 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "Verification trends" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "Last 30 days · global volume" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-primary", children: [
            "+",
            /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { to: 12.4, decimals: 1, format: false, duration: 1.6, suffix: "%" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "ag", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--cyan)", stopOpacity: 0.6 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--cyan)", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "x", hide: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "v", stroke: "var(--cyan)", strokeWidth: 2, fill: "url(#ag)", isAnimationActive: true, animationDuration: 1200, dot: {
            r: 2,
            fill: "var(--cyan)"
          }, activeDot: {
            r: 5
          } })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-6 hover:border-primary/30 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "Risk distribution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "All verifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-44 w-44 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PieChart, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: riskData, dataKey: "value", innerRadius: 50, outerRadius: 75, stroke: "none", isAnimationActive: true, animationDuration: 1400, animationBegin: 200, children: riskData.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: RISK_COLORS[i] }, i)) }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "text-2xl font-semibold", animate: {
                opacity: [0.7, 1, 0.7]
              }, transition: {
                duration: 2.4,
                repeat: Infinity
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { to: 84, suffix: "%", duration: 1.8 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "Authentic" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 text-xs", children: riskData.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            x: 10
          }, whileInView: {
            opacity: 1,
            x: 0
          }, viewport: {
            once: true
          }, transition: {
            delay: i * 0.12
          }, className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-sm", style: {
              background: RISK_COLORS[i]
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { to: r.value, suffix: "%", duration: 1.4 }) })
          ] }, r.name)) })
        ] })
      ] }) })
    ] })
  ] }) });
}
function Pharmacies() {
  const items = [{
    n: "Apollo Pharmacy",
    d: "Mumbai · 0.4 km",
    t: 98
  }, {
    n: "MedPlus Health",
    d: "Delhi · 0.9 km",
    t: 92
  }, {
    n: "Guardian Pharmacy",
    d: "Bengaluru · 1.2 km",
    t: 94
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 border-b border-border/60 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Verified network" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-semibold tracking-tight mt-4 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { to: 12847, duration: 2 }),
        " verified dispensaries — and counting."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-4 mt-12", children: items.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.12,
      duration: 0.55
    }, whileHover: {
      scale: 1.03
    }, className: "rounded-2xl glass p-6 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_var(--cyan)] transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg gradient-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium flex items-center gap-1.5", children: [
              p.n,
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { animate: {
                scale: [1, 1.2, 1]
              }, transition: {
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5 text-emerald" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: p.d })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono px-2 py-1 rounded-md bg-emerald/15 text-emerald", children: "Verified" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-semibold mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { to: p.t, duration: 1.6 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Trust score" })
    ] }, p.n)) })
  ] }) });
}
function BigStats() {
  const s = [{
    v: 1838526,
    l: "Verifications run"
  }, {
    v: 10994,
    l: "Counterfeits flagged"
  }, {
    v: 2919,
    l: "Manufacturers on-chain"
  }, {
    v: 41259,
    l: "Cities operating"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 border-y border-border/60 bg-card/30 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center", children: s.map((x, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 16
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, transition: {
    delay: i * 0.08
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl md:text-4xl font-semibold gradient-text tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { to: x.v, duration: 2.2 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-2 uppercase tracking-[0.2em]", children: x.l })
  ] }, x.l)) }) });
}
function Testimonials() {
  const items = [{
    q: "MedChain cuts our counterfeit incident response time from days to seconds. The audit trail is FDA-bulletproof.",
    n: "Dr. Anisha Rao",
    r: "Quality, Apollo Hospitals"
  }, {
    q: "We deployed across 600 outlets in 4 weeks. Pharmacists love the scan flow — patients trust the badge.",
    n: "Marco Lin",
    r: "Ops, MedPlus"
  }, {
    q: "The blockchain anchor closed an entire audit class for us. Regulators got their report instantly.",
    n: "Sarah Decker",
    r: "Compliance, NovaPharma"
  }];
  const [idx, setIdx] = reactExports.useState(0);
  const [paused, setPaused] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 5e3);
    return () => clearInterval(t);
  }, [paused, items.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 border-b border-border/60 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Field-tested" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-semibold tracking-tight mt-4 max-w-2xl", children: "Loved by quality officers and CTOs alike." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 relative max-w-3xl mx-auto", onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl glass p-10 min-h-[220px] relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 14
      }, animate: {
        opacity: 1,
        y: 0
      }, exit: {
        opacity: 0,
        y: -14
      }, transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-lg leading-relaxed", children: [
          '"',
          items[idx].q,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: items[idx].n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: items[idx].r })
        ] })
      ] }, idx) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mt-5", children: items.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIdx(i), className: `h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-2 bg-border"}`, "aria-label": `Testimonial ${i + 1}` }, i)) })
    ] })
  ] }) });
}
function FAQ() {
  const items = [{
    q: "How accurate is the AI verification?",
    a: "The pipeline reaches 99.4% accuracy on benchmark datasets, combining Vision OCR, packaging similarity, manufacturer registry checks, and Gemini reasoning."
  }, {
    q: "Does it work offline or in low-connectivity areas?",
    a: "Yes — verifications can be queued on-device and synced when connectivity returns, with the same blockchain anchoring."
  }, {
    q: "How is patient data handled?",
    a: "Images are processed in secure regions, never sold, and the system is GDPR and HIPAA-ready."
  }, {
    q: "Can pharmacies and manufacturers join?",
    a: "Every actor has a dedicated portal — patients, pharmacies, manufacturers, hospitals, and regulators."
  }, {
    q: "What languages are supported?",
    a: "OCR is trained for 24+ languages including English, Hindi, Bengali, Arabic, Spanish, French, Portuguese, and Mandarin."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "faq", className: "py-24 border-b border-border/60 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "FAQ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-semibold tracking-tight mt-4", children: "Questions, answered." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-3", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FAQItem, { ...it }, i)) })
  ] }) });
}
function FAQItem({
  q,
  a
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, className: `rounded-xl glass transition-all ${open ? "border-primary/40 shadow-[0_0_30px_-14px_var(--cyan)]" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(!open), className: "w-full flex items-center justify-between p-5 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: q }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        rotate: open ? 180 : 0
      }, transition: {
        duration: 0.3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      height: 0,
      opacity: 0
    }, animate: {
      height: "auto",
      opacity: 1
    }, exit: {
      height: 0,
      opacity: 0
    }, transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1]
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 text-sm text-muted-foreground", children: a }) }, "content") })
  ] });
}
function CTABanner() {
  const ref = reactExports.useRef(null);
  const [m, setM] = reactExports.useState({
    x: 50,
    y: 50
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, onMouseMove: (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setM({
      x: (e.clientX - r.left) / r.width * 100,
      y: (e.clientY - r.top) / r.height * 100
    });
  }, className: "relative rounded-3xl p-10 lg:p-14 overflow-hidden", style: {
    background: "linear-gradient(135deg, color-mix(in oklab, var(--cyan) 70%, var(--primary)), color-mix(in oklab, var(--primary) 80%, #6366f1))"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 transition-opacity", style: {
      background: `radial-gradient(400px circle at ${m.x}% ${m.y}%, rgba(255,255,255,0.18), transparent 60%)`
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/15 blur-3xl", animate: {
      x: [0, 30, -10, 0],
      y: [0, 20, -10, 0]
    }, transition: {
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl", animate: {
      x: [0, -20, 30, 0],
      y: [0, -15, 10, 0]
    }, transition: {
      duration: 18,
      repeat: Infinity,
      ease: "easeInOut"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl md:text-4xl font-semibold tracking-tight text-white", children: "Ship trust into every dispense." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 mt-3 max-w-xl text-sm", children: "Join hospitals, regulators, and manufacturers deploying MedChain AI in production today." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "relative group overflow-hidden px-5 py-3 rounded-xl bg-background text-foreground font-medium inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/30 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-primary" }),
          "Launch Console"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/verify", className: "px-5 py-3 rounded-xl bg-white/10 border border-white/30 text-white font-medium backdrop-blur-sm hover:bg-white/20 transition-colors", children: "Contact sales" })
      ] })
    ] })
  ] }) }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/60 pt-16 pb-10 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-4 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-lg gradient-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "MedChain AI" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed max-w-xs", children: "Securing the global medicine supply chain with high-fidelity artificial intelligence." })
      ] }),
      [{
        h: "Product",
        l: ["Verify", "Pharmacies", "Heatmap", "Blockchain"]
      }, {
        h: "Company",
        l: ["About", "Customers", "Security", "Contact"]
      }, {
        h: "Resources",
        l: ["Docs", "API", "Compliance", "Status"]
      }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold mb-4", children: c.h }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-xs text-muted-foreground", children: c.l.map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground transition-colors", children: x }) }, x)) })
      ] }, c.h))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-[10px] text-muted-foreground font-mono uppercase tracking-widest", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " MedChain AI Systems · All rights reserved"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Privacy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Terms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Compliance" })
      ] })
    ] })
  ] }) });
}
export {
  Landing as component
};
