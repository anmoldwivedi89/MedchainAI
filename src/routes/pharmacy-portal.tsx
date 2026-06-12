import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Store, BadgeCheck, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/pharmacy-portal")({
  head: () => ({ meta: [{ title: "Pharmacy Portal — MedChain AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="Pharmacy Portal" subtitle="Manage your store profile, trust score, and live alerts." />
      <div className="grid lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl glass p-4 sm:p-5 lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl gradient-primary grid place-items-center shrink-0"><Store className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" /></div>
              <div>
                <div className="text-sm sm:text-base font-semibold flex items-center gap-2">Apollo Pharmacy <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald" /></div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">License IN-KA-872211 · Verified Tier 1</div>
              </div>
            </div>
            <div className="sm:ml-auto text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-semibold text-emerald">98</div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground">Trust Score</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
            {[{ l: "Verifications served", v: "12,481" }, { l: "Disputes", v: "0" }, { l: "Avg. response", v: "2.1h" }].map((s) => (
              <div key={s.l} className="rounded-lg border border-border p-2.5 sm:p-3 bg-background/40"><div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div><div className="text-sm sm:text-lg font-semibold mt-0.5 sm:mt-1">{s.v}</div></div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl glass p-4 sm:p-5">
          <div className="font-medium text-sm sm:text-base mb-2 sm:mb-3 flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-warn" />Fraud alerts</div>
          <div className="space-y-2 text-xs sm:text-sm">
            <Alert title="Counterfeit Azithromycin AZ-7741" zone="Mumbai · 12km" />
            <Alert title="Insulin recall — Sanofi batch INS-0921" zone="Delhi NCR" />
            <Alert title="Substandard packaging cluster" zone="Pune" />
          </div>
        </div>
        <div className="rounded-2xl glass p-4 sm:p-5 lg:col-span-3">
          <div className="font-medium text-sm sm:text-base mb-2">Verification request</div>
          <p className="text-xs sm:text-sm text-muted-foreground">Re-verification renews your trust badge for another 90 days.</p>
          <button className="mt-3 sm:mt-4 px-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-xs sm:text-sm">Submit verification request</button>
        </div>
      </div>
    </AppShell>
  );
}
function Alert({ title, zone }: any) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-2.5 sm:p-3">
      <div className="text-xs sm:text-sm">{title}</div>
      <div className="text-[10px] sm:text-xs text-muted-foreground">{zone}</div>
    </div>
  );
}
