import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Boxes, ExternalLink, CheckCircle2, Activity } from "lucide-react";
import { blockchainRecords } from "@/lib/mock";

export const Route = createFileRoute("/blockchain")({
  head: () => ({ meta: [{ title: "Blockchain Records — MedChain AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="Blockchain Verification" subtitle="Immutable trust records anchored on Polygon." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
        {[
          { l: "Smart Contract", v: "Operational", icon: Activity, tone: "emerald" },
          { l: "Confirmed Records", v: "1,284,902", icon: CheckCircle2, tone: "cyan" },
          { l: "Network", v: "Polygon Mainnet", icon: Boxes, tone: "primary" },
        ].map((s) => {
          const I = s.icon;
          return (
            <div key={s.l} className="rounded-2xl glass p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg grid place-items-center shrink-0" style={{ background: `color-mix(in oklab, var(--${s.tone}) 15%, transparent)`, color: `var(--${s.tone})` }}><I className="h-4 w-4 sm:h-5 sm:w-5" /></div>
              <div className="min-w-0"><div className="text-[10px] sm:text-xs text-muted-foreground">{s.l}</div><div className="text-base sm:text-lg font-semibold truncate">{s.v}</div></div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl glass p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div><div className="font-medium text-sm sm:text-base">Recent Anchored Verifications</div><div className="text-[10px] sm:text-xs text-muted-foreground">Latest blockchain commits</div></div>
          <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-emerald"><span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />Live</div>
        </div>
        <div className="overflow-x-auto -mx-2 sm:-mx-3">
          <table className="w-full text-xs sm:text-sm min-w-[550px]">
            <thead className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="text-left px-2 sm:px-3 py-2">Tx Hash</th><th className="text-left px-2 sm:px-3 py-2">Medicine</th><th className="text-left px-2 sm:px-3 py-2 hidden sm:table-cell">Batch</th><th className="text-left px-2 sm:px-3 py-2">Time</th><th className="text-left px-2 sm:px-3 py-2">Status</th><th className="hidden sm:table-cell"></th></tr>
            </thead>
            <tbody>
              {blockchainRecords.map((r) => (
                <tr key={r.hash} className="border-t border-border hover:bg-sidebar-accent/40">
                  <td className="px-2 sm:px-3 py-2.5 font-mono text-[10px] sm:text-xs text-primary">{r.hash}</td>
                  <td className="px-2 sm:px-3 py-2.5">{r.medicine}</td>
                  <td className="px-2 sm:px-3 py-2.5 font-mono text-[10px] sm:text-xs hidden sm:table-cell">{r.batch}</td>
                  <td className="px-2 sm:px-3 py-2.5 text-muted-foreground">{r.time}</td>
                  <td className="px-2 sm:px-3 py-2.5"><span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-emerald/15 text-emerald inline-flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />{r.status}</span></td>
                  <td className="px-2 sm:px-3 py-2.5 hidden sm:table-cell"><a href="#" className="text-muted-foreground hover:text-foreground"><ExternalLink className="h-3.5 w-3.5" /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
