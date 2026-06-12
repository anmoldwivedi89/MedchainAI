import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ShieldCheck, ScanLine, Boxes, MapPin, Sparkles, ArrowRight,
  Brain, Zap, BadgeCheck, ChevronDown, Check, Activity, Cpu, Database, Lock, Menu, X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell, XAxis, Tooltip,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedChain AI — Building Trust In Every Medicine" },
      { name: "description", content: "AI-powered medicine verification, counterfeit detection, pharmacy intelligence, and blockchain-backed trust records." },
      { property: "og:title", content: "MedChain AI — Building Trust In Every Medicine" },
      { property: "og:description", content: "AI-powered medicine verification, counterfeit detection, pharmacy intelligence, and blockchain-backed trust records." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <AmbientBackground />
      <Nav />
      <Hero />
      <LogosStrip />
      <Problem />
      <HowItWorks />
      <TrustStack />
      <Pipeline />
      <Audit />
      <ChartsRow />
      <Pharmacies />
      <BigStats />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}

/* ============================================================
   Shared primitives
   ============================================================ */

const Eyebrow = ({ children }: any) => (
  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono uppercase tracking-[0.2em]">
    {children}
  </div>
);

function CountUp({
  to,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  format = true,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  format?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => {
    const n = Number(latest.toFixed(decimals));
    return `${prefix}${format ? n.toLocaleString() : n.toFixed(decimals)}${suffix}`;
  });
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, to, duration, mv]);
  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   Ambient background — floating gradient blobs + grid
   ============================================================ */
