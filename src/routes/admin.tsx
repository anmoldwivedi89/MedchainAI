import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Building2, Store, ShieldAlert, Boxes, CheckCircle2, X, Loader2 } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { verificationTrends, blockchainRecords } from "@/lib/mock";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — MedChain AI" }] }),
  component: Page,
});

interface PendingCompany {
  id: string;
  companyName: string;
  email: string;
  registeredAt: string;
}

function Page() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [pendingCompanies, setPendingCompanies] = useState<PendingCompany[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate({ to: "/login" });
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchPendingCompanies();
    }
  }, [isAdmin]);

  async function fetchPendingCompanies() {
    try {
      const { collection, getDocs, query, where } = await import("firebase/firestore");
      const { getFirebaseDb } = await import("@/lib/firebase");
      const db = await getFirebaseDb();
      const q = query(collection(db, "companies"), where("verified", "==", false));
      const snap = await getDocs(q);
      const companies: PendingCompany[] = [];
      snap.forEach((d) => {
        const data = d.data();
        companies.push({
          id: d.id,
          companyName: data.companyName,
          email: data.email,
          registeredAt: data.registeredAt,
        });
      });
      setPendingCompanies(companies);
    } catch (err) {
      console.error("Error fetching companies:", err);
    } finally {
      setLoadingData(false);
    }
  }

  async function approveCompany(companyId: string) {
    try {
      const { doc, updateDoc } = await import("firebase/firestore");
      const { getFirebaseDb } = await import("@/lib/firebase");
      const db = await getFirebaseDb();
      await updateDoc(doc(db, "companies", companyId), { verified: true });
      setPendingCompanies((prev) => prev.filter((c) => c.id !== companyId));
    } catch (err) {
      console.error("Error approving company:", err);
    }
  }

  async function rejectCompany(companyId: string) {
    try {
      const { doc, updateDoc } = await import("firebase/firestore");
      const { getFirebaseDb } = await import("@/lib/firebase");
      const db = await getFirebaseDb();
      await updateDoc(doc(db, "companies", companyId), { verified: false, rejected: true });
      setPendingCompanies((prev) => prev.filter((c) => c.id !== companyId));
    } catch (err) {
      console.error("Error rejecting company:", err);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <AppShell>
      <PageHeader title="Admin Panel" subtitle="Approve companies, monitor fraud, and audit the blockchain layer." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
        {[
          { l: "Pending Companies", v: pendingCompanies.length, i: Building2 },
          { l: "Pending Pharmacies", v: 8, i: Store },
          { l: "Open Fraud Reports", v: 24, i: ShieldAlert },
          { l: "Blockchain Health", v: "OK", i: Boxes },
        ].map((s) => {
          const I = s.i;
          return (
            <div key={s.l} className="rounded-2xl glass p-3 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg gradient-primary grid place-items-center"><I className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground" /></div>
              </div>
              <div className="text-lg sm:text-2xl font-semibold mt-3 sm:mt-4">{s.v}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">{s.l}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-2xl glass p-4 sm:p-5 lg:col-span-2">
          <div className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Verification volume</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={verificationTrends} margin={{ left: -20, right: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={10} />
              <YAxis stroke="var(--muted-foreground)" fontSize={10} width={30} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
              <Line dataKey="scans" stroke="var(--cyan)" strokeWidth={2.5} dot={false} />
              <Line dataKey="fraud" stroke="var(--destructive)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Company Approval Queue */}
        <div className="rounded-2xl glass p-5">
          <div className="font-medium mb-3">Company Approval Queue</div>
          {loadingData ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : pendingCompanies.length === 0 ? (
            <div className="text-sm text-muted-foreground py-8 text-center">No pending approvals</div>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {pendingCompanies.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/40">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{c.companyName}</div>
                    <div className="text-[10px] text-muted-foreground">{c.email}</div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => approveCompany(c.id)}
                      className="h-7 w-7 grid place-items-center rounded-md bg-emerald/15 text-emerald hover:bg-emerald/25 transition-colors"
                      title="Approve"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => rejectCompany(c.id)}
                      className="h-7 w-7 grid place-items-center rounded-md bg-destructive/15 text-destructive hover:bg-destructive/25 transition-colors"
                      title="Reject"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl glass p-4 sm:p-5 lg:col-span-3">
          <div className="font-medium mb-3 text-sm sm:text-base">Blockchain records</div>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-xs sm:text-sm min-w-[550px]">
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
