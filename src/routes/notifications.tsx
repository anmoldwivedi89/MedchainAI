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
        action={<button className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-2 rounded-lg border border-border">Mark all read</button>} />
      <div className="rounded-2xl glass divide-y divide-border">
        {notifications.map((n) => {
          const Icon = ICON[n.level] ?? Bell;
          return (
            <div key={n.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-5">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg grid place-items-center shrink-0"
                style={{ background: `color-mix(in oklab, var(--${TONE[n.level]}) 15%, transparent)`, color: `var(--${TONE[n.level]})` }}>
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium">{n.title}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{n.time}</div>
              </div>
              <button className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground shrink-0">View</button>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