function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.18]" />
      <motion.div
        className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full"
        style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--cyan) 35%, transparent), transparent)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[460px] w-[460px] rounded-full"
        style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 30%, transparent), transparent)" }}
        animate={{ x: [0, -50, 20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full"
        style={{ background: "radial-gradient(closest-side, color-mix(in oklab, #8b5cf6 25%, transparent), transparent)" }}
        animate={{ x: [0, 40, -30, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ============================================================
   Nav
   ============================================================ */
function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  // ESC key to close
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Lock body scroll
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg gradient-primary grid place-items-center glow-cyan">
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight text-sm sm:text-base">MedChain AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground ml-12">
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#features" className="hover:text-foreground transition-colors">Platform</a>
          <a href="#blockchain" className="hover:text-foreground transition-colors">Blockchain</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/login" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground px-2 sm:px-3 py-2">Sign in</Link>
          <Link to="/verify" className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity items-center gap-2">
            Verify Medicine <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden h-10 w-10 grid place-items-center rounded-lg border border-border"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={close}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 w-72 max-w-[85vw] z-50 bg-background/95 backdrop-blur-xl border-l border-border flex flex-col md:hidden safe-top"
            >
              <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
                <span className="font-semibold text-sm">Menu</span>
                <button onClick={close} className="h-10 w-10 grid place-items-center rounded-lg hover:bg-sidebar-accent" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-1">
                <a href="#how" onClick={close} className="block text-sm text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-sidebar-accent/60 transition-colors">How it works</a>
                <a href="#features" onClick={close} className="block text-sm text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-sidebar-accent/60 transition-colors">Platform</a>
                <a href="#blockchain" onClick={close} className="block text-sm text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-sidebar-accent/60 transition-colors">Blockchain</a>
                <a href="#faq" onClick={close} className="block text-sm text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-sidebar-accent/60 transition-colors">FAQ</a>

                <div className="pt-3 pb-2 px-3 text-[10px] uppercase tracking-widest text-muted-foreground">Quick Links</div>
                <Link to="/dashboard" onClick={close} className="block text-sm text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-sidebar-accent/60 transition-colors">Dashboard</Link>
                <Link to="/login" onClick={close} className="block text-sm text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-sidebar-accent/60 transition-colors">Sign In</Link>
                <Link to="/register" onClick={close} className="block text-sm text-muted-foreground hover:text-foreground py-3 px-3 rounded-lg hover:bg-sidebar-accent/60 transition-colors">Sign Up</Link>
              </div>
              <div className="p-4 safe-bottom shrink-0">
                <Link to="/verify" onClick={close} className="block text-sm font-semibold px-4 py-3 rounded-xl gradient-primary text-primary-foreground text-center">
                  Verify Medicine
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ============================================================
   Hero + Live Verification Terminal
   ============================================================ */
function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 aurora opacity-90" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4 sm:mb-6">
              <Eyebrow>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
                v2.4 Enterprise Live
              </Eyebrow>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[1.05]">
              Building <span className="gradient-text">Trust</span> in<br className="hidden sm:inline" /> Every Medicine
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 sm:mt-6 text-sm sm:text-lg text-muted-foreground max-w-xl">
              AI-powered medicine verification, counterfeit detection, pharmacy intelligence, and blockchain-backed trust records — in a single enterprise platform.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 sm:mt-9 flex flex-wrap items-center gap-3">
              <Link to="/verify" className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-cyan overflow-hidden text-sm sm:text-base">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <ScanLine className="h-4 w-4" /> Verify Now
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl glass-strong font-medium hover:bg-card transition-colors text-sm sm:text-base">
                Explore Platform <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-5 text-[10px] sm:text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald" /> HIPAA Compliant</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald" /> Blockchain Verified</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald" /> Gemini AI</span>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="hidden md:block">
            <LiveTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const MEDICINES = [
  { name: "Paracetamol 500mg", lot: "PCM-782-901-AX", auth: 98, risk: "Low" },
  { name: "Amoxicillin 250mg", lot: "AMX-441-220-KQ", auth: 96, risk: "Low" },
  { name: "Dolo 650", lot: "DLO-118-993-RT", auth: 99, risk: "Low" },
  { name: "Azithromycin 500mg", lot: "AZM-552-018-PB", auth: 94, risk: "Low" },
  { name: "Metformin 850mg", lot: "MET-309-771-HQ", auth: 91, risk: "Medium" },
  { name: "Crocin Advance", lot: "CRA-660-122-XV", auth: 97, risk: "Low" },
  { name: "Insulin Glargine", lot: "INS-204-885-JM", auth: 95, risk: "Low" },
];

const STEPS = [
  { k: "Scanning", icon: ScanLine },
  { k: "OCR Reading", icon: Cpu },
  { k: "AI Analysis", icon: Brain },
  { k: "Blockchain Verification", icon: Lock },
  { k: "Result Generated", icon: BadgeCheck },
];

function LiveTerminal() {
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0);
  const med = MEDICINES[idx];

  // Step cycle (each step ~700ms), then advance medicine
  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => {
        if (s < STEPS.length - 1) return s + 1;
        return s;
      });
    }, 750);
    return () => clearInterval(t);
  }, [idx]);

  useEffect(() => {
    const t = setInterval(() => {
      setStep(0);
      setIdx((i) => (i + 1) % MEDICINES.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const done = step >= STEPS.length - 1;

  return (
    <div className="rounded-2xl glass-strong p-3 shadow-2xl relative">
      <div className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--cyan) 40%, transparent), transparent 60%)", mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)", WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)", padding: 1 }} />
      <div className="rounded-xl bg-card/85 border border-border overflow-hidden relative">
        {/* terminal header */}
        <div className="h-9 border-b border-border flex items-center px-4 gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-warn/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald/50" />
          <div className="ml-4 text-[10px] font-mono text-muted-foreground tracking-widest uppercase">verification terminal</div>
          <div className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-emerald">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald" />
            </span>
            LIVE
          </div>
        </div>

        {/* scan-line overlay */}
        <div className="absolute inset-x-0 top-9 bottom-0 overflow-hidden pointer-events-none">
          <motion.div
            key={`scan-${idx}`}
            className="absolute left-0 right-0 h-24"
            style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklab, var(--cyan) 30%, transparent), transparent)" }}
            initial={{ y: "-30%" }}
            animate={{ y: "120%" }}
            transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
          />
        </div>

        <div className="p-6 space-y-4 relative">
          {/* medicine card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={med.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl bg-primary/10 border border-primary/20 p-5 flex items-center gap-4 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{ background: "radial-gradient(600px circle at 0% 0%, color-mix(in oklab, var(--cyan) 50%, transparent), transparent 40%)" }}
                animate={{ opacity: [0.2, 0.45, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="h-14 w-14 rounded-lg bg-background/60 grid place-items-center relative">
                <ScanLine className="h-6 w-6 text-primary" />
              </div>
              <div className="relative">
                <div className="text-[10px] font-mono text-primary uppercase tracking-widest flex items-center gap-1">
                  {STEPS[step].k}
                  <TypingDots />
                </div>
                <div className="text-base font-semibold">{med.name}</div>
                <div className="text-[11px] text-muted-foreground font-mono">Lot {med.lot}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* step pipeline */}
          <div className="grid grid-cols-5 gap-1.5">
            {STEPS.map((s, i) => {
              const active = i <= step;
              const Icon = s.icon;
              return (
                <div key={s.k} className="flex flex-col items-center gap-1">
                  <motion.div
                    animate={{
                      backgroundColor: active ? "color-mix(in oklab, var(--cyan) 18%, transparent)" : "transparent",
                      borderColor: active ? "color-mix(in oklab, var(--cyan) 60%, transparent)" : "var(--border)",
                    }}
                    className="h-8 w-8 rounded-md border grid place-items-center"
                  >
                    <Icon className={`h-3.5 w-3.5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  </motion.div>
                  <div className="h-0.5 w-full rounded-full bg-border overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: active ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* metrics */}
          <div className="grid grid-cols-3 gap-3">
            <Metric label="Authenticity" value={done ? `${med.auth}%` : "—"} pulse={done} highlight />
            <Metric label="Status" value={done ? "Verified ✓" : "Pending"} color={done ? "text-emerald" : "text-muted-foreground"} />
            <Metric label="Risk" value={done ? med.risk : "—"} color={done ? (med.risk === "Low" ? "text-emerald" : "text-warn") : ""} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-0.5 ml-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1 w-1 rounded-full bg-primary"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </span>
  );
}

function Metric({ label, value, color = "", pulse = false, highlight = false }: any) {
  return (
    <div className={`rounded-lg border p-3 bg-background/40 relative overflow-hidden ${highlight ? "border-primary/30" : "border-border"}`}>
      {pulse && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{ boxShadow: "inset 0 0 24px color-mix(in oklab, var(--cyan) 35%, transparent)" }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground relative">{label}</div>
      <AnimatePresence mode="wait">
        <motion.div
          key={String(value)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className={`text-lg font-semibold mt-1 relative ${color}`}
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   Logos strip
   ============================================================ */
function LogosStrip() {
  const items = ["WHO Guidelines", "FDA Standards", "ISO 27001", "HIPAA Ready", "GDPR Compliant", "Polygon Verified"];
  return (
    <section className="border-y border-border/60 bg-card/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.25em] text-muted-foreground uppercase mb-4 sm:mb-5">Trusted by regulators, manufacturers & 12,000+ pharmacies</div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-2 sm:gap-y-3 text-[10px] sm:text-xs text-muted-foreground tracking-wide uppercase">
          {items.map((i, k) => (
            <motion.span key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.05 }}>
              {i}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Problem (with CountUp)
   ============================================================ */
function Problem() {
  const pts = [
    { v: 200, prefix: "$", suffix: "B+", l: "Counterfeit drug market funding organized crime globally." },
    { v: 1, suffix: "M+", l: "Preventable deaths per year caused by substandard medication." },
    { v: 72, suffix: "%", l: "Of patients lack confidence in the medicine they receive." },
  ];
  return (
    <section className="py-16 sm:py-24 border-b border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-4">A trust crisis in global healthcare.</h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md">Patients have no reliable way to know whether the medicine in their hand is real. Regulators lack real-time intelligence. Pharmacies have no trust signal.</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {pts.map((p, i) => (
            <motion.div
              key={p.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl glass p-5 sm:p-6 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_var(--cyan)] transition-all"
            >
              <div className="text-2xl sm:text-3xl font-semibold">
                <CountUp to={p.v} prefix={p.prefix || ""} suffix={p.suffix || ""} duration={1.6} />
              </div>
              <div className="text-xs text-muted-foreground mt-2 sm:mt-3 leading-relaxed">{p.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   How it works
   ============================================================ */
function HowItWorks() {
  const steps = [
    { i: ScanLine, t: "Scan or upload", d: "Snap a photo of the packaging or upload at the point of sale." },
    { i: Brain, t: "AI verifies in 1.8s", d: "Computer vision + OCR match packaging against the manufacturer ledger." },
    { i: ShieldCheck, t: "Trust score returned", d: "Authenticity score, batch compliance, and history details are instantly delivered." },
  ];
  return (
    <section id="how" className="py-16 sm:py-24 border-b border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-10 sm:mb-14">
          <Eyebrow>The solution</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-4">Three steps from suspicion to certainty.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {steps.map((s, i) => {
            const Icon = s.i;
            return (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl glass p-5 sm:p-7 relative hover:border-primary/40 hover:shadow-[0_0_40px_-12px_var(--cyan)] transition-all"
              >
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[10px] font-mono text-muted-foreground">0{i + 1}</div>
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-primary/15 grid place-items-center mb-4 sm:mb-5">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="font-semibold text-sm sm:text-base">{s.t}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TrustStack
   ============================================================ */
function TrustStack() {
  const feats = [
    { t: "Computer vision OCR", d: "Reads names, doses, and expiry in 24+ languages." },
    { t: "Manufacturer ledger", d: "Direct from 350+ pharmaceutical companies." },
    { t: "Real-time fraud graph", d: "Counterfeit reports aggregated across regions." },
    { t: "Trusted pharmacy network", d: "12,847 verified dispensaries and counting." },
    { t: "Blockchain audit trail", d: "Every verification anchored on Polygon for compliance." },
    { t: "Enterprise SLAs", d: "99.99% uptime, edge-ready, observable end-to-end." },
  ];
  return (
    <section id="features" className="py-16 sm:py-24 border-b border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Eyebrow>Platform</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-4 max-w-2xl">The trust stack the industry has been waiting for.</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12">
          {feats.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.05, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl glass p-5 sm:p-6 hover:border-primary/40 hover:shadow-[0_0_36px_-14px_var(--cyan)] transition-all"
            >
              <div className="h-1.5 w-8 rounded-full gradient-primary mb-4 sm:mb-5" />
              <div className="font-semibold text-sm sm:text-base">{f.t}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">{f.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Pipeline
   ============================================================ */
function Pipeline() {
  const stages = [
    "Medicine Image", "OCR Extraction", "Medicine Matching", "Packaging Analysis",
    "Fraud Intelligence", "AI Risk Analysis", "Blockchain Validation", "Authenticity Score",
  ];
  return (
    <section className="py-16 sm:py-24 border-b border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Eyebrow>The core engine</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-4 max-w-2xl">Eight-stage pipeline. One score.</h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 mt-8 sm:mt-12">
          {stages.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className={`rounded-xl border p-3 sm:p-5 bg-card/40 transition-all ${i === 7 ? "border-primary/50 bg-primary/5 shadow-[0_0_30px_-12px_var(--cyan)]" : "border-border hover:border-primary/40 hover:shadow-[0_0_24px_-12px_var(--cyan)]"}`}
            >
              <div className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-1.5 sm:mb-2 ${i === 7 ? "text-primary" : "text-muted-foreground"}`}>Stage 0{i + 1}</div>
              <div className="text-xs sm:text-sm font-semibold">{s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Live Audit Ledger
   ============================================================ */
const LEDGER_TEMPLATES = [
  "Pfizer Batch Verification",
  "Insulin Glargine Validation",
  "WHO Compliance Check",
  "Manufacturer Approval",
  "Geo Verification — Mumbai",
  "Lipitor 20mg Distribution",
  "Metformin 850mg Batch",
  "Cipla OCR Match",
  "Polygon Anchor Receipt",
  "Apollo Pharmacy Audit",
];

function makeRow() {
  const id = "#0x" + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, "0");
  return {
    id,
    n: LEDGER_TEMPLATES[Math.floor(Math.random() * LEDGER_TEMPLATES.length)],
    t: "just now",
  };
}

function Audit() {
  const [rows, setRows] = useState([
    { id: "#0xF8A1", n: "Pfizer Batch Verification", t: "2m ago" },
    { id: "#0xA42C", n: "Insulin Glargine Validation", t: "14m ago" },
    { id: "#0xBC09", n: "WHO Compliance Check", t: "1h ago" },
    { id: "#0x9134", n: "Manufacturer Approval", t: "3h ago" },
  ]);

  useEffect(() => {
    const t = setInterval(() => {
      setRows((r) => [makeRow(), ...r.slice(0, 4)]);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="blockchain" className="py-16 sm:py-24 border-b border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal>
          <Eyebrow>Accountability</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-4 leading-tight">Immutable audit trail.<br />Regulator-ready.</h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">Every scan, every verification, and every report is anchored to a tamper-proof ledger. Export proofs for FDA, WHO, and EMA in one click.</p>
          <ul className="mt-5 sm:mt-7 space-y-3 text-sm">
            {["Direct-source manufacturer batches", "Full availability history tracking", "Geo-fencing for regional permits"].map((l) => (
              <li key={l} className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-emerald/15 grid place-items-center shrink-0"><Check className="h-3 w-3 text-emerald" /></div>
                {l}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl glass-strong p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Audit Ledger</span>
              <span className="text-[10px] text-emerald px-2 py-0.5 rounded border border-emerald/30 bg-emerald/10 font-mono flex items-center gap-1.5">
                <motion.span className="h-1.5 w-1.5 rounded-full bg-emerald" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }} />
                LIVE
              </span>
            </div>
            <div className="space-y-2 relative">
              <AnimatePresence initial={false}>
                {rows.map((r) => (
                  <motion.div
                    key={r.id}
                    layout
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/40 overflow-hidden"
                  >
                    <div className="flex gap-4 items-center min-w-0">
                      <div className="text-[10px] font-mono text-muted-foreground">{r.id}</div>
                      <div className="text-sm truncate">{r.n}</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono shrink-0">{r.t}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   Charts Row — trend + donut
   ============================================================ */
const trendData = Array.from({ length: 12 }).map((_, i) => ({ x: `W${i + 1}`, v: 40 + Math.round(Math.sin(i / 2) * 18 + i * 4) }));
const riskData = [
  { name: "Authentic", value: 84 },
  { name: "In-Transit", value: 10 },
  { name: "Flagged", value: 6 },
];
const RISK_COLORS = ["var(--emerald)", "var(--cyan)", "var(--destructive)"];

function ChartsRow() {
  const [data, setData] = useState(trendData);
  useEffect(() => {
    const t = setInterval(() => {
      setData((d) => {
        const next = [...d.slice(1), { x: `W${parseInt(d[d.length - 1].x.slice(1)) + 1}`, v: 40 + Math.round(Math.random() * 50) }];
        return next;
      });
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-16 sm:py-24 border-b border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Eyebrow>Live intelligence</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-4 max-w-2xl">See counterfeits before they reach a patient.</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-12">
          <Reveal>
            <div className="rounded-2xl glass p-4 sm:p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="text-xs sm:text-sm font-semibold">Verification trends</div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground">Last 30 days · global volume</div>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-primary">
                  +<CountUp to={12.4} decimals={1} format={false} duration={1.6} suffix="%" />
                </div>
              </div>
              <div className="h-36 sm:h-44 mt-3 sm:mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="x" hide />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                    <Area type="monotone" dataKey="v" stroke="var(--cyan)" strokeWidth={2} fill="url(#ag)" isAnimationActive animationDuration={1200} dot={{ r: 2, fill: "var(--cyan)" }} activeDot={{ r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl glass p-4 sm:p-6 hover:border-primary/30 transition-colors">
              <div className="text-xs sm:text-sm font-semibold">Risk distribution</div>
              <div className="text-[10px] sm:text-[11px] text-muted-foreground">All verifications</div>
              <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-4">
                <div className="h-32 w-32 sm:h-44 sm:w-44 relative shrink-0">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={riskData} dataKey="value" innerRadius="55%" outerRadius="85%" stroke="none" isAnimationActive animationDuration={1400} animationBegin={200}>
                        {riskData.map((_, i) => <Cell key={i} fill={RISK_COLORS[i]} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <motion.div
                      className="text-xl sm:text-2xl font-semibold"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    >
                      <CountUp to={84} suffix="%" duration={1.8} />
                    </motion.div>
                    <div className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest">Authentic</div>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3 text-xs">
                  {riskData.map((r, i) => (
                    <motion.div
                      key={r.name}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 }}
                      className="flex items-center gap-2"
                    >
                      <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ background: RISK_COLORS[i] }} />
                      <span className="font-medium">{r.name}</span>
                      <span className="text-muted-foreground font-mono">
                        <CountUp to={r.value} suffix="%" duration={1.4} />
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Pharmacies
   ============================================================ */
function Pharmacies() {
  const items = [
    { n: "Apollo Pharmacy", d: "Mumbai · 0.4 km", t: 98 },
    { n: "MedPlus Health", d: "Delhi · 0.9 km", t: 92 },
    { n: "Guardian Pharmacy", d: "Bengaluru · 1.2 km", t: 94 },
  ];
  return (
    <section className="py-16 sm:py-24 border-b border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Eyebrow>Verified network</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-4 max-w-2xl">
            <CountUp to={12847} duration={2} /> verified dispensaries — and counting.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-12">
          {items.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl glass p-5 sm:p-6 hover:border-primary/50 hover:shadow-[0_0_40px_-10px_var(--cyan)] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg gradient-primary grid place-items-center"><MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground" /></div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium flex items-center gap-1.5">
                      {p.n}
                      <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                        <BadgeCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald" />
                      </motion.span>
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-muted-foreground">{p.d}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-emerald/15 text-emerald hidden sm:inline">Verified</span>
              </div>
              <div className="text-2xl sm:text-3xl font-semibold mt-4 sm:mt-5">
                <CountUp to={p.t} duration={1.6} />
              </div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground">Trust score</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Big Stats (CountUp)
   ============================================================ */
function BigStats() {
  const s = [
    { v: 1838526, l: "Verifications run" },
    { v: 10994, l: "Counterfeits flagged" },
    { v: 2919, l: "Manufacturers on-chain" },
    { v: 41259, l: "Cities operating" },
  ];
  return (
    <section className="py-14 sm:py-20 border-y border-border/60 bg-card/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
        {s.map((x, i) => (
          <motion.div
            key={x.l}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold gradient-text tracking-tight">
              <CountUp to={x.v} duration={2.2} />
            </div>
            <div className="text-[9px] sm:text-[10px] text-muted-foreground mt-1.5 sm:mt-2 uppercase tracking-[0.15em] sm:tracking-[0.2em]">{x.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Testimonial carousel
   ============================================================ */
function Testimonials() {
  const items = [
    { q: "MedChain cuts our counterfeit incident response time from days to seconds. The audit trail is FDA-bulletproof.", n: "Dr. Anisha Rao", r: "Quality, Apollo Hospitals" },
    { q: "We deployed across 600 outlets in 4 weeks. Pharmacists love the scan flow — patients trust the badge.", n: "Marco Lin", r: "Ops, MedPlus" },
    { q: "The blockchain anchor closed an entire audit class for us. Regulators got their report instantly.", n: "Sarah Decker", r: "Compliance, NovaPharma" },
  ];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  return (
    <section className="py-16 sm:py-24 border-b border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <Eyebrow>Field-tested</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-4 max-w-2xl">Loved by quality officers and CTOs alike.</h2>
        </Reveal>
        <div
          className="mt-8 sm:mt-12 relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="rounded-2xl glass p-6 sm:p-10 min-h-[180px] sm:min-h-[220px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Activity className="h-5 w-5 text-primary" />
                <p className="mt-4 sm:mt-5 text-sm sm:text-lg leading-relaxed">"{items[idx].q}"</p>
                <div className="mt-6 text-sm">
                  <div className="font-semibold">{items[idx].n}</div>
                  <div className="text-muted-foreground text-xs">{items[idx].r}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-2 bg-border"}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ — smooth accordion
   ============================================================ */
function FAQ() {
  const items = [
    { q: "How accurate is the AI verification?", a: "The pipeline reaches 99.4% accuracy on benchmark datasets, combining Vision OCR, packaging similarity, manufacturer registry checks, and Gemini reasoning." },
    { q: "Does it work offline or in low-connectivity areas?", a: "Yes — verifications can be queued on-device and synced when connectivity returns, with the same blockchain anchoring." },
    { q: "How is patient data handled?", a: "Images are processed in secure regions, never sold, and the system is GDPR and HIPAA-ready." },
    { q: "Can pharmacies and manufacturers join?", a: "Every actor has a dedicated portal — patients, pharmacies, manufacturers, hospitals, and regulators." },
    { q: "What languages are supported?", a: "OCR is trained for 24+ languages including English, Hindi, Bengali, Arabic, Spanish, French, Portuguese, and Mandarin." },
  ];
  return (
    <section id="faq" className="py-16 sm:py-24 border-b border-border/60 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-4">Questions, answered.</h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {items.map((it, i) => <FAQItem key={i} {...it} />)}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className={`rounded-xl glass transition-all ${open ? "border-primary/40 shadow-[0_0_30px_-14px_var(--cyan)]" : ""}`}
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-medium">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================
   CTA — animated gradient + shimmer
   ============================================================ */
function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ x: 50, y: 50 });
  return (
    <section className="py-10 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          onMouseMove={(e) => {
            const r = ref.current?.getBoundingClientRect();
            if (!r) return;
            setM({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
          className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, color-mix(in oklab, var(--cyan) 70%, var(--primary)), color-mix(in oklab, var(--primary) 80%, #6366f1))",
          }}
        >
          {/* mouse reactive lighting */}
          <div
            className="absolute inset-0 transition-opacity"
            style={{ background: `radial-gradient(400px circle at ${m.x}% ${m.y}%, rgba(255,255,255,0.18), transparent 60%)` }}
          />
          {/* floating glows */}
          <motion.div
            className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/15 blur-3xl"
            animate={{ x: [0, 30, -10, 0], y: [0, 20, -10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            animate={{ x: [0, -20, 30, 0], y: [0, -15, 10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">Ship trust into every dispense.</h3>
              <p className="text-white/85 mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm">Join hospitals, regulators, and manufacturers deploying MedChain AI in production today.</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Link
                to="/dashboard"
                className="relative group overflow-hidden px-5 py-3 rounded-xl bg-background text-foreground font-medium inline-flex items-center gap-2"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <Zap className="h-4 w-4 text-primary" />Launch Console
              </Link>
              <Link to="/verify" className="px-5 py-3 rounded-xl bg-white/10 border border-white/30 text-white font-medium backdrop-blur-sm hover:bg-white/20 transition-colors">Contact sales</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  return (
    <footer className="border-t border-border/60 pt-12 sm:pt-16 pb-8 sm:pb-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-lg gradient-primary grid place-items-center"><ShieldCheck className="h-3.5 w-3.5 text-primary-foreground" /></div>
              <span className="font-semibold">MedChain AI</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">Securing the global medicine supply chain with high-fidelity artificial intelligence.</p>
          </div>
          {[
            { h: "Product", l: ["Verify", "Pharmacies", "Heatmap", "Blockchain"] },
            { h: "Company", l: ["About", "Customers", "Security", "Contact"] },
            { h: "Resources", l: ["Docs", "API", "Compliance", "Status"] },
          ].map((c) => (
            <div key={c.h}>
              <div className="text-sm font-semibold mb-4">{c.h}</div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {c.l.map((x) => <li key={x}><a href="#" className="hover:text-foreground transition-colors">{x}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 sm:mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[9px] sm:text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
          <div>© {new Date().getFullYear()} MedChain AI Systems · All rights reserved</div>
          <div className="flex gap-5"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Compliance</a></div>
        </div>
      </div>
    </footer>
  );
}
