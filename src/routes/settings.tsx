import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { ShieldCheck, Bell, Lock, User } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — MedChain AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="Settings" subtitle="Manage your profile, security, and notifications." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Section icon={User} title="Profile">
          <Field label="Full name" value="Dr. A. Mehra" />
          <Field label="Email" value="amehra@medchain.ai" />
          <Field label="Role" value="User · Verified" />
        </Section>
        <Section icon={Lock} title="Security">
          <Toggle label="Two-factor authentication" on />
          <Toggle label="Device verification" on />
          <Toggle label="Session timeout (30 min)" />
        </Section>
        <Section icon={Bell} title="Notifications">
          <Toggle label="Fraud alerts near me" on />
          <Toggle label="Verification results" on />
          <Toggle label="Weekly digest" />
        </Section>
        <Section icon={ShieldCheck} title="Blockchain identity" className="sm:col-span-2 lg:col-span-3">
          <div className="rounded-lg border border-border p-3 sm:p-4 bg-background/40 font-mono text-[10px] sm:text-xs text-muted-foreground break-all">0x9f3a2c81bb40e76ad24c81a8810dca09c821</div>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">Your verification activity is anchored to this on-chain identity.</p>
        </Section>
      </div>
    </AppShell>
  );
}

function Section({ icon: Icon, title, children, className = "" }: any) {
  return (
    <div className={`rounded-2xl glass p-4 sm:p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-md gradient-primary grid place-items-center"><Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground" /></div>
        <div className="font-medium text-sm sm:text-base">{title}</div>
      </div>
      <div className="space-y-2.5 sm:space-y-3">{children}</div>
    </div>
  );
}
function Field({ label, value }: any) {
  return (
    <label className="block">
      <span className="text-[10px] sm:text-xs text-muted-foreground">{label}</span>
      <input defaultValue={value} className="mt-1 w-full px-3 py-2 rounded-lg bg-background/40 border border-border text-xs sm:text-sm outline-none focus:border-primary" />
    </label>
  );
}
function Toggle({ label, on = false }: any) {
  return (
    <div className="flex items-center justify-between text-xs sm:text-sm py-1">
      <span>{label}</span>
      <span className={`h-5 w-9 rounded-full relative transition-colors shrink-0 ${on ? "bg-primary" : "bg-muted"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-4" : "left-0.5"}`} />
      </span>
    </div>
  );
}
