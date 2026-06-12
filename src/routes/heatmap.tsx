import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Flame, AlertTriangle, MapPin } from "lucide-react";
import { fraudHotspots } from "@/lib/mock";

export const Route = createFileRoute("/heatmap")({
  head: () => ({ meta: [{ title: "Fraud Heatmap — MedChain AI" }] }),
  component: Page,
});

const tone = (r: string) => r === "High" ? "destructive" : r === "Medium" ? "warn" : "emerald";

function Page() {
  return (
    <AppShell>
      <PageHeader title="Fraud Heatmap" subtitle="Geospatial intelligence on counterfeit activity." />
      <div className="grid lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="lg:col-span-2 rounded-2xl glass overflow-hidden">
          <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] grid-bg">
            <div className="absolute inset-0 aurora opacity-40" />
            {fraudHotspots.map((h, i) => {
              const size = h.risk === "High" ? 100 : h.risk === "Medium" ? 70 : 50;
              return (
                <div key={h.city} className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${15 + (i * 13) % 70}%`, left: `${12 + (i * 19) % 78}%` }}>
                  <div className="relative grid place-items-center">
                    <div className="absolute rounded-full animate-ping" style={{
                      width: size, height: size,
                      background: `radial-gradient(circle, color-mix(in oklab, var(--${tone(h.risk)}) 40%, transparent), transparent 70%)`,
                    }} />
                    <div className="absolute rounded-full" style={{
                      width: size, height: size,
                      background: `radial-gradient(circle, color-mix(in oklab, var(--${tone(h.risk)}) 55%, transparent), transparent 70%)`,
                    }} />
                    <div className="relative glass px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium flex items-center gap-1 sm:gap-2">
                      <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />{h.city} <span className="text-muted-foreground hidden sm:inline">· {h.reports}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 glass rounded-lg p-2.5 sm:p-3 text-[10px] sm:text-xs space-y-1 sm:space-y-1.5">
              <div className="font-medium mb-1">Risk legend</div>
              {[["High", "destructive"], ["Medium", "warn"], ["Low", "emerald"]].map(([l, c]) => (
                <div key={l} className="flex items-center gap-2"><div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full" style={{ background: `var(--${c})` }} />{l}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl glass p-4 sm:p-5">
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-primary mb-2 sm:mb-3 flex items-center gap-2"><Flame className="h-3.5 w-3.5" />Top hotspots</div>
            <div className="space-y-2">
              {fraudHotspots.map((h) => (
                <div key={h.city} className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg border border-border bg-background/40">
                  <div className="text-xs sm:text-sm">{h.city}</div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-[10px] sm:text-xs text-muted-foreground">{h.reports}</span>
                    <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md" style={{ background: `color-mix(in oklab, var(--${tone(h.risk)}) 15%, transparent)`, color: `var(--${tone(h.risk)})` }}>{h.risk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl glass p-4 sm:p-5">
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-primary mb-2 sm:mb-3 flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5" />Active alerts</div>
            <div className="text-xs sm:text-sm space-y-2 text-muted-foreground">
              <div>Counterfeit Azithromycin batch <span className="font-mono text-foreground">AZ-7741</span> detected in Mumbai</div>
              <div>Substandard Insulin recall issued in Delhi NCR</div>
              <div>Suspicious packaging cluster — Pune district</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
