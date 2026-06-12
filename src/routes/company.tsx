import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Plus, Upload, Building2, UserPlus, Shield, Loader2, AlertTriangle, Mail, Phone, MapPin, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/company")({
  head: () => ({ meta: [{ title: "Company Portal — MedChain AI" }] }),
  component: Page,
});

interface BPO {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  addedAt: string;
}

function Page() {
  const { user, role, companyProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bpoList, setBpoList] = useState<BPO[]>([]);
  const [loadingBPOs, setLoadingBPOs] = useState(true);
  const [showAddBPO, setShowAddBPO] = useState(false);
  const [bpoForm, setBpoForm] = useState({ name: "", email: "", phone: "", region: "" });
  const [addingBPO, setAddingBPO] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || role !== "company")) {
      navigate({ to: "/login" });
    }
  }, [user, role, authLoading, navigate]);

  useEffect(() => {
    if (user && role === "company") {
      fetchBPOs();
    }
  }, [user, role]);

  async function fetchBPOs() {
    try {
      const { collection, getDocs, query, where } = await import("firebase/firestore");
      const { getFirebaseDb } = await import("@/lib/firebase");
      const db = await getFirebaseDb();
      const q = query(collection(db, "bpo_officers"), where("companyId", "==", user!.uid));
      const snap = await getDocs(q);
      const officers: BPO[] = [];
      snap.forEach((d) => {
        const data = d.data();
        officers.push({
          id: d.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          region: data.region,
          addedAt: data.addedAt,
        });
      });
      setBpoList(officers);
    } catch (err) {
      console.error("Error fetching BPOs:", err);
    } finally {
      setLoadingBPOs(false);
    }
  }

  async function addBPO(e: React.FormEvent) {
    e.preventDefault();
    if (!bpoForm.name || !bpoForm.email || !bpoForm.region) return;
    setAddingBPO(true);
    try {
      const { collection, addDoc } = await import("firebase/firestore");
      const { getFirebaseDb } = await import("@/lib/firebase");
      const db = await getFirebaseDb();
      const docRef = await addDoc(collection(db, "bpo_officers"), {
        ...bpoForm,
        companyId: user!.uid,
        addedAt: new Date().toISOString(),
      });
      setBpoList((prev) => [...prev, { ...bpoForm, id: docRef.id, addedAt: new Date().toISOString() }]);
      setBpoForm({ name: "", email: "", phone: "", region: "" });
      setShowAddBPO(false);
    } catch (err) {
      console.error("Error adding BPO:", err);
    } finally {
      setAddingBPO(false);
    }
  }

  async function removeBPO(bpoId: string) {
    try {
      const { doc, deleteDoc } = await import("firebase/firestore");
      const { getFirebaseDb } = await import("@/lib/firebase");
      const db = await getFirebaseDb();
      await deleteDoc(doc(db, "bpo_officers", bpoId));
      setBpoList((prev) => prev.filter((b) => b.id !== bpoId));
    } catch (err) {
      console.error("Error removing BPO:", err);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || role !== "company") return null;

  // Company not verified yet — show pending screen
  if (companyProfile && !companyProfile.verified) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="h-16 w-16 rounded-2xl bg-warn/15 grid place-items-center mb-4">
            <AlertTriangle className="h-8 w-8 text-warn" />
          </div>
          <h2 className="text-2xl font-semibold">Verification Pending</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            Your company "<span className="font-medium text-foreground">{companyProfile.companyName}</span>" is under review by our admin team. You'll get access once approved.
          </p>
          <div className="mt-6 text-xs text-muted-foreground px-4 py-2 rounded-lg glass">
            Submitted on {new Date(companyProfile.registeredAt).toLocaleDateString()}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        title="Company Dashboard"
        subtitle="Manage your medicines, batches, and brand protection officers."
        action={
          <button
            onClick={() => setShowAddBPO(true)}
            className="text-xs px-3 py-2 rounded-lg gradient-primary text-primary-foreground inline-flex items-center gap-2"
          >
            <UserPlus className="h-3.5 w-3.5" /> Add BPO
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
        {[
          { l: "Registered SKUs", v: "248" },
          { l: "Anchored Batches", v: "14,229" },
          { l: "BPO Officers", v: bpoList.length },
          { l: "Open Reports", v: "12" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl glass p-3 sm:p-5">
            <div className="text-[10px] sm:text-xs text-muted-foreground">{s.l}</div>
            <div className="text-lg sm:text-2xl font-semibold mt-1.5 sm:mt-2">{s.v}</div>
          </div>
        ))}
      </div>

      {/* BPO Section */}
      <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
        <div className="lg:col-span-2 rounded-2xl glass p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Brand Protection Officers
            </div>
            <span className="text-xs text-muted-foreground">{bpoList.length} active</span>
          </div>

          {loadingBPOs ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : bpoList.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
              <div className="text-sm text-muted-foreground">No brand protection officers added yet</div>
              <button
                onClick={() => setShowAddBPO(true)}
                className="mt-3 text-xs px-3 py-2 rounded-lg border border-border hover:bg-sidebar-accent transition-colors inline-flex items-center gap-2"
              >
                <UserPlus className="h-3.5 w-3.5" /> Add your first BPO
              </button>
            </div>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {bpoList.map((bpo) => (
                <div key={bpo.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/40">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 grid place-items-center">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{bpo.name}</div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                        <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{bpo.email}</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{bpo.region}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeBPO(bpo.id)}
                    className="h-7 w-7 grid place-items-center rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                    title="Remove BPO"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload packaging */}
        <div className="rounded-2xl glass p-5">
          <div className="font-medium mb-3">Upload Packaging</div>
          <div className="rounded-xl border-2 border-dashed border-border p-8 text-center bg-background/40">
            <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
            <div className="text-sm mt-2">Drop reference images</div>
            <div className="text-xs text-muted-foreground">Used to train packaging similarity AI</div>
          </div>
        </div>
      </div>

      {/* Medicine Catalog */}
      <div className="rounded-2xl glass p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">Medicine Catalog</div>
          <button className="text-xs px-3 py-2 rounded-lg border border-border hover:bg-sidebar-accent inline-flex items-center gap-2">
            <Plus className="h-3.5 w-3.5" /> Add Medicine
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: "Paracetamol 500mg", batches: 124, anchored: true },
            { name: "Amoxicillin 250mg", batches: 87, anchored: true },
            { name: "Insulin Glargine", batches: 32, anchored: true },
            { name: "Metformin 850mg", batches: 56, anchored: false },
          ].map((m) => (
            <div key={m.name} className="p-3 rounded-lg border border-border bg-background/40">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium truncate">{m.name}</span>
              </div>
              <div className="text-xs text-muted-foreground">{m.batches} batches</div>
              <span className={`mt-2 inline-block text-[10px] px-2 py-1 rounded-md ${m.anchored ? "bg-emerald/15 text-emerald" : "bg-warn/15 text-warn"}`}>
                {m.anchored ? "On-chain" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add BPO Modal */}
      {showAddBPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl glass-strong p-6 shadow-elev-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Add Brand Protection Officer
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              BPOs help detect counterfeit medicines in the market on your behalf.
            </p>
            <form onSubmit={addBPO} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Full Name *</label>
                <input
                  type="text"
                  value={bpoForm.name}
                  onChange={(e) => setBpoForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-border bg-card/60 px-3 py-2 text-sm outline-none focus:border-primary/60"
                  placeholder="Rajesh Kumar"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Email *</label>
                <input
                  type="email"
                  value={bpoForm.email}
                  onChange={(e) => setBpoForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-border bg-card/60 px-3 py-2 text-sm outline-none focus:border-primary/60"
                  placeholder="rajesh@company.com"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Phone</label>
                <input
                  type="tel"
                  value={bpoForm.phone}
                  onChange={(e) => setBpoForm((f) => ({ ...f, phone: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-border bg-card/60 px-3 py-2 text-sm outline-none focus:border-primary/60"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Region / Territory *</label>
                <input
                  type="text"
                  value={bpoForm.region}
                  onChange={(e) => setBpoForm((f) => ({ ...f, region: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-border bg-card/60 px-3 py-2 text-sm outline-none focus:border-primary/60"
                  placeholder="Delhi NCR / Maharashtra / South India"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBPO(false)}
                  className="flex-1 py-2.5 rounded-lg border border-border text-sm hover:bg-sidebar-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingBPO}
                  className="flex-1 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium inline-flex items-center justify-center gap-2"
                >
                  {addingBPO ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  {addingBPO ? "Adding..." : "Add Officer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
