import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader } from "./app-shell-DPjDGqkC.mjs";
import { q as Store, c as BadgeCheck, T as TriangleAlert } from "../_libs/lucide-react.mjs";
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Pharmacy Portal", subtitle: "Manage your store profile, trust score, and live alerts." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl gradient-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold flex items-center gap-2", children: [
              "Apollo Pharmacy — Indiranagar ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-4 w-4 text-emerald" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "License IN-KA-872211 · Verified Tier 1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-semibold text-emerald", children: "98" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Trust Score" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3 mt-4", children: [{
          l: "Verifications served",
          v: "12,481"
        }, {
          l: "Disputes",
          v: "0"
        }, {
          l: "Avg. response",
          v: "2.1h"
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3 bg-background/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: s.l }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold mt-1", children: s.v })
        ] }, s.l)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-warn" }),
          "Fraud alerts"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { title: "Counterfeit Azithromycin AZ-7741", zone: "Mumbai · 12km" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { title: "Insulin recall — Sanofi batch INS-0921", zone: "Delhi NCR" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { title: "Substandard packaging cluster", zone: "Pune" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5 lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mb-2", children: "Verification request" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Re-verification renews your trust badge for another 90 days." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-4 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm", children: "Submit verification request" })
      ] })
    ] })
  ] });
}
function Alert({
  title,
  zone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-background/40 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: zone })
  ] });
}
export {
  Page as component
};
