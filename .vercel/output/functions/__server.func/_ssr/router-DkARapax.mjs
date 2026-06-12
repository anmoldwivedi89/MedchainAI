import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
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
const appCss = "/assets/styles-CJZ_DTxQ.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$f = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$f.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$e = () => import("./verify-C8py2yIT.mjs");
const Route$e = createFileRoute("/verify")({
  head: () => ({
    meta: [{
      title: "Verify Medicine — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./settings-D2ksxsKU.mjs");
const Route$d = createFileRoute("/settings")({
  head: () => ({
    meta: [{
      title: "Settings — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./report-BkaK6MO5.mjs");
const Route$c = createFileRoute("/report")({
  head: () => ({
    meta: [{
      title: "Report Fake Medicine — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./register-Bw01NGKr.mjs");
const Route$b = createFileRoute("/register")({
  head: () => ({
    meta: [{
      title: "Create account — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./pharmacy-portal-Cd2rxlBn.mjs");
const Route$a = createFileRoute("/pharmacy-portal")({
  head: () => ({
    meta: [{
      title: "Pharmacy Portal — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./pharmacies-B2UnI-ld.mjs");
const Route$9 = createFileRoute("/pharmacies")({
  head: () => ({
    meta: [{
      title: "Nearby Pharmacies — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./notifications-D7NlqYEf.mjs");
const Route$8 = createFileRoute("/notifications")({
  head: () => ({
    meta: [{
      title: "Notifications — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./login-CSgsRvHR.mjs");
const Route$7 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./history-6GsuIa9N.mjs");
const Route$6 = createFileRoute("/history")({
  head: () => ({
    meta: [{
      title: "Scan History — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./heatmap-B2sweKme.mjs");
const Route$5 = createFileRoute("/heatmap")({
  head: () => ({
    meta: [{
      title: "Fraud Heatmap — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./dashboard-BtBApGUF.mjs");
const Route$4 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./company-CkEQW2mL.mjs");
const Route$3 = createFileRoute("/company")({
  head: () => ({
    meta: [{
      title: "Company Portal — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./blockchain-CTwO9O0a.mjs");
const Route$2 = createFileRoute("/blockchain")({
  head: () => ({
    meta: [{
      title: "Blockchain Records — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin-L3KrlMjy.mjs");
const Route$1 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin Panel — MedChain AI"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-D0IHVPVT.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "MedChain AI — Building Trust In Every Medicine"
    }, {
      name: "description",
      content: "AI-powered medicine verification, counterfeit detection, pharmacy intelligence, and blockchain-backed trust records."
    }, {
      property: "og:title",
      content: "MedChain AI — Building Trust In Every Medicine"
    }, {
      property: "og:description",
      content: "AI-powered medicine verification, counterfeit detection, pharmacy intelligence, and blockchain-backed trust records."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const VerifyRoute = Route$e.update({
  id: "/verify",
  path: "/verify",
  getParentRoute: () => Route$f
});
const SettingsRoute = Route$d.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$f
});
const ReportRoute = Route$c.update({
  id: "/report",
  path: "/report",
  getParentRoute: () => Route$f
});
const RegisterRoute = Route$b.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$f
});
const PharmacyPortalRoute = Route$a.update({
  id: "/pharmacy-portal",
  path: "/pharmacy-portal",
  getParentRoute: () => Route$f
});
const PharmaciesRoute = Route$9.update({
  id: "/pharmacies",
  path: "/pharmacies",
  getParentRoute: () => Route$f
});
const NotificationsRoute = Route$8.update({
  id: "/notifications",
  path: "/notifications",
  getParentRoute: () => Route$f
});
const LoginRoute = Route$7.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$f
});
const HistoryRoute = Route$6.update({
  id: "/history",
  path: "/history",
  getParentRoute: () => Route$f
});
const HeatmapRoute = Route$5.update({
  id: "/heatmap",
  path: "/heatmap",
  getParentRoute: () => Route$f
});
const DashboardRoute = Route$4.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$f
});
const CompanyRoute = Route$3.update({
  id: "/company",
  path: "/company",
  getParentRoute: () => Route$f
});
const BlockchainRoute = Route$2.update({
  id: "/blockchain",
  path: "/blockchain",
  getParentRoute: () => Route$f
});
const AdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$f
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$f
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  BlockchainRoute,
  CompanyRoute,
  DashboardRoute,
  HeatmapRoute,
  HistoryRoute,
  LoginRoute,
  NotificationsRoute,
  PharmaciesRoute,
  PharmacyPortalRoute,
  RegisterRoute,
  ReportRoute,
  SettingsRoute,
  VerifyRoute
};
const routeTree = Route$f._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
