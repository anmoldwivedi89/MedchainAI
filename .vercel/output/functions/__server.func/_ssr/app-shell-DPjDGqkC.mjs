import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { p as ShieldCheck, O as LayoutDashboard, S as ScanLine, l as MapPin, z as Flame, H as History, Q as FileExclamationPoint, K as Boxes, o as Bell, V as Settings, x as Building2, q as Store, w as ShieldAlert } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/verify", label: "Verify Medicine", icon: ScanLine },
  { to: "/pharmacies", label: "Nearby Pharmacies", icon: MapPin },
  { to: "/heatmap", label: "Fraud Heatmap", icon: Flame },
  { to: "/history", label: "Scan History", icon: History },
  { to: "/report", label: "Report Fake", icon: FileExclamationPoint },
  { to: "/blockchain", label: "Blockchain", icon: Boxes },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings }
];
const portals = [
  { to: "/company", label: "Company Portal", icon: Building2 },
  { to: "/pharmacy-portal", label: "Pharmacy Portal", icon: Store },
  { to: "/admin", label: "Admin Panel", icon: ShieldAlert }
];
function AppShell({ children }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex w-full bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar/80 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 px-5 h-16 border-b border-sidebar-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg gradient-primary grid place-items-center glow-cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold tracking-tight", children: "MedChain AI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "Trust Layer" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 overflow-y-auto px-3 py-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground", children: "Workspace" }),
        nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              className: `group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${active ? "bg-sidebar-accent text-foreground border border-border" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${active ? "text-primary" : ""}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label }),
                active && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layoutId: "activeDot", className: "ml-auto h-1.5 w-1.5 rounded-full bg-primary" })
              ]
            },
            item.to
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pt-4 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground", children: "Portals" }),
        portals.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              className: `group flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${active ? "bg-sidebar-accent text-foreground border border-border" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${active ? "text-primary" : ""}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
              ]
            },
            item.to
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "m-3 p-3 rounded-xl glass", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Signed in as" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Dr. A. Mehra" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: "User · Verified" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 h-16 border-b border-border bg-background/70 backdrop-blur-xl flex items-center px-4 lg:px-8 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-md gradient-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: "MedChain AI" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" }),
          "All systems operational · Blockchain in sync"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/verify", className: "hidden sm:inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-3.5 w-3.5" }),
            "New Scan"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/notifications", className: "relative h-9 w-9 grid place-items-center rounded-lg border border-border hover:bg-sidebar-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg gradient-primary grid place-items-center text-xs font-semibold text-primary-foreground", children: "AM" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 lg:p-8", children })
    ] })
  ] });
}
function PageHeader({ title, subtitle, action }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl lg:text-3xl font-semibold tracking-tight", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })
    ] }),
    action
  ] });
}
export {
  AppShell as A,
  PageHeader as P
};
