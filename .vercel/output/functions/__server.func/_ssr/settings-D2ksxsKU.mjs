import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader } from "./app-shell-DPjDGqkC.mjs";
import { n as User, L as Lock, o as Bell, p as ShieldCheck } from "../_libs/lucide-react.mjs";
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Settings", subtitle: "Manage your profile, security, and notifications." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: User, title: "Profile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", value: "Dr. A. Mehra" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", value: "amehra@medchain.ai" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Role", value: "User · Verified" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: Lock, title: "Security", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Two-factor authentication", on: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Device verification", on: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Session timeout (30 min)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: Bell, title: "Notifications", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Fraud alerts near me", on: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Verification results", on: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Weekly digest" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: ShieldCheck, title: "Blockchain identity", className: "lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border p-4 bg-background/40 font-mono text-xs text-muted-foreground", children: "0x9f3a2c81bb40e76ad24c81a8810dca09c821" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3", children: "Your verification activity is anchored to this on-chain identity." })
      ] })
    ] })
  ] });
}
function Section({
  icon: Icon,
  title,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl glass p-5 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-md gradient-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children })
  ] });
}
function Field({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: value, className: "mt-1 w-full px-3 py-2 rounded-lg bg-background/40 border border-border text-sm outline-none focus:border-primary" })
  ] });
}
function Toggle({
  label,
  on = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm py-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-5 w-9 rounded-full relative transition-colors ${on ? "bg-primary" : "bg-muted"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-4" : "left-0.5"}` }) })
  ] });
}
export {
  Page as component
};
