import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader } from "./app-shell-DPjDGqkC.mjs";
import { p as pharmacies } from "./mock-Bl0iguSb.mjs";
import { a as Search, N as Navigation, l as MapPin, c as BadgeCheck, r as Star } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Nearby Pharmacies", subtitle: "Discover verified pharmacies with live trust scores." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 rounded-2xl glass overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[460px] grid-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 aurora opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", children: pharmacies.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1", style: {
          top: `${20 + i * 11 % 70}%`,
          left: `${15 + i * 17 % 75}%`
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-3 w-3 rounded-full ring-4 ${p.verified ? "bg-emerald ring-emerald/30" : "bg-warn ring-warn/30"} animate-pulse` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] glass px-2 py-0.5 rounded-md whitespace-nowrap", children: p.name })
        ] }, p.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 left-4 right-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-2 rounded-lg glass-strong px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "bg-transparent outline-none flex-1 text-sm", placeholder: "Search pharmacies near you" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "px-3 py-2 rounded-lg gradient-primary text-primary-foreground text-xs font-medium inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3.5 w-3.5" }),
            "Locate me"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 right-4 text-[10px] glass px-2 py-1 rounded-md text-muted-foreground", children: "© MedChain Maps · Mock" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: pharmacies.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl glass p-4 hover:bg-card transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg gradient-primary grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium flex items-center gap-1.5 truncate", children: [
                p.name,
                p.verified && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5 text-emerald shrink-0" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: p.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
                p.distance,
                " away"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-base font-semibold ${p.trust >= 90 ? "text-emerald" : p.trust >= 75 ? "text-primary" : "text-warn"}`, children: p.trust }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground flex items-center gap-1 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3" }),
              "Trust"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex-1 text-xs py-2 rounded-md border border-border hover:bg-sidebar-accent", children: "Directions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex-1 text-xs py-2 rounded-md gradient-primary text-primary-foreground", children: "Visit" })
        ] })
      ] }, p.id)) })
    ] })
  ] });
}
export {
  Page as component
};
