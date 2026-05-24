import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { verifyRecruiter, type RecruiterCheck } from "@/lib/mockAnalyzer";
import { ThreatBadge } from "@/components/ui/ThreatBadge";
import { Briefcase, Mail, Linkedin, Check, X, Sparkles } from "lucide-react";

export const Route = createFileRoute("/recruiter")({
  head: () => ({
    meta: [
      { title: "Recruiter Verifier — ScamShield AI" },
      { name: "description", content: "Verify recruiters and job offers against suspicious domain and pattern signals." },
      { property: "og:title", content: "Recruiter Verifier — ScamShield AI" },
      { property: "og:description", content: "Verify recruiters and job offers against suspicious domain and pattern signals." },
    ],
  }),
  component: RecruiterPage,
});

function RecruiterPage() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [result, setResult] = useState<RecruiterCheck | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(verifyRecruiter({ company, email, linkedin }));
      setLoading(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 md:px-6 md:pt-16">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyber/30 bg-cyber/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyber">
          <Sparkles className="h-3 w-3" /> Recruiter Verifier
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
          Is this recruiter <span className="text-gradient">legit</span>?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Run a multi-signal check against known fake-HR patterns, domain reputation, and identity consistency.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="glass-card animated-border relative overflow-hidden rounded-2xl p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Recruiter Details</h2>
          <div className="space-y-4">
            <Field icon={<Briefcase className="h-4 w-4" />} label="Company name">
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Amazon" className={inputCls} />
            </Field>
            <Field icon={<Mail className="h-4 w-4" />} label="Recruiter email">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hr@company.com" className={inputCls} />
            </Field>
            <Field icon={<Linkedin className="h-4 w-4" />} label="LinkedIn profile URL">
              <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/…" className={inputCls} />
            </Field>
            <button
              type="submit"
              disabled={loading || (!company && !email && !linkedin)}
              className="mt-2 w-full rounded-lg bg-gradient-to-r from-cyber to-neon px-5 py-3 text-sm font-semibold text-background shadow-[0_0_40px_-10px_var(--cyber)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Verifying…" : "Run Verification"}
            </button>
          </div>
        </form>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Trust Report</h2>
          {!result && !loading && (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center text-sm text-muted-foreground">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-border/60 bg-background/40">
                <Briefcase className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="mt-3">Fill in the details to generate a trust report.</p>
            </div>
          )}
          {loading && (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded-lg bg-white/5" />
              ))}
            </div>
          )}
          {result && !loading && (
            <div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background/40 p-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Trust Score</p>
                  <p className="mt-1 font-mono text-3xl font-semibold tabular-nums">{result.trustScore}<span className="text-base text-muted-foreground">/100</span></p>
                </div>
                <ThreatBadge level={result.level} />
              </div>
              <ul className="mt-4 space-y-2">
                {result.signals.map((s, i) => (
                  <li key={i} className={`flex items-start gap-3 rounded-lg border p-3 ${s.ok ? "border-safe/30 bg-safe/5" : "border-danger/30 bg-danger/5"}`}>
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${s.ok ? "bg-safe/20 text-safe" : "bg-danger/20 text-danger"}`}>
                      {s.ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-border/60 bg-background/40 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-cyber/60 focus:outline-none focus:ring-2 focus:ring-cyber/30";

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">{icon}{label}</span>
      {children}
    </label>
  );
}
