import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { loadScanHistory, type ScanRecord } from "@/lib/scan-history";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Filter, ScanLine } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "Scan History — MedChain AI" }] }),
  component: Page,
});

function RiskBadge({ r }: { r: string }) {
  const map: Record<string, string> = {
    Low: "var(--emerald)", Medium: "var(--warn)", High: "var(--destructive)", Critical: "var(--destructive)",
  };
  const color = map[r] || "var(--muted-foreground)";
  return <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md" style={{ background: `color-mix(in oklab, ${color} 15%, transparent)`, color }}>{r}</span>;
}

function Page() {
  const { user } = useAuth();
  const [records, setRecords] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    loadScanHistory(user?.uid).then((data) => {
      setRecords(data);
      setLoading(false);
    });
  }, [user?.uid]);

  const filtered = search
    ? records.filter(
        (r) =>
          r.medicineName.toLowerCase().includes(search.toLowerCase()) ||
          r.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
          r.verificationId.toLowerCase().includes(search.toLowerCase()),
      )
    : records;

  return (
    <AppShell>
      <PageHeader title="Scan History" subtitle="A complete audit trail of every verification." />
      <div className="rounded-2xl glass p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3 sm:mb-4">
          <div className="flex-1 flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              className="bg-transparent outline-none flex-1 text-xs sm:text-sm min-w-0"
              placeholder="Search medicine, manufacturer, ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 sm:flex-none text-[10px] sm:text-xs px-3 py-2 rounded-lg border border-border inline-flex items-center justify-center gap-1.5"><Filter className="h-3.5 w-3.5" />Filter</button>
            <button className="flex-1 sm:flex-none text-[10px] sm:text-xs px-3 py-2 rounded-lg gradient-primary text-primary-foreground">Export CSV</button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground text-sm">Loading scan history…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <ScanLine className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
            <div className="text-sm text-muted-foreground">
              {search ? "No scans match your search." : "No verification history yet. Scan a medicine to get started."}
            </div>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto -mx-1 sm:-mx-2">
              <table className="w-full text-xs sm:text-sm min-w-[550px]">
                <thead className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="text-left px-2 sm:px-3 py-2">ID</th>
                    <th className="text-left px-2 sm:px-3 py-2">Medicine</th>
                    <th className="text-left px-2 sm:px-3 py-2">Manufacturer</th>
                    <th className="text-left px-2 sm:px-3 py-2">Score</th>
                    <th className="text-left px-2 sm:px-3 py-2">Risk</th>
                    <th className="text-left px-2 sm:px-3 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.verificationId} className="border-t border-border hover:bg-sidebar-accent/40">
                      <td className="px-2 sm:px-3 py-2.5 font-mono text-[10px] sm:text-xs">{s.verificationId}</td>
                      <td className="px-2 sm:px-3 py-2.5">{s.medicineName}</td>
                      <td className="px-2 sm:px-3 py-2.5 text-muted-foreground">{s.manufacturer || "—"}</td>
                      <td className="px-2 sm:px-3 py-2.5 font-semibold">{s.authenticityScore}%</td>
                      <td className="px-2 sm:px-3 py-2.5"><RiskBadge r={s.riskLevel || "—"} /></td>
                      <td className="px-2 sm:px-3 py-2.5 text-muted-foreground">{new Date(s.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card layout */}
            <div className="sm:hidden space-y-2">
              {filtered.map((s) => (
                <div key={s.verificationId} className="rounded-lg border border-border bg-background/40 p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium truncate flex-1 mr-2">{s.medicineName}</span>
                    <RiskBadge r={s.riskLevel || "—"} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{s.manufacturer || "Unknown"}</span>
                    <span className="font-semibold text-foreground">{s.authenticityScore}%</span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground font-mono">
                    <span>{s.verificationId}</span>
                    <span>{new Date(s.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
