import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShieldCheck, MapPin, Flame, History, Bell, Settings,
  FileWarning, Building2, Store, ShieldAlert, Boxes, ScanLine, LogOut, Menu, X,
} from "lucide-react";
import { ReactNode, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/verify", label: "Verify Medicine", icon: ScanLine },
  { to: "/pharmacies", label: "Nearby Pharmacies", icon: MapPin },
  { to: "/heatmap", label: "Fraud Heatmap", icon: Flame },
  { to: "/history", label: "Scan History", icon: History },
  { to: "/report", label: "Report Fake", icon: FileWarning },
  { to: "/blockchain", label: "Blockchain", icon: Boxes },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

const portals = [
  { to: "/company", label: "Company Portal", icon: Building2 },
  { to: "/pharmacy-portal", label: "Pharmacy Portal", icon: Store },
  { to: "/admin", label: "Admin Panel", icon: ShieldAlert },
];

// Bottom nav for mobile — key items only
const bottomNav = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/verify", label: "Scan", icon: ScanLine },
  { to: "/notifications", label: "Alerts", icon: Bell },
  { to: "/settings", label: "More", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // ESC key to close menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar/80 backdrop-blur-xl fixed inset-y-0 left-0 z-40">
        <Link to="/" className="flex items-center gap-2 px-5 h-16 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-lg gradient-primary grid place-items-center glow-cyan">
            <ShieldCheck className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <div className="font-semibold tracking-tight">MedChain AI</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Trust Layer</div>
          </div>
        </Link>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-2 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Workspace</div>
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link key={item.to} to={item.to}
                className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-sidebar-accent text-foreground border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                }`}>
                <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                <span>{item.label}</span>
                {active && <motion.div layoutId="activeDot" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
          <div className="px-2 pt-4 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Portals</div>
          {portals.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link key={item.to} to={item.to}
                className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-sidebar-accent text-foreground border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                }`}>
                <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="m-3 p-3 rounded-xl glass">
          <div className="text-xs text-muted-foreground">Signed in as</div>
          <div className="text-sm font-medium truncate">{user?.email ?? "Guest"}</div>
          <div className="text-[10px] text-muted-foreground mt-1 capitalize">{role ?? "—"}</div>
          {user && (
            <button
              onClick={() => { logout(); window.location.href = "/login"; }}
              className="mt-2 w-full text-xs py-1.5 rounded-md border border-border hover:bg-destructive/10 hover:text-destructive transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <LogOut className="h-3 w-3" /> Sign out
            </button>
          )}
        </div>
      </aside>

      {/* Mobile slide-over menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
              onClick={closeMenu}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50 bg-sidebar/95 backdrop-blur-xl border-r border-border flex flex-col lg:hidden safe-top"
            >
              <div className="flex items-center justify-between px-4 h-14 border-b border-sidebar-border shrink-0">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg gradient-primary grid place-items-center">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <span className="font-semibold text-sm">MedChain AI</span>
                </div>
                <button
                  onClick={closeMenu}
                  className="h-10 w-10 grid place-items-center rounded-lg hover:bg-sidebar-accent"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 space-y-1">
                <div className="px-2 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Workspace</div>
                {nav.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.to;
                  return (
                    <Link key={item.to} to={item.to}
                      onClick={closeMenu}
                      className={`group flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all ${
                        active
                          ? "bg-sidebar-accent text-foreground border border-border"
                          : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                      }`}>
                      <Icon className={`h-4.5 w-4.5 ${active ? "text-primary" : ""}`} />
                      <span>{item.label}</span>
                      {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
                    </Link>
                  );
                })}
                <div className="px-2 pt-4 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Portals</div>
                {portals.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.to;
                  return (
                    <Link key={item.to} to={item.to}
                      onClick={closeMenu}
                      className={`group flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all ${
                        active
                          ? "bg-sidebar-accent text-foreground border border-border"
                          : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                      }`}>
                      <Icon className={`h-4.5 w-4.5 ${active ? "text-primary" : ""}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <div className="px-2 pt-4 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Authentication</div>
                {!user ? (
                  <>
                    <Link to="/login" onClick={closeMenu}
                      className="group flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60 transition-all">
                      <ShieldCheck className="h-4.5 w-4.5" /><span>Sign In</span>
                    </Link>
                    <Link to="/register" onClick={closeMenu}
                      className="group flex items-center gap-3 px-3 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60 transition-all">
                      <ShieldCheck className="h-4.5 w-4.5" /><span>Sign Up</span>
                    </Link>
                  </>
                ) : null}
              </nav>
              <div className="m-3 p-3 rounded-xl glass shrink-0 safe-bottom">
                <div className="text-xs text-muted-foreground">Signed in as</div>
                <div className="text-sm font-medium truncate">{user?.email ?? "Guest"}</div>
                <div className="text-[10px] text-muted-foreground mt-1 capitalize">{role ?? "—"}</div>
                {user && (
                  <button
                    onClick={() => { closeMenu(); logout(); window.location.href = "/login"; }}
                    className="mt-2 w-full text-xs py-2 rounded-md border border-border hover:bg-destructive/10 hover:text-destructive transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="h-3 w-3" /> Sign out
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 h-14 lg:h-16 border-b border-border bg-background/70 backdrop-blur-xl flex items-center px-3 sm:px-4 lg:px-8 gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden h-10 w-10 grid place-items-center rounded-lg border border-border hover:bg-sidebar-accent"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="lg:hidden flex items-center gap-2">
            <div className="h-7 w-7 rounded-md gradient-primary grid place-items-center">
              <ShieldCheck className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">MedChain AI</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
            All systems operational · Blockchain in sync
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/verify" className="hidden sm:inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
              <ScanLine className="h-3.5 w-3.5" />
              New Scan
            </Link>
            <Link to="/notifications" className="relative h-9 w-9 grid place-items-center rounded-lg border border-border hover:bg-sidebar-accent">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Link>
            <div className="h-9 w-9 rounded-lg gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground">
              {user?.email?.charAt(0).toUpperCase() ?? "G"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-8 pb-20 lg:pb-8">{children}</main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl safe-bottom">
        <div className="grid grid-cols-4 h-14">
          {bottomNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center gap-0.5 text-[10px] transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start sm:items-end justify-between gap-3 mb-5 lg:mb-6">
      <div className="min-w-0 flex-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
