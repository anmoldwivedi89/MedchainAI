import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader } from "./app-shell-DPjDGqkC.mjs";
import { n as notifications } from "./mock-Bl0iguSb.mjs";
import { I as Info, d as CircleCheck, T as TriangleAlert, o as Bell } from "../_libs/lucide-react.mjs";
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
const ICON = {
  high: TriangleAlert,
  success: CircleCheck,
  info: Info
};
const TONE = {
  high: "destructive",
  success: "emerald",
  info: "primary"
};
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Notifications", subtitle: "Real-time alerts from across your network.", action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs px-3 py-2 rounded-lg border border-border", children: "Mark all read" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl glass divide-y divide-border", children: notifications.map((n) => {
      const Icon = ICON[n.level] ?? Bell;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg grid place-items-center shrink-0", style: {
          background: `color-mix(in oklab, var(--${TONE[n.level]}) 15%, transparent)`,
          color: `var(--${TONE[n.level]})`
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: n.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: n.time })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs text-muted-foreground hover:text-foreground", children: "View" })
      ] }, n.id);
    }) })
  ] });
}
export {
  Page as component
};
