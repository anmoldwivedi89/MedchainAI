import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { scanHistory } from "@/lib/mock";
import { Search, Filter } from "lucide-react";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "Scan History — MedChain AI" }] }),
  component: Page,
});

function RiskBadge({ r }: { r: string }) {
  const map: Record<string, string> = {
    Low: "var(--emerald)", Medium: "var(--warn)", High: "var(--destructive)",
  };
  return <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md" style={{ background: `color-mix(in oklab, ${map[r]} 15%, transparent)`, color: map[r] }}>{r}</span>;
}

function Page() {
  return (
    <AppShell>
      <PageHeader title="Scan History" subtitle="A complete audit trail of every verification." />
      <div className="rounded-2xl glass p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3 sm:mb-4">
          <div className="flex-1 flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input className="bg-transparent outline-none flex-1 text-xs sm:text-sm min-w-0" placeholder="Search medicine, manufacturer, batch" />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 sm:flex-none text-[10px] sm:text-xs px-3 py-2 rounded-lg border border-border inline-flex items-center justify-center gap-1.5"><Filter className="h-3.5 w-3.5" />Filter</button>
            <button className="flex-1 sm:flex-none text-[10px] sm:text-xs px-3 py-2 rounded-lg gradient-primary text-primary-foreground">Export CSV</button>
          </div>
        </div>
        <div className="overflow-x-auto -mx-1 sm:-mx-2">
          <table className="w-full text-xs sm:text-sm min-w-[550px]">
            <thead className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="text-left px-2 sm:px-3 py-2">ID</th><th className="text-left px-2 sm:px-3 py-2">Medicine</th><th className="text-left px-2 sm:px-3 py-2 hidden sm:table-cell">Manufacturer</th><th className="text-left px-2 sm:px-3 py-2">Score</th><th className="text-left px-2 sm:px-3 py-2">Risk</th><th className="text-left px-2 sm:px-3 py-2 hidden sm:table-cell">Date</th></tr>
            </thead>
            <tbody>
              {scanHistory.map((s) => (
                <tr key={s.id} className="border-t border-border hover:bg-sidebar-accent/40">
                  <td className="px-2 sm:px-3 py-2.5 font-mono text-[10px] sm:text-xs">{s.id}</td>
                  <td className="px-2 sm:px-3 py-2.5">{s.name}</td>
                  <td className="px-2 sm:px-3 py-2.5 text-muted-foreground hidden sm:table-cell">{s.manufacturer}</td>
                  <td className="px-2 sm:px-3 py-2.5 font-semibold">{s.score}%</td>
                  <td className="px-2 sm:px-3 py-2.5"><RiskBadge r={s.risk} /></td>
                  <td className="px-2 sm:px-3 py-2.5 text-muted-foreground hidden sm:table-cell">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
