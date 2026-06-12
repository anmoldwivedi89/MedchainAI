import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MapPin, BadgeCheck, Navigation, Search, Star } from "lucide-react";
import { pharmacies } from "@/lib/mock";

export const Route = createFileRoute("/pharmacies")({
  head: () => ({ meta: [{ title: "Nearby Pharmacies — MedChain AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="Nearby Pharmacies" subtitle="Discover verified pharmacies with live trust scores." />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl glass overflow-hidden">
          <div className="relative h-[460px] grid-bg">
            <div className="absolute inset-0 aurora opacity-50" />
            <div className="absolute inset-0">
              {pharmacies.map((p, i) => (
                <div key={p.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                  style={{ top: `${20 + (i * 11) % 70}%`, left: `${15 + (i * 17) % 75}%` }}>
                  <div className={`h-3 w-3 rounded-full ring-4 ${p.verified ? "bg-emerald ring-emerald/30" : "bg-warn ring-warn/30"} animate-pulse`} />
                  <div className="text-[10px] glass px-2 py-0.5 rounded-md whitespace-nowrap">{p.name}</div>
                </div>
              ))}
            </div>
            <div className="absolute top-4 left-4 right-4 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 rounded-lg glass-strong px-3 py-2 text-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input className="bg-transparent outline-none flex-1 text-sm" placeholder="Search pharmacies near you" />
              </div>
              <button className="px-3 py-2 rounded-lg gradient-primary text-primary-foreground text-xs font-medium inline-flex items-center gap-1.5"><Navigation className="h-3.5 w-3.5" />Locate me</button>
            </div>
            <div className="absolute bottom-4 right-4 text-[10px] glass px-2 py-1 rounded-md text-muted-foreground">© MedChain Maps · Mock</div>
          </div>
        </div>

        <div className="space-y-3">
          {pharmacies.map((p) => (
            <div key={p.id} className="rounded-xl glass p-4 hover:bg-card transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-lg gradient-primary grid place-items-center shrink-0"><MapPin className="h-4 w-4 text-primary-foreground" /></div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium flex items-center gap-1.5 truncate">{p.name}{p.verified && <BadgeCheck className="h-3.5 w-3.5 text-emerald shrink-0" />}</div>
                    <div className="text-xs text-muted-foreground truncate">{p.address}</div>
                    <div className="text-xs text-muted-foreground mt-1">{p.distance} away</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-base font-semibold ${p.trust >= 90 ? "text-emerald" : p.trust >= 75 ? "text-primary" : "text-warn"}`}>{p.trust}</div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end"><Star className="h-3 w-3" />Trust</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 text-xs py-2 rounded-md border border-border hover:bg-sidebar-accent">Directions</button>
                <button className="flex-1 text-xs py-2 rounded-md gradient-primary text-primary-foreground">Visit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
