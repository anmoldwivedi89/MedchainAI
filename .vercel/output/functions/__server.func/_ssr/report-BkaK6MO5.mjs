import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader } from "./app-shell-DPjDGqkC.mjs";
import { d as CircleCheck, U as Upload, l as MapPin } from "../_libs/lucide-react.mjs";
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
  const [sent, setSent] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Report Fake Medicine", subtitle: "Help protect your community. Reports are anonymized and reviewed by analysts." }),
    sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-strong p-10 text-center max-w-xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 mx-auto rounded-2xl bg-emerald/20 text-emerald grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mt-4", children: "Report submitted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Thank you. Your report will be reviewed within 24 hours and may be added to the fraud heatmap." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSent(false), className: "mt-6 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm", children: "Submit another" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      setSent(true);
    }, className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Medicine name", placeholder: "e.g. Azithromycin 500mg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Batch number / lot", placeholder: "AZ-7741" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(T, { label: "Description", placeholder: "Describe why you suspect this medicine is counterfeit…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(T, { label: "Additional notes", placeholder: "Optional", rows: 3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Evidence" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 rounded-xl border-2 border-dashed border-border bg-background/40 p-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 mx-auto text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm mt-2", children: "Drop photos or documents here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "PNG, JPG, PDF up to 10MB" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            "Location"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "City", placeholder: "Bengaluru" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Pin code", placeholder: "560001" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border p-3 text-xs text-muted-foreground bg-background/40", children: "Reports are anonymized. Only verified analysts can see your contact details." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full px-4 py-3 rounded-lg gradient-primary text-primary-foreground font-medium", children: "Submit report" })
      ] })
    ] })
  ] });
}
function F({
  label,
  ...p
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...p, className: "mt-1 w-full px-3 py-2.5 rounded-lg bg-background/40 border border-border text-sm outline-none focus:border-primary" })
  ] });
}
function T({
  label,
  rows = 4,
  ...p
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows, ...p, className: "mt-1 w-full px-3 py-2.5 rounded-lg bg-background/40 border border-border text-sm outline-none focus:border-primary" })
  ] });
}
export {
  Page as component
};
