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
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        {[
          { l: "Smart Contract", v: "Operational", icon: Activity, tone: "emerald" },
          { l: "Confirmed Records", v: "1,284,902", icon: CheckCircle2, tone: "cyan" },
          { l: "Network", v: "Polygon Mainnet", icon: Boxes, tone: "primary" },
        ].map((s) => {
          const I = s.icon;
          return (
            <div key={s.l} className="rounded-2xl glass p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg grid place-items-center" style={{ background: `color-mix(in oklab, var(--${s.tone}) 15%, transparent)`, color: `var(--${s.tone})` }}><I className="h-5 w-5" /></div>
              <div><div className="text-xs text-muted-foreground">{s.l}</div><div className="text-lg font-semibold">{s.v}</div></div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl glass p-5">
        <div className="flex items-center justify-between mb-4">
          <div><div className="font-medium">Recent Anchored Verifications</div><div className="text-xs text-muted-foreground">Latest blockchain commits</div></div>
          <div className="inline-flex items-center gap-1 text-xs text-emerald"><span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />Live</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="text-left px-3 py-2">Tx Hash</th><th className="text-left px-3 py-2">Medicine</th><th className="text-left px-3 py-2">Batch</th><th className="text-left px-3 py-2">Time</th><th className="text-left px-3 py-2">Status</th><th></th></tr>
            </thead>
            <tbody>
              {blockchainRecords.map((r) => (
                <tr key={r.hash} className="border-t border-border hover:bg-sidebar-accent/40">
                  <td className="px-3 py-3 font-mono text-xs text-primary">{r.hash}</td>
                  <td className="px-3 py-3">{r.medicine}</td>
                  <td className="px-3 py-3 font-mono text-xs">{r.batch}</td>
                  <td className="px-3 py-3 text-muted-foreground">{r.time}</td>
                  <td className="px-3 py-3"><span className="text-[10px] px-2 py-1 rounded-md bg-emerald/15 text-emerald inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" />{r.status}</span></td>
                  <td className="px-3 py-3"><a href="#" className="text-muted-foreground hover:text-foreground"><ExternalLink className="h-4 w-4" /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
