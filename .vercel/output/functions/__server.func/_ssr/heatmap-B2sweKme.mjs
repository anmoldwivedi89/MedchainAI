import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader } from "./app-shell-DPjDGqkC.mjs";
import { f as fraudHotspots } from "./mock-Bl0iguSb.mjs";
import { l as MapPin, z as Flame, T as TriangleAlert } from "../_libs/lucide-react.mjs";
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
const tone = (r) => r === "High" ? "destructive" : r === "Medium" ? "warn" : "emerald";
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Fraud Heatmap", subtitle: "Geospatial intelligence on counterfeit activity." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 rounded-2xl glass overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[480px] grid-bg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 aurora opacity-40" }),
        fraudHotspots.map((h, i) => {
          const size = h.risk === "High" ? 140 : h.risk === "Medium" ? 100 : 70;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -translate-x-1/2 -translate-y-1/2", style: {
            top: `${15 + i * 13 % 70}%`,
            left: `${12 + i * 19 % 78}%`
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid place-items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute rounded-full animate-ping", style: {
              width: size,
              height: size,
              background: `radial-gradient(circle, color-mix(in oklab, var(--${tone(h.risk)}) 40%, transparent), transparent 70%)`
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute rounded-full", style: {
              width: size,
              height: size,
              background: `radial-gradient(circle, color-mix(in oklab, var(--${tone(h.risk)}) 55%, transparent), transparent 70%)`
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative glass px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
              h.city,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "· ",
                h.reports
              ] })
            ] })
          ] }) }, h.city);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 glass rounded-lg p-3 text-xs space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mb-1", children: "Risk legend" }),
          [["High", "destructive"], ["Medium", "warn"], ["Low", "emerald"]].map(([l, c]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-full", style: {
              background: `var(--${c})`
            } }),
            l
          ] }, l))
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-primary mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5" }),
            "Top hotspots"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: fraudHotspots.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg border border-border bg-background/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: h.city }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                h.reports,
                " reports"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-1 rounded-md", style: {
                background: `color-mix(in oklab, var(--${tone(h.risk)}) 15%, transparent)`,
                color: `var(--${tone(h.risk)})`
              }, children: h.risk })
            ] })
          ] }, h.city)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-primary mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }),
            "Active alerts"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Counterfeit Azithromycin batch ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: "AZ-7741" }),
              " detected in Mumbai"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Substandard Insulin recall issued in Delhi NCR" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Suspicious packaging cluster — Pune district" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Page as component
};
