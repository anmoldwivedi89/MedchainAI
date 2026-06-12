import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Building2, Store, ShieldAlert, Boxes, CheckCircle2, X } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { verificationTrends, blockchainRecords } from "@/lib/mock";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — MedChain AI" }] }),
  component: Page,
});

const pending = [
  { kind: "Company", name: "Helix Pharma Pvt Ltd", id: "CMP-2241" },
  { kind: "Pharmacy", name: "Greenleaf Medicals", id: "PH-8821" },
  { kind: "Company", name: "Avesta Biosciences", id: "CMP-2242" },
  { kind: "Pharmacy", name: "Cure & Care", id: "PH-8822" },
];

function Page() {
  return (
    <AppShell>
      <PageHeader title="Admin Panel" subtitle="Approve partners, monitor fraud, and audit the blockchain layer." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[
          { l: "Pending Companies", v: 12, i: Building2 },
          { l: "Pending Pharmacies", v: 8, i: Store },
          { l: "Open Fraud Reports", v: 24, i: ShieldAlert },
          { l: "Blockchain Health", v: "OK", i: Boxes },
        ].map((s) => {
          const I = s.i;
          return (
            <div key={s.l} className="rounded-2xl glass p-5">
              <div className="flex items-center justify-between">
                <div className="h-9 w-9 rounded-lg gradient-primary grid place-items-center"><I className="h-4 w-4 text-primary-foreground" /></div>
              </div>
              <div className="text-2xl font-semibold mt-4">{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl glass p-5 lg:col-span-2">
          <div className="font-medium mb-4">Verification volume</div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={verificationTrends} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Line dataKey="scans" stroke="var(--cyan)" strokeWidth={2.5} dot={false} />
              <Line dataKey="fraud" stroke="var(--destructive)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl glass p-5">
          <div className="font-medium mb-3">Approval queue</div>
          <div className="space-y-2">
            {pending.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/40">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground">{p.kind} · {p.id}</div>
                </div>
                <div className="flex gap-1">
                  <button className="h-7 w-7 grid place-items-center rounded-md bg-emerald/15 text-emerald"><CheckCircle2 className="h-3.5 w-3.5" /></button>
                  <button className="h-7 w-7 grid place-items-center rounded-md bg-destructive/15 text-destructive"><X className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl glass p-5 lg:col-span-3">
          <div className="font-medium mb-3">Blockchain records</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-widest text-muted-foreground">
                <tr><th className="text-left px-3 py-2">Tx Hash</th><th className="text-left px-3 py-2">Medicine</th><th className="text-left px-3 py-2">Batch</th><th className="text-left px-3 py-2">Time</th><th className="text-left px-3 py-2">Status</th></tr>
              </thead>
              <tbody>
                {blockchainRecords.map((r) => (
                  <tr key={r.hash} className="border-t border-border">
                    <td className="px-3 py-3 font-mono text-xs text-primary">{r.hash}</td>
                    <td className="px-3 py-3">{r.medicine}</td>
                    <td className="px-3 py-3 font-mono text-xs">{r.batch}</td>
                    <td className="px-3 py-3 text-muted-foreground">{r.time}</td>
                    <td className="px-3 py-3"><span className="text-[10px] px-2 py-1 rounded-md bg-emerald/15 text-emerald">{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
