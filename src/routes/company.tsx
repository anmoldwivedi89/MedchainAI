import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Plus, Upload, Building2 } from "lucide-react";

export const Route = createFileRoute("/company")({
  head: () => ({ meta: [{ title: "Company Portal — MedChain AI" }] }),
  component: Page,
});

const meds = [
  { name: "Paracetamol 500mg", batches: 124, anchored: true },
  { name: "Amoxicillin 250mg", batches: 87, anchored: true },
  { name: "Insulin Glargine", batches: 32, anchored: true },
  { name: "Metformin 850mg", batches: 56, anchored: false },
];

function Page() {
  return (
    <AppShell>
      <PageHeader title="Company Portal" subtitle="Register medicines, anchor batches on-chain, and respond to reports."
        action={<button className="text-xs px-3 py-2 rounded-lg gradient-primary text-primary-foreground inline-flex items-center gap-2"><Plus className="h-3.5 w-3.5" />Add medicine</button>} />
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        {[{ l: "Registered SKUs", v: "248" }, { l: "Anchored batches", v: "14,229" }, { l: "Open reports", v: "12" }].map((s) => (
          <div key={s.l} className="rounded-2xl glass p-5">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className="text-2xl font-semibold mt-2">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl glass p-5">
          <div className="font-medium mb-3">Medicine catalog</div>
          <div className="space-y-2">
            {meds.map((m) => (
              <div key={m.name} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/40">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg gradient-primary grid place-items-center"><Building2 className="h-4 w-4 text-primary-foreground" /></div>
                  <div>
                    <div className="text-sm font-medium">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.batches} batches</div>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-md ${m.anchored ? "bg-emerald/15 text-emerald" : "bg-warn/15 text-warn"}`}>{m.anchored ? "On-chain" : "Pending"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl glass p-5">
          <div className="font-medium mb-3">Upload packaging</div>
          <div className="rounded-xl border-2 border-dashed border-border p-8 text-center bg-background/40">
            <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
            <div className="text-sm mt-2">Drop reference images</div>
            <div className="text-xs text-muted-foreground">Used to train packaging similarity</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
