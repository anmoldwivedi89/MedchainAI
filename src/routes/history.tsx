import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { scanHistory } from "@/lib/mock";
import { Search, Filter } from "lucide-react";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "Scan History — MedChain AI" }] }),
  component: Page,
});

// Local risk badge (avoid importing from dashboard)
function RiskBadge({ r }: { r: string }) {
  const map: Record<string, string> = {
    Low: "var(--emerald)", Medium: "var(--warn)", High: "var(--destructive)",
  };
  return <span className="text-[10px] px-2 py-1 rounded-md" style={{ background: `color-mix(in oklab, ${map[r]} 15%, transparent)`, color: map[r] }}>{r}</span>;
}

function Page() {
  return (
    <AppShell>
      <PageHeader title="Scan History" subtitle="A complete audit trail of every verification." />
      <div className="rounded-2xl glass p-5">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex-1 min-w-[200px] flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="bg-transparent outline-none flex-1" placeholder="Search by medicine, manufacturer, batch" />
          </div>
          <button className="text-xs px-3 py-2 rounded-lg border border-border inline-flex items-center gap-2"><Filter className="h-3.5 w-3.5" />Filter</button>
          <button className="text-xs px-3 py-2 rounded-lg gradient-primary text-primary-foreground">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="text-left px-3 py-2">ID</th><th className="text-left px-3 py-2">Medicine</th><th className="text-left px-3 py-2">Manufacturer</th><th className="text-left px-3 py-2">Score</th><th className="text-left px-3 py-2">Risk</th><th className="text-left px-3 py-2">Date</th></tr>
            </thead>
            <tbody>
              {scanHistory.map((s) => (
                <tr key={s.id} className="border-t border-border hover:bg-sidebar-accent/40">
                  <td className="px-3 py-3 font-mono text-xs">{s.id}</td>
                  <td className="px-3 py-3">{s.name}</td>
                  <td className="px-3 py-3 text-muted-foreground">{s.manufacturer}</td>
                  <td className="px-3 py-3 font-semibold">{s.score}%</td>
                  <td className="px-3 py-3"><RiskBadge r={s.risk} /></td>
                  <td className="px-3 py-3 text-muted-foreground">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
