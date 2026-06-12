import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader } from "./app-shell-DPjDGqkC.mjs";
import { J as Plus, x as Building2, U as Upload } from "../_libs/lucide-react.mjs";
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
const meds = [{
  name: "Paracetamol 500mg",
  batches: 124,
  anchored: true
}, {
  name: "Amoxicillin 250mg",
  batches: 87,
  anchored: true
}, {
  name: "Insulin Glargine",
  batches: 32,
  anchored: true
}, {
  name: "Metformin 850mg",
  batches: 56,
  anchored: false
}];
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Company Portal", subtitle: "Register medicines, anchor batches on-chain, and respond to reports.", action: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-xs px-3 py-2 rounded-lg gradient-primary text-primary-foreground inline-flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
      "Add medicine"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid lg:grid-cols-3 gap-4 mb-4", children: [{
      l: "Registered SKUs",
      v: "248"
    }, {
      l: "Anchored batches",
      v: "14,229"
    }, {
      l: "Open reports",
      v: "12"
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.l }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold mt-2", children: s.v })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 rounded-2xl glass p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mb-3", children: "Medicine catalog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: meds.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg border border-border bg-background/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg gradient-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: m.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                m.batches,
                " batches"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] px-2 py-1 rounded-md ${m.anchored ? "bg-emerald/15 text-emerald" : "bg-warn/15 text-warn"}`, children: m.anchored ? "On-chain" : "Pending" })
        ] }, m.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mb-3", children: "Upload packaging" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border-2 border-dashed border-border p-8 text-center bg-background/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6 mx-auto text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm mt-2", children: "Drop reference images" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Used to train packaging similarity" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Page as component
};
