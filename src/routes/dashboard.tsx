import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { motion } from "framer-motion";
import { ScanLine, ShieldCheck, MapPin, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import {
  AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";
import { stats, verificationTrends, riskDistribution, fraudActivity, scanHistory, notifications } from "@/lib/mock";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — MedChain AI" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell>
      <PageHeader title="Operations Dashboard" subtitle="Real-time medicine verification intelligence across your network." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Stat icon={ScanLine} label="Total Scans" value={stats.totalScans.toLocaleString()} delta="+12.4%" color="primary" />
        <Stat icon={ShieldCheck} label="Avg. Authenticity" value={`${stats.avgAuthenticity}%`} delta="+1.2%" color="emerald" />
        <Stat icon={AlertTriangle} label="Nearby Alerts" value={String(stats.nearbyAlerts)} delta="−3" color="warn" />
        <Stat icon={MapPin} label="Trusted Pharmacies" value={String(stats.trustedPharmacies)} delta="+8" color="cyan" />
      </div>

      <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
        <Card title="Verification Trends" subtitle="Last 7 days" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={verificationTrends} margin={{ left: -20, right: 4, top: 8 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--destructive)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--destructive)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={10} tickMargin={4} />
              <YAxis stroke="var(--muted-foreground)" fontSize={10} width={30} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="scans" stroke="var(--cyan)" fill="url(#g1)" strokeWidth={2} />
              <Area type="monotone" dataKey="fraud" stroke="var(--destructive)" fill="url(#g2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Risk Distribution" subtitle="All verifications">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={riskDistribution} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={4}>
                {riskDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
        <Card title="Fraud Activity" subtitle="Monthly reports" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={fraudActivity} margin={{ left: -20, right: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={10} tickMargin={4} />
              <YAxis stroke="var(--muted-foreground)" fontSize={10} width={30} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="reports" fill="var(--cyan)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Latest Alerts" subtitle="Live feed">
          <div className="space-y-3">
            {notifications.slice(0, 4).map((n) => (
              <div key={n.id} className="flex items-start gap-3 text-sm">
                <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                  n.level === "high" ? "bg-destructive" : n.level === "success" ? "bg-emerald" : "bg-primary"
                }`} />
                <div className="min-w-0">
                  <div className="truncate text-xs sm:text-sm">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-4 sm:mt-6">
        <Card title="Recent Verifications">
          <div className="overflow-x-auto -mx-2 sm:-mx-3">
            <table className="w-full text-xs sm:text-sm min-w-[600px]">
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
        </Card>
      </div>
    </AppShell>
  );
}

function Stat({ icon: Icon, label, value, delta, color }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass p-3 sm:p-5">
      <div className="flex items-center justify-between">
        <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg grid place-items-center bg-${color}/15`}>
          <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4`} style={{ color: `var(--${color})` }} />
        </div>
        <div className="text-[10px] sm:text-xs text-emerald flex items-center gap-1"><TrendingUp className="h-3 w-3" />{delta}</div>
      </div>
      <div className="text-lg sm:text-2xl font-semibold mt-3 sm:mt-4">{value}</div>
      <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{label}</div>
    </motion.div>
  );
}

function Card({ title, subtitle, children, className = "" }: any) {
  return (
    <div className={`rounded-2xl glass p-5 ${className}`}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="font-medium">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
        </div>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </div>
      {children}
    </div>
  );
}

export function RiskBadge({ r }: { r: string }) {
  const map: Record<string, string> = {
    Low: "bg-emerald/15 text-emerald",
    Medium: "bg-warn/15 text-warn",
    High: "bg-destructive/15 text-destructive",
  };
  return <span className={`text-[10px] px-2 py-1 rounded-md ${map[r] ?? ""}`}>{r}</span>;
}
