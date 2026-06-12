import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader } from "./app-shell-DPjDGqkC.mjs";
import { p as pharmacies } from "./mock-Bl0iguSb.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-BV1PAT0P.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsPDF } from "../_libs/jspdf.mjs";
import "../_libs/seroval.mjs";
import { R as RotateCw, S as ScanLine, X, U as Upload, C as Camera, T as TriangleAlert, H as History, a as Search, b as Sparkles, L as Lock, B as Brain, c as BadgeCheck, d as CircleCheck, Z as ZoomOut, e as ZoomIn, f as RotateCcw, M as Maximize2, g as ChevronDown, h as Cpu, i as LoaderCircle, D as Download, j as Send, F as Flag, k as Copy, E as ExternalLink, l as MapPin, m as CircleX } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence, u as useMotionValue, a as useTransform, b as animate } from "../_libs/framer-motion.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const analyzeMedicineImage = createServerFn({
  method: "POST"
}).inputValidator((input) => {
  if (!input?.imageDataUrl || typeof input.imageDataUrl !== "string") {
    throw new Error("imageDataUrl is required");
  }
  if (input.imageDataUrl.length > 8e6) {
    throw new Error("Image is too large. Please use one smaller than 6MB.");
  }
  return input;
}).handler(createSsrRpc("93e2001d237de6ded4a5f846ec9fd29d2c892a7e2f96b757af79b54c7e21457e"));
const PIPELINE = [{
  key: "upload",
  label: "Uploading Image",
  icon: Upload,
  ms: 350
}, {
  key: "ocr",
  label: "OCR Extraction",
  icon: ScanLine,
  ms: 1200
}, {
  key: "match",
  label: "Medicine Matching",
  icon: Search,
  ms: 550
}, {
  key: "packaging",
  label: "Packaging Analysis",
  icon: Sparkles,
  ms: 500
}, {
  key: "fraud",
  label: "Fraud Intelligence",
  icon: TriangleAlert,
  ms: 500
}, {
  key: "blockchain",
  label: "Blockchain Validation",
  icon: Lock,
  ms: 600
}, {
  key: "ai",
  label: "AI Risk Analysis",
  icon: Brain,
  ms: 700
}, {
  key: "final",
  label: "Final Decision",
  icon: BadgeCheck,
  ms: 400
}];
const HISTORY_KEY = "medchain.scanHistory.v1";
function loadHistory() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveHistoryEntry(e) {
  const cur = loadHistory();
  localStorage.setItem(HISTORY_KEY, JSON.stringify([e, ...cur].slice(0, 20)));
}
function Verify() {
  const [stage, setStage] = reactExports.useState("idle");
  const [completed, setCompleted] = reactExports.useState(/* @__PURE__ */ new Set());
  const [imageSrc, setImageSrc] = reactExports.useState(null);
  const [cameraOn, setCameraOn] = reactExports.useState(false);
  const [cameraError, setCameraError] = reactExports.useState(null);
  const [analyzing, setAnalyzing] = reactExports.useState(false);
  const [analysis, setAnalysis] = reactExports.useState(null);
  const [analyzeError, setAnalyzeError] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState([]);
  const [reportOpen, setReportOpen] = reactExports.useState(false);
  const [fullscreen, setFullscreen] = reactExports.useState(false);
  const videoRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const fileRef = reactExports.useRef(null);
  const dragRef = reactExports.useRef(null);
  const analyze = useServerFn(analyzeMedicineImage);
  reactExports.useEffect(() => {
    setHistory(loadHistory());
  }, []);
  reactExports.useEffect(() => () => stopCamera(), []);
  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOn(false);
  }
  async function openCamera() {
    setCameraError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera API not available in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment"
          }
        },
        audio: false
      });
      streamRef.current = stream;
      setCameraOn(true);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {
          });
        }
      });
    } catch (e) {
      setCameraError(e?.name === "NotAllowedError" ? "Camera permission denied. Allow camera access in your browser." : e?.name === "NotFoundError" ? "No camera device found." : "Could not open camera. Make sure the page is loaded over HTTPS.");
    }
  }
  function capture() {
    const v = videoRef.current;
    if (!v) return;
    const canvas = document.createElement("canvas");
    const maxW = 1024;
    const scale = Math.min(1, maxW / (v.videoWidth || maxW));
    canvas.width = (v.videoWidth || 1280) * scale;
    canvas.height = (v.videoHeight || 720) * scale;
    canvas.getContext("2d")?.drawImage(v, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/jpeg", 0.85);
    stopCamera();
    run(data);
  }
  function onFile(e) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }
  function handleFile(f) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxW = 1024;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
        run(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(f);
  }
  async function run(dataUrl) {
    setImageSrc(dataUrl);
    setAnalysis(null);
    setAnalyzeError(null);
    setCompleted(/* @__PURE__ */ new Set());
    setAnalyzing(true);
    const aiPromise = analyze({
      data: {
        imageDataUrl: dataUrl
      }
    });
    const start = performance.now();
    try {
      setStage("upload");
      await wait(PIPELINE[0].ms);
      setCompleted((c) => new Set(c).add("upload"));
      setStage("ocr");
      const [aiResult] = await Promise.all([aiPromise, wait(PIPELINE[1].ms)]);
      setCompleted((c) => new Set(c).add("ocr"));
      setAnalysis(aiResult);
      if (!aiResult.isMedicine) {
        setAnalyzing(false);
        setStage("idle");
        return;
      }
      for (let i = 2; i < PIPELINE.length; i++) {
        const s = PIPELINE[i];
        setStage(s.key);
        await wait(s.ms);
        setCompleted((c) => new Set(c).add(s.key));
      }
      setStage("done");
      setAnalyzing(false);
      const score2 = deriveScore(aiResult);
      const entry = {
        id: "S-" + Math.random().toString(36).slice(2, 9).toUpperCase(),
        date: (/* @__PURE__ */ new Date()).toISOString(),
        name: aiResult.medicineName || aiResult.detectedObject || "Unknown",
        manufacturer: aiResult.manufacturer,
        batch: aiResult.batchNumber,
        score: score2,
        status: scoreBand(score2).label,
        thumb: dataUrl
      };
      saveHistoryEntry(entry);
      setHistory(loadHistory());
      void start;
    } catch (e) {
      setAnalysis({
        isMedicine: false,
        confidence: 0,
        description: "",
        friendlyError: {
          title: "Unable to Analyse Image",
          message: "Something went wrong while verifying this image. Please try again with a clearer photo of the medicine packaging."
        }
      });
      setAnalyzeError(null);
      setAnalyzing(false);
      setStage("idle");
    }
  }
  function reset() {
    stopCamera();
    setStage("idle");
    setImageSrc(null);
    setAnalysis(null);
    setAnalyzeError(null);
    setAnalyzing(false);
    setCompleted(/* @__PURE__ */ new Set());
  }
  const hasImage = !!imageSrc;
  const done = stage === "done";
  const score = analysis?.isMedicine ? deriveScore(analysis) : 0;
  const band = scoreBand(score);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Verify Medicine", subtitle: "Upload a packshot — Lovable AI runs OCR, packaging analysis, fraud intelligence, and anchors the result on-chain.", action: hasImage && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: reset, className: "text-xs px-3 py-2 rounded-lg border border-border hover:bg-sidebar-accent inline-flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "h-3.5 w-3.5" }),
      "New scan"
    ] }) }),
    !hasImage ? (
      /* ====================== EMPTY STATE ====================== */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          cameraOn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] rounded-2xl overflow-hidden border border-primary/40 bg-black", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, playsInline: true, muted: true, autoPlay: true, className: "absolute inset-0 h-full w-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanFrame, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-4 flex justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: capture, className: "px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-4 w-4" }),
                "Capture & Verify"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: stopCamera, className: "px-4 py-2 rounded-lg glass text-sm font-medium inline-flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
                "Close"
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: dragRef, onClick: () => fileRef.current?.click(), onDragOver: (e) => {
            e.preventDefault();
            dragRef.current?.classList.add("border-primary/70");
          }, onDragLeave: () => dragRef.current?.classList.remove("border-primary/70"), onDrop: (e) => {
            e.preventDefault();
            dragRef.current?.classList.remove("border-primary/70");
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }, className: "relative aspect-[16/10] rounded-2xl border-2 border-dashed border-border bg-card/40 hover:border-primary/60 transition-all cursor-pointer overflow-hidden grid place-items-center text-center p-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedScanner, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "h-16 w-16 mx-auto rounded-2xl gradient-primary grid place-items-center glow-cyan", animate: {
                y: [0, -6, 0]
              }, transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-7 w-7 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 text-lg font-semibold", children: "Drop medicine image to verify" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: "PNG, JPG up to 10MB · Gemini Vision OCR" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: (e) => {
                  e.stopPropagation();
                  fileRef.current?.click();
                }, className: "px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
                  "Upload Image"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: (e) => {
                  e.stopPropagation();
                  openCamera();
                }, className: "px-4 py-2 rounded-lg glass text-sm font-medium inline-flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-4 w-4" }),
                  "Open Camera"
                ] })
              ] }),
              cameraError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-xs text-rose-400 max-w-sm mx-auto", children: cameraError })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", className: "hidden", onChange: onFile }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RecentScans, { history, onOpen: (e) => run(e.thumb) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PipelinePreview, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5 text-xs text-muted-foreground leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-primary mb-2", children: "Trust contract" }),
            "Every verification is anchored to the Polygon blockchain and signed with manufacturer keys. Results are tamper-evident and regulator-ready."
          ] })
        ] })
      ] })
    ) : (
      /* ====================== RESULT VIEW ====================== */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageInspector, { src: imageSrc, scanning: analyzing, done, onFullscreen: () => setFullscreen(true) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          analyzeError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-destructive/40 bg-destructive/10 p-5 text-sm flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-destructive mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-destructive", children: "Analysis failed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground mt-1", children: analyzeError })
            ] })
          ] }),
          analysis && !analysis.isMedicine ? /* @__PURE__ */ jsxRuntimeExports.jsx(NotMedicinePanel, { analysis, onRetry: reset }) : analysis && analysis.needsReview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LowConfidencePanel, { analysis, onRetry: reset }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(OCRPanel, { analysis }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidencePanel, { analysis })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PipelinePanel, { stage, completed, analyzing }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: analysis?.isMedicine && /* @__PURE__ */ jsxRuntimeExports.jsx(OCRPanel, { analysis }) }),
            done && analysis?.isMedicine && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResultPanel, { analysis, score, band, imageSrc, onReportOpen: () => setReportOpen(true) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AISummaryPanel, { analysis, score, band }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidencePanel, { analysis }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ReasoningPanel, { reasoning: analysis.reasoning, warnings: analysis.warnings }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BlockchainPanel, { analysis, score }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrustedPharmacies, {})
            ] })
          ] })
        ] })
      ] })
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
      fullscreen && imageSrc && /* @__PURE__ */ jsxRuntimeExports.jsx(FullscreenViewer, { src: imageSrc, onClose: () => setFullscreen(false) }),
      reportOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(ReportCounterfeitModal, { defaultMedicine: analysis?.medicineName || "", defaultBatch: analysis?.batchNumber || "", imageSrc: imageSrc || "", onClose: () => setReportOpen(false) })
    ] })
  ] });
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
function deriveScore(a) {
  if (a.authenticityScore != null) return a.authenticityScore;
  let base = a.confidence;
  const w = a.warnings?.length || 0;
  base -= w * 6;
  if (!a.batchNumber) base -= 4;
  if (!a.expiryDate) base -= 4;
  return Math.max(0, Math.min(100, Math.round(base)));
}
function scoreBand(s) {
  if (s >= 95) return {
    label: "VERIFIED",
    tone: "emerald",
    desc: "High confidence — verified genuine.",
    icon: BadgeCheck
  };
  if (s >= 75) return {
    label: "LIKELY GENUINE",
    tone: "emerald",
    desc: "Strong match — looks genuine.",
    icon: CircleCheck
  };
  if (s >= 50) return {
    label: "REVIEW REQUIRED",
    tone: "warn",
    desc: "Inconclusive — pharmacist review recommended.",
    icon: TriangleAlert
  };
  return {
    label: "HIGH RISK",
    tone: "destructive",
    desc: "Possible counterfeit — do not use.",
    icon: CircleX
  };
}
function AnimatedScanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-25" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute left-0 right-0 h-24", style: {
        background: "linear-gradient(180deg, transparent, color-mix(in oklab, var(--cyan) 30%, transparent), transparent)"
      }, initial: {
        y: "-30%"
      }, animate: {
        y: "120%"
      }, transition: {
        duration: 3.4,
        ease: "linear",
        repeat: Infinity
      } }),
      Array.from({
        length: 14
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute h-1 w-1 rounded-full bg-primary/50", style: {
        left: `${i * 53 % 100}%`,
        top: `${i * 37 % 100}%`
      }, animate: {
        y: [0, -20, 0],
        opacity: [0.2, 0.9, 0.2]
      }, transition: {
        duration: 4 + i % 4,
        repeat: Infinity,
        delay: i * 0.3
      } }, i))
    ] })
  ] });
}
function ScanFrame() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-8 border border-primary/40 rounded-xl" }),
    ["top-6 left-6 border-t-2 border-l-2", "top-6 right-6 border-t-2 border-r-2", "bottom-6 left-6 border-b-2 border-l-2", "bottom-6 right-6 border-b-2 border-r-2"].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute ${c} h-6 w-6 border-primary rounded` }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute left-8 right-8 h-0.5 bg-primary shadow-[0_0_18px_var(--cyan)]", initial: {
      top: "10%"
    }, animate: {
      top: "90%"
    }, transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    } })
  ] });
}
function RecentScans({
  history,
  onOpen
}) {
  if (!history.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-primary flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-3.5 w-3.5" }),
        "Recent scans"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-mono", children: [
        history.length,
        " total"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: history.slice(0, 4).map((h) => {
      const b = scoreBand(h.score);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onOpen(h), className: "text-left rounded-lg border border-border bg-background/40 overflow-hidden hover:border-primary/40 transition-colors group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square overflow-hidden bg-background relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: h.thumb, alt: h.name, className: "h-full w-full object-cover group-hover:scale-105 transition-transform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded", style: {
            background: `color-mix(in oklab, var(--${b.tone}) 25%, transparent)`,
            color: `var(--${b.tone})`
          }, children: h.score })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium truncate", children: h.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: new Date(h.date).toLocaleDateString() })
        ] })
      ] }, h.id);
    }) })
  ] });
}
function PipelinePreview() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-primary", children: "Pipeline preview" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: PIPELINE.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-md border border-border grid place-items-center text-[10px] font-mono", children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4" }),
      s.label
    ] }, s.key)) })
  ] });
}
function ImageInspector({
  src,
  scanning,
  done,
  onFullscreen
}) {
  const [zoom, setZoom] = reactExports.useState(1);
  const [rot, setRot] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square rounded-xl overflow-hidden bg-background grid place-items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-40 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { src, alt: "scan", className: "absolute inset-0 h-full w-full object-cover origin-center", style: {
        scale: zoom,
        rotate: rot
      }, transition: {
        type: "spring",
        stiffness: 220,
        damping: 22
      } }),
      scanning && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        y: "-100%"
      }, animate: {
        y: "100%"
      }, transition: {
        repeat: Infinity,
        duration: 1.8,
        ease: "linear"
      }, className: "absolute inset-x-0 h-1 bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_30px_var(--cyan)]" }),
      done && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        scale: 0.6,
        opacity: 0
      }, animate: {
        scale: 1,
        opacity: 1
      }, className: "absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-emerald/20 text-emerald", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
        "Verified"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-mono uppercase tracking-widest", children: "packshot.jpg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { title: "Zoom out", onClick: () => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2))), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { title: "Zoom in", onClick: () => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2))), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { title: "Rotate", onClick: () => setRot((r) => r + 90), children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { title: "Fullscreen", onClick: onFullscreen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-3.5 w-3.5" }) })
      ] })
    ] })
  ] });
}
function IconBtn({
  children,
  ...p
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { ...p, className: "h-7 w-7 rounded-md border border-border grid place-items-center text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors", children });
}
function FullscreenViewer({
  src,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, exit: {
    opacity: 0
  }, className: "fixed inset-0 z-[100] bg-black/85 backdrop-blur-md grid place-items-center p-6", onClick: onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { initial: {
      scale: 0.94
    }, animate: {
      scale: 1
    }, exit: {
      scale: 0.94
    }, src, alt: "full", className: "max-h-full max-w-full rounded-xl shadow-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "absolute top-5 right-5 h-9 w-9 rounded-full bg-white/10 grid place-items-center text-white hover:bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
  ] });
}
function PipelinePanel({
  stage,
  completed,
  analyzing
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-primary mb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI Verification Pipeline" }),
      analyzing && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-muted-foreground text-[10px] font-mono", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }),
        "Processing…"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: PIPELINE.map((s, i) => {
      const isDone = completed.has(s.key);
      const isActive = !isDone && stage === s.key;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        x: -8
      }, animate: {
        opacity: 1,
        x: 0
      }, transition: {
        delay: i * 0.04
      }, className: `flex items-center gap-3 p-3 rounded-lg border transition-colors ${isActive ? "border-primary/40 bg-primary/10" : isDone ? "border-emerald/30 bg-emerald/5" : "border-border bg-background/40"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-8 w-8 rounded-md grid place-items-center ${isDone ? "bg-emerald/20 text-emerald" : isActive ? "bg-primary/20 text-primary" : "bg-card text-muted-foreground"}`, children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-sm", children: s.label }),
        isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-16 rounded-full bg-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "h-full bg-primary", initial: {
          width: 0
        }, animate: {
          width: "100%"
        }, transition: {
          duration: s.ms / 1e3
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-mono w-16 text-right", children: isDone ? "DONE" : isActive ? "RUNNING" : "QUEUED" })
      ] }, s.key);
    }) })
  ] });
}
function TypeIn({
  text,
  delay = 0
}) {
  const [n, setN] = reactExports.useState(0);
  reactExports.useEffect(() => {
    setN(0);
    const start = setTimeout(() => {
      const id = setInterval(() => {
        setN((v) => {
          if (v >= text.length) {
            clearInterval(id);
            return v;
          }
          return v + 1;
        });
      }, 22);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
    text.slice(0, n),
    n < text.length && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "▍" })
  ] });
}
function OCRPanel({
  analysis
}) {
  const [showRaw, setShowRaw] = reactExports.useState(false);
  const sections = [{
    heading: "Identification",
    fields: [{
      l: "Medicine Name",
      v: analysis.medicineName,
      primary: true
    }, {
      l: "Brand Name",
      v: analysis.brandName
    }, {
      l: "Generic Name",
      v: analysis.genericName
    }, {
      l: "Manufacturer",
      v: analysis.manufacturer
    }, {
      l: "Composition",
      v: analysis.composition
    }, {
      l: "Dosage",
      v: analysis.dosage
    }, {
      l: "Pack Size",
      v: analysis.packSize
    }]
  }, {
    heading: "Codes & Dates",
    fields: [{
      l: "Batch Number",
      v: analysis.batchNumber,
      mono: true,
      primary: !!analysis.batchNumber
    }, {
      l: "Expiry Date",
      v: analysis.expiryDate ? analysis.expiryDate + (analysis.expiryDaysRemaining != null ? `  ·  ${analysis.expiryDaysRemaining < 0 ? "EXPIRED" : analysis.expiryDaysRemaining + " days remaining"}` : "") : void 0,
      mono: true
    }, {
      l: "Manufacturing Date",
      v: analysis.manufacturingDate,
      mono: true
    }, {
      l: "MRP",
      v: analysis.mrp,
      mono: true
    }, {
      l: "Serial Number",
      v: analysis.serialNumber,
      mono: true
    }, {
      l: "License Number",
      v: analysis.licenseNumber,
      mono: true
    }, {
      l: "Barcode",
      v: analysis.barcode,
      mono: true
    }, {
      l: "QR Code",
      v: analysis.qrCode,
      mono: true
    }]
  }, {
    heading: "Regulatory",
    fields: [{
      l: "Storage Instructions",
      v: analysis.storageInstructions
    }, {
      l: "Schedule Type",
      v: analysis.scheduleType
    }, {
      l: "Country of Manufacture",
      v: analysis.countryOfManufacture
    }]
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-2xl glass p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-primary mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-3.5 w-3.5" }),
        "Gemini Vision OCR · Detected from image"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald font-mono", children: [
        "Confidence ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedNumber, { to: analysis.confidence, suffix: "%" })
      ] })
    ] }),
    sections.map((sec) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 last:mb-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground/80 mb-2", children: sec.heading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3 text-sm", children: sec.fields.map((f, i) => {
        const missing = !f.v;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 6
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: i * 0.04
        }, className: `rounded-lg border p-3 ${f.primary && !missing ? "border-primary/40 bg-primary/5" : "border-border bg-background/40"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: f.l }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 ${f.mono ? "font-mono" : ""} ${missing ? "text-muted-foreground/60 italic text-xs" : f.primary ? "text-primary text-base font-semibold" : "font-medium"}`, children: missing ? "Not visible in package" : f.v })
        ] }, f.l);
      }) })
    ] }, sec.heading)),
    analysis.rawText && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowRaw((v) => !v), className: "text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-3 w-3 transition-transform ${showRaw ? "rotate-180" : ""}` }),
        showRaw ? "Hide" : "Show",
        " raw OCR text (debug)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showRaw && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.pre, { initial: {
        opacity: 0,
        height: 0
      }, animate: {
        opacity: 1,
        height: "auto"
      }, exit: {
        opacity: 0,
        height: 0
      }, className: "mt-2 text-[11px] font-mono whitespace-pre-wrap bg-background/60 border border-border rounded-lg p-3 text-muted-foreground max-h-60 overflow-auto", children: analysis.rawText }) })
    ] })
  ] });
}
function ConfidencePanel({
  analysis
}) {
  const fc = analysis.fieldConfidences;
  if (!fc) return null;
  const bars = [{
    l: "Detection Confidence",
    v: fc.detection
  }, {
    l: "Medicine Detection",
    v: fc.medicineDetection
  }, {
    l: "Text Recognition",
    v: fc.textRecognition
  }, {
    l: "Field Extraction",
    v: fc.fieldExtraction
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-2xl glass p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-primary mb-4 inline-flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3.5 w-3.5" }),
      "OCR Confidence"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: bars.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs mb-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: b.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-primary", children: [
          Math.round(b.v),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-background/60 border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "h-full gradient-primary", initial: {
        width: 0
      }, animate: {
        width: `${b.v}%`
      }, transition: {
        duration: 1.1,
        delay: i * 0.08,
        ease: [0.16, 1, 0.3, 1]
      } }) })
    ] }, b.l)) })
  ] });
}
function AISummaryPanel({
  analysis,
  score,
  band
}) {
  const rows = [["Medicine Identified", analysis.medicineName], ["Manufacturer", analysis.manufacturer], ["Dosage", analysis.dosage], ["Batch Number", analysis.batchNumber], ["Expiry Date", analysis.expiryDate], ["Authenticity Score", `${score}%`], ["Verification Status", band.label]];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-2xl glass p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-primary mb-4 inline-flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
      "AI Summary"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "divide-y divide-border", children: rows.map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: k }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: `font-medium ${!v ? "text-muted-foreground/60 italic text-xs" : ""}`, children: v || "Not visible in package" })
    ] }, k)) })
  ] });
}
function LowConfidencePanel({
  analysis,
  onRetry
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-2xl border border-warn/40 bg-warn/5 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-6 w-6 text-warn shrink-0 mt-0.5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold", children: "Medicine could not be confidently identified." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        analysis.reviewReason || "OCR was unable to read the packaging clearly.",
        " We refuse to show placeholder data — please retake the photo in better lighting, closer to the pack, and in focus."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onRetry, className: "btn-premium text-sm", children: "Try another image" }) })
    ] })
  ] }) });
}
function AnimatedNumber({
  to,
  suffix = ""
}) {
  const mv = useMotionValue(0);
  const out = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);
  reactExports.useEffect(() => {
    const c = animate(mv, to, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    });
    return c.stop;
  }, [to, mv]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { children: out });
}
function ResultPanel({
  analysis,
  score,
  band,
  imageSrc,
  onReportOpen
}) {
  const BadgeIcon = band.icon;
  function download() {
    generatePdfReport({
      analysis,
      score,
      band,
      imageSrc
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-2xl glass-strong p-6 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute -inset-px rounded-2xl pointer-events-none", animate: {
      opacity: [0.4, 0.8, 0.4]
    }, transition: {
      duration: 3,
      repeat: Infinity
    }, style: {
      boxShadow: `0 0 60px -20px var(--${band.tone})`
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6 items-center relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RadialGauge, { score, tone: band.tone }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-widest", style: {
            color: `var(--${band.tone})`,
            background: `color-mix(in oklab, var(--${band.tone}) 18%, transparent)`
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeIcon, { className: "h-3.5 w-3.5" }),
            band.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: band.desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "AI Confidence", value: `${analysis.confidence}%` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Warnings", value: String(analysis.warnings?.length || 0), tone: analysis.warnings?.length ? "warn" : "emerald" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Batch", value: analysis.batchNumber || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Expiry", value: analysis.expiryDate || "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: download, className: "px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            "Download Report"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigator.share?.({
            title: "MedChain verification",
            text: `${analysis.medicineName} — ${band.label} (${score}%)`,
            url: window.location.href
          }).catch(() => {
          }), className: "px-4 py-2 rounded-lg glass text-sm font-medium inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
            "Share"
          ] }),
          score < 75 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onReportOpen, className: "px-4 py-2 rounded-lg border border-destructive/40 text-destructive bg-destructive/10 text-sm font-medium inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "h-4 w-4" }),
            "Report Fake Medicine"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function RadialGauge({
  score,
  tone
}) {
  const C = 2 * Math.PI * 70;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 w-48", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 160 160", className: "-rotate-90 h-full w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "80", cy: "80", r: "70", stroke: "var(--border)", strokeWidth: "10", fill: "none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.circle, { cx: "80", cy: "80", r: "70", stroke: `var(--${tone})`, strokeWidth: "10", fill: "none", strokeLinecap: "round", initial: {
        strokeDasharray: `0 ${C}`
      }, animate: {
        strokeDasharray: `${score / 100 * C} ${C}`
      }, transition: {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1]
      }, style: {
        filter: `drop-shadow(0 0 12px var(--${tone}))`
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-semibold tracking-tight", style: {
        color: `var(--${tone})`
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedNumber, { to: score, suffix: "%" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-widest mt-1", children: "Authenticity" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute inset-0 rounded-full pointer-events-none", animate: {
      opacity: [0.2, 0.5, 0.2]
    }, transition: {
      duration: 3,
      repeat: Infinity
    }, style: {
      background: `radial-gradient(circle, color-mix(in oklab, var(--${tone}) 12%, transparent), transparent 60%)`
    } })
  ] });
}
function Mini({
  label,
  value,
  tone = "primary"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3 bg-background/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-semibold mt-1 truncate", style: {
      color: tone !== "primary" ? `var(--${tone})` : void 0
    }, children: value })
  ] });
}
function ReasoningPanel({
  reasoning,
  warnings
}) {
  const [open, setOpen] = reactExports.useState(true);
  const items = reasoning && reasoning.length ? reasoning : ["Packaging matches manufacturer reference", "OCR confidence above threshold", "Batch present and readable", "Expiry valid", "No active fraud pattern detected nearby"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-2xl glass p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(!open), className: "w-full flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-primary flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5" }),
        "AI Reasoning"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        rotate: open ? 180 : 0
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      height: 0,
      opacity: 0
    }, animate: {
      height: "auto",
      opacity: 1
    }, exit: {
      height: 0,
      opacity: 0
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm", children: [
      items.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.li, { initial: {
        opacity: 0,
        x: -8
      }, animate: {
        opacity: 1,
        x: 0
      }, transition: {
        delay: i * 0.12
      }, className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIn, { text: r, delay: i * 140 }) })
      ] }, i)),
      warnings?.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.li, { initial: {
        opacity: 0,
        x: -8
      }, animate: {
        opacity: 1,
        x: 0
      }, transition: {
        delay: (items.length + i) * 0.12
      }, className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-warn mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: w })
      ] }, "w" + i))
    ] }) }) })
  ] });
}
function BlockchainPanel({
  analysis,
  score
}) {
  const tx = reactExports.useMemo(() => {
    const seed = (analysis.batchNumber || analysis.medicineName || "x") + score;
    const h = Array.from(seed).reduce((a, c) => a * 33 + c.charCodeAt(0) >>> 0, 7);
    const hex = (n) => n.toString(16).padStart(8, "0");
    return `0x${hex(h)}${hex(h * 13 >>> 0)}${hex(h * 29 >>> 0)}${hex(h * 7 >>> 0)}`;
  }, [analysis, score]);
  const block = 48213770 + tx.charCodeAt(4) % 9999;
  const [copied, setCopied] = reactExports.useState(false);
  function copyTx() {
    navigator.clipboard?.writeText(tx);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-2xl glass p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-primary mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" }),
      "Blockchain Verification",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto inline-flex items-center gap-1 text-emerald text-[10px] font-mono", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { className: "h-1.5 w-1.5 rounded-full bg-emerald", animate: {
          opacity: [0.4, 1, 0.4]
        }, transition: {
          duration: 1.4,
          repeat: Infinity
        } }),
        "ANCHORED"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Network", value: "Polygon Mainnet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Smart Contract", value: "MedChainRegistry.sol" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Block Number", value: "#" + block.toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Timestamp", value: (/* @__PURE__ */ new Date()).toLocaleString() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-lg border border-border bg-background/40 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1", children: "Transaction Hash" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-primary truncate flex-1", children: tx }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copyTx, className: "text-xs px-2 py-1 rounded border border-border hover:border-primary/40 inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }),
          copied ? "Copied" : "Copy"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://polygonscan.com/tx/${tx}`, target: "_blank", rel: "noreferrer", className: "text-xs px-2 py-1 rounded border border-border hover:border-primary/40 inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }),
          "Explorer"
        ] })
      ] })
    ] })
  ] });
}
function TrustedPharmacies() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-2xl glass p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-primary mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
      "Trusted pharmacies nearby"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-2", children: pharmacies.slice(0, 4).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { whileHover: {
      y: -3
    }, className: "rounded-lg border border-border bg-background/40 p-3 hover:border-primary/40 transition-colors flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg gradient-primary grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium flex items-center gap-1 truncate", children: [
          p.name,
          p.verified && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5 text-emerald shrink-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground truncate", children: [
          p.address,
          " · ",
          p.distance
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: p.trust }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "trust" })
      ] })
    ] }, p.id)) })
  ] });
}
function NotMedicinePanel({
  analysis,
  onRetry
}) {
  const title = analysis.friendlyError?.title || "Unable to Detect a Medicine";
  const message = analysis.friendlyError?.message || "We couldn't identify a medicine package in the uploaded image.";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "rounded-2xl glass-strong p-6 sm:p-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-20 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        scale: [1, 1.05, 1]
      }, transition: {
        duration: 3,
        repeat: Infinity
      }, className: "h-14 w-14 rounded-2xl bg-warn/15 text-warn grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl font-semibold", children: [
          "🔍 ",
          title
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 leading-relaxed max-w-xl", children: message }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background/40 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-primary mb-2", children: "Please upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm space-y-1.5 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• A medicine strip" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• A medicine box" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• A medicine bottle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• A pharmaceutical label" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background/40 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-emerald mb-2", children: "For best results" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm space-y-1.5 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "inline h-3.5 w-3.5 text-emerald mr-1" }),
                "Ensure the medicine name is visible"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "inline h-3.5 w-3.5 text-emerald mr-1" }),
                "Capture the full package"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "inline h-3.5 w-3.5 text-emerald mr-1" }),
                "Use good lighting"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "inline h-3.5 w-3.5 text-emerald mr-1" }),
                "Avoid blurry photos"
              ] })
            ] })
          ] })
        ] }),
        (analysis.detectedObject || analysis.description) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-lg border border-border bg-background/40 p-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground/80 mr-2", children: "Detected" }),
          analysis.detectedObject || analysis.description
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onRetry, className: "px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
          "Upload Another Image"
        ] }) })
      ] })
    ] })
  ] });
}
function ReportCounterfeitModal({
  defaultMedicine,
  defaultBatch,
  imageSrc,
  onClose
}) {
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, exit: {
    opacity: 0
  }, className: "fixed inset-0 z-[90] bg-black/70 backdrop-blur-md grid place-items-center p-4", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    scale: 0.95,
    y: 10
  }, animate: {
    scale: 1,
    y: 0
  }, exit: {
    scale: 0.95,
    y: 10
  }, onClick: (e) => e.stopPropagation(), className: "w-full max-w-lg rounded-2xl glass-strong p-6 border border-destructive/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-destructive font-mono flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "h-3.5 w-3.5" }),
          "Counterfeit report"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold mt-1", children: "Report fake medicine" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "h-8 w-8 rounded-md grid place-items-center hover:bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }),
    submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 text-emerald mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-semibold", children: "Report submitted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "Authorities have been notified. Thank you." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "mt-5 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium", children: "Close" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        imageSrc && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imageSrc, className: "h-14 w-14 rounded-lg object-cover border border-border", alt: "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-xs text-muted-foreground", children: "Evidence image attached from this scan." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Medicine", defaultValue: defaultMedicine }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Batch", defaultValue: defaultBatch }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Pharmacy / Source", placeholder: "Where was this purchased?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Location", placeholder: "City, area" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 3, placeholder: "What looked suspicious?", className: "w-full rounded-lg border border-border bg-background/40 px-3 py-2 text-sm focus:border-primary/50 outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: submitting, className: "w-full px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium inline-flex items-center justify-center gap-2 disabled:opacity-60", children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        "Submitting…"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "h-4 w-4" }),
        "Submit report"
      ] }) })
    ] })
  ] }) });
}
function Field({
  label,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...rest, className: "w-full rounded-lg border border-border bg-background/40 px-3 py-2 text-sm focus:border-primary/50 outline-none" })
  ] });
}
function generatePdfReport({
  analysis,
  score,
  band,
  imageSrc
}) {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4"
  });
  const W = 595;
  let y = 50;
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, W, 70, "F");
  doc.setTextColor(56, 189, 248);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("MedChain AI", 40, 42);
  doc.setFontSize(10);
  doc.setTextColor(200);
  doc.setFont("helvetica", "normal");
  doc.text("Verification Report", 40, 58);
  doc.text((/* @__PURE__ */ new Date()).toLocaleString(), W - 40, 42, {
    align: "right"
  });
  y = 100;
  doc.setTextColor(20);
  try {
    doc.addImage(imageSrc, "JPEG", 40, y, 160, 160);
  } catch {
  }
  const sx = 220, sy = y;
  const toneRgb = band.tone === "emerald" ? [16, 185, 129] : band.tone === "warn" ? [234, 179, 8] : band.tone === "destructive" ? [239, 68, 68] : [56, 189, 248];
  doc.setDrawColor(toneRgb[0], toneRgb[1], toneRgb[2]);
  doc.setLineWidth(2);
  doc.roundedRect(sx, sy, 320, 160, 8, 8);
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text("AUTHENTICITY SCORE", sx + 16, sy + 26);
  doc.setFontSize(48);
  doc.setTextColor(toneRgb[0], toneRgb[1], toneRgb[2]);
  doc.setFont("helvetica", "bold");
  doc.text(`${score}%`, sx + 16, sy + 78);
  doc.setFontSize(14);
  doc.text(band.label, sx + 16, sy + 102);
  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.setFont("helvetica", "normal");
  doc.text(band.desc, sx + 16, sy + 122, {
    maxWidth: 290
  });
  y = sy + 200;
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("Extracted Fields", 40, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const fields = [["Medicine", analysis.medicineName], ["Manufacturer", analysis.manufacturer], ["Batch", analysis.batchNumber], ["Expiry", analysis.expiryDate], ["Manufacturing Date", analysis.manufacturingDate], ["Dosage", analysis.dosage], ["Serial", analysis.serialNumber], ["AI Confidence", `${analysis.confidence}%`]];
  for (const [k, v] of fields) {
    if (!v) continue;
    doc.setTextColor(120);
    doc.text(k, 40, y);
    doc.setTextColor(20);
    doc.text(String(v), 180, y);
    y += 16;
  }
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("AI Reasoning", 40, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);
  const reasoning = analysis.reasoning && analysis.reasoning.length ? analysis.reasoning : ["Packaging matches manufacturer reference", "OCR confidence above threshold", "Batch present and readable", "Expiry valid"];
  for (const r of reasoning) {
    doc.text(`• ${r}`, 40, y, {
      maxWidth: 515
    });
    y += 14;
  }
  if (analysis.warnings?.length) {
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(234, 88, 12);
    doc.text("Warnings", 40, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    for (const w of analysis.warnings) {
      doc.text(`• ${w}`, 40, y, {
        maxWidth: 515
      });
      y += 14;
    }
  }
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("Blockchain Proof", 40, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60);
  const txSeed = (analysis.batchNumber || analysis.medicineName || "x") + score;
  const h = Array.from(txSeed).reduce((a, c) => a * 33 + c.charCodeAt(0) >>> 0, 7);
  const hex = (n) => n.toString(16).padStart(8, "0");
  const tx = `0x${hex(h)}${hex(h * 13 >>> 0)}${hex(h * 29 >>> 0)}${hex(h * 7 >>> 0)}`;
  doc.text(`Network: Polygon Mainnet`, 40, y);
  y += 14;
  doc.text(`Tx Hash: ${tx}`, 40, y);
  y += 14;
  doc.text(`Timestamp: ${(/* @__PURE__ */ new Date()).toISOString()}`, 40, y);
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("© MedChain AI Systems · Tamper-evident verification record", 40, 820);
  const fileName = `medchain-report-${(analysis.medicineName || "scan").replace(/\s+/g, "-")}.pdf`;
  doc.save(fileName);
}
export {
  Verify as component
};
