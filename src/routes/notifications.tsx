import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { notifications } from "@/lib/mock";
import { Bell, CheckCircle2, AlertTriangle, Info } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — MedChain AI" }] }),
  component: Page,
});

const ICON: any = { high: AlertTriangle, success: CheckCircle2, info: Info };
const TONE: any = { high: "destructive", success: "emerald", info: "primary" };

function Page() {
  return (
    <AppShell>
      <PageHeader title="Notifications" subtitle="Real-time alerts from across your network."
        action={<button className="text-xs px-3 py-2 rounded-lg border border-border">Mark all read</button>} />
      <div className="rounded-2xl glass divide-y divide-border">
        {notifications.map((n) => {
          const Icon = ICON[n.level] ?? Bell;
          return (
            <div key={n.id} className="flex items-start gap-4 p-5">
              <div className="h-9 w-9 rounded-lg grid place-items-center shrink-0"
                style={{ background: `color-mix(in oklab, var(--${TONE[n.level]}) 15%, transparent)`, color: `var(--${TONE[n.level]})` }}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{n.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{n.time}</div>
              </div>
              <button className="text-xs text-muted-foreground hover:text-foreground">View</button>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
