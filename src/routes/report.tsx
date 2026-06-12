import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Upload, MapPin, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "Report Fake Medicine — MedChain AI" }] }),
  component: Page,
});

function Page() {
  const [sent, setSent] = useState(false);
  return (
    <AppShell>
      <PageHeader title="Report Fake Medicine" subtitle="Help protect your community. Reports are anonymized." />
      {sent ? (
        <div className="rounded-2xl glass-strong p-6 sm:p-10 text-center max-w-xl mx-auto">
          <div className="h-12 w-12 sm:h-14 sm:w-14 mx-auto rounded-2xl bg-emerald/20 text-emerald grid place-items-center"><CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" /></div>
          <h2 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">Report submitted</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">Thank you. Your report will be reviewed within 24 hours.</p>
          <button onClick={() => setSent(false)} className="mt-4 sm:mt-6 px-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-xs sm:text-sm">Submit another</button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="rounded-2xl glass p-4 sm:p-5 space-y-3 sm:space-y-4">
              <F label="Medicine name" placeholder="e.g. Azithromycin 500mg" />
              <F label="Batch number / lot" placeholder="AZ-7741" />
              <T label="Description" placeholder="Describe why you suspect this medicine is counterfeit…" />
              <T label="Additional notes" placeholder="Optional" rows={3} />
            </div>
            <div className="rounded-2xl glass p-4 sm:p-5">
              <label className="text-[10px] sm:text-xs text-muted-foreground">Evidence</label>
              <div className="mt-2 rounded-xl border-2 border-dashed border-border bg-background/40 p-6 sm:p-8 text-center">
                <Upload className="h-5 w-5 sm:h-6 sm:w-6 mx-auto text-muted-foreground" />
                <div className="text-xs sm:text-sm mt-2">Drop photos or documents here</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB</div>
              </div>
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="rounded-2xl glass p-4 sm:p-5 space-y-3">
              <label className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />Location</label>
              <F label="City" placeholder="Bengaluru" />
              <F label="Pin code" placeholder="560001" />
              <div className="rounded-lg border border-border p-2.5 sm:p-3 text-[10px] sm:text-xs text-muted-foreground bg-background/40">Reports are anonymized. Only verified analysts can see your contact details.</div>
            </div>
            <button className="w-full px-4 py-3 rounded-lg gradient-primary text-primary-foreground text-xs sm:text-sm font-medium">Submit report</button>
          </div>
        </form>
      )}
    </AppShell>
  );
}
function F({ label, ...p }: any) {
  return <label className="block"><span className="text-[10px] sm:text-xs text-muted-foreground">{label}</span><input {...p} className="mt-1 w-full px-3 py-2 sm:py-2.5 rounded-lg bg-background/40 border border-border text-xs sm:text-sm outline-none focus:border-primary" /></label>;
}
function T({ label, rows = 4, ...p }: any) {
  return <label className="block"><span className="text-[10px] sm:text-xs text-muted-foreground">{label}</span><textarea rows={rows} {...p} className="mt-1 w-full px-3 py-2 sm:py-2.5 rounded-lg bg-background/40 border border-border text-xs sm:text-sm outline-none focus:border-primary" /></label>;
}
