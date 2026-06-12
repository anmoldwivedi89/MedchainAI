import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — MedChain AI" }] }),
  component: Register,
});

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative">
      <div className="absolute inset-0 aurora opacity-70" />
      <div className="relative w-full max-w-md rounded-2xl glass-strong p-8">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg gradient-primary grid place-items-center"><ShieldCheck className="h-4 w-4 text-primary-foreground" /></div>
          <span className="font-semibold">MedChain AI</span>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground mt-1">Get started in seconds.</p>
        <div className="space-y-4 mt-6">
          <F label="Full name" placeholder="Dr. A. Mehra" />
          <F label="Email" type="email" placeholder="you@hospital.org" />
          <F label="Password" type="password" placeholder="••••••••" />
          <div className="grid grid-cols-4 gap-2">
            {["User", "Company", "Pharmacy", "Admin"].map((r) => (
              <button key={r} className="text-xs py-2 rounded-md border border-border hover:bg-sidebar-accent">{r}</button>
            ))}
          </div>
          <Link to="/dashboard" className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg gradient-primary text-primary-foreground font-medium hover:opacity-90">
            Create account <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-xs text-muted-foreground text-center">Already have one? <Link to="/login" className="text-primary hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

function F({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input {...p} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-card border border-border focus:border-primary outline-none text-sm" />
    </label>
  );
}
