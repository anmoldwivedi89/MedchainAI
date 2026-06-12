import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, ShieldCheck, MapPin, Flame, History, Bell, Settings,
  FileWarning, Building2, Store, ShieldAlert, Boxes, ScanLine, LogOut,
} from "lucide-react";
import { ReactNode } from "react";
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

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, role, logout } = useAuth();

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar/80 backdrop-blur-xl">
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

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/70 backdrop-blur-xl flex items-center px-4 lg:px-8 gap-4">
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
            <div className="h-9 w-9 rounded-lg gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground">AM</div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
