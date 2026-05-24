import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link2, Sparkles, ShieldAlert, ShieldCheck, AlertTriangle, Globe, Clock, ArrowRight } from "lucide-react";
import { ThreatBadge } from "@/components/ui/ThreatBadge";
import type { ThreatLevel } from "@/lib/mockAnalyzer";

export const Route = createFileRoute("/link-scanner")({
  head: () => ({
    meta: [
      { title: "Link Scanner — ScamShield AI" },
      { name: "description", content: "Paste a suspicious URL to check domain reputation, redirect chain and phishing signals." },
      { property: "og:title", content: "Link Scanner — ScamShield AI" },
      { property: "og:description", content: "Paste a suspicious URL to check domain reputation, redirect chain and phishing signals." },
    ],
  }),
  component: LinkScannerPage,
});

interface LinkReport {
  url: string;
  domain: string;
  score: number;
  level: ThreatLevel;
  signals: { label: string; ok: boolean; detail: string }[];
  domainAgeDays: number;
  redirectChain: string[];
}

const SUSPICIOUS_TLDS = ["xyz", "top", "click", "work", "monster", "cyou", "loan", "zip", "tk", "ml"];
const SHORTENERS = ["bit.ly", "tinyurl.com", "cutt.ly", "rb.gy", "t.co", "shorturl.at"];

function scanLink(raw: string): LinkReport | null {
  try {
    const url = raw.trim().startsWith("http") ? raw.trim() : `https://${raw.trim()}`;
    const u = new URL(url);
    const domain = u.hostname.replace(/^www\./, "");
    const tld = domain.split(".").pop() ?? "";
    const signals: LinkReport["signals"] = [];
    let score = 20;

    const sus = SUSPICIOUS_TLDS.includes(tld);
    signals.push(
      sus
        ? { label: "Top-level domain", ok: false, detail: `.${tld} is frequently abused by phishing kits.` }
        : { label: "Top-level domain", ok: true, detail: `.${tld} is a common, lower-risk TLD.` }
    );
    if (sus) score += 30;

    const isShort = SHORTENERS.includes(domain);
    signals.push(
      isShort
        ? { label: "URL shortener", ok: false, detail: `${domain} hides the real destination.` }
        : { label: "URL shortener", ok: true, detail: "Not a known link shortener." }
    );
    if (isShort) score += 20;

    const hasNumbers = /\d{3,}/.test(domain);
    signals.push(
      hasNumbers
        ? { label: "Numeric noise in domain", ok: false, detail: "Long digit sequences are typical of generated phishing domains." }
        : { label: "Clean domain string", ok: true, detail: "No suspicious numeric noise detected." }
    );
    if (hasNumbers) score += 12;

    const lookalike = /(g[o0]{2}gle|amaz[o0]n|payp[a4]l|micr[o0]s[o0]ft|netfllx|faceb[o0]{2}k)/i.test(domain);
    if (lookalike) {
      signals.push({ label: "Lookalike brand", ok: false, detail: "Domain mimics a well-known brand using character substitution." });
      score += 30;
    } else {
      signals.push({ label: "No brand impersonation", ok: true, detail: "Domain doesn't mimic a known brand." });
    }

    const httpOnly = u.protocol === "http:";
    signals.push(
      httpOnly
        ? { label: "HTTPS", ok: false, detail: "Site is not served over HTTPS." }
        : { label: "HTTPS", ok: true, detail: "Encrypted connection (HTTPS)." }
    );
    if (httpOnly) score += 10;

    score = Math.min(100, score);
    const level: ThreatLevel = score >= 65 ? "critical" : score >= 35 ? "suspicious" : "safe";

    // Mock additional intel
    const domainAgeDays = Math.max(1, Math.floor(((sus || isShort) ? 12 : 1400) * (0.7 + Math.random() * 0.6)));
    const redirectChain = isShort
      ? [domain, `tracker.${domain.split(".")[0]}.net`, `final-${tld === "xyz" ? "phish" : "site"}.com`]
      : [domain];

    return { url, domain, score, level, signals, domainAgeDays, redirectChain };
  } catch {
    return null;
  }
}

function LinkScannerPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<LinkReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = () => {
    setError(null);
    setReport(null);
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const r = scanLink(input);
      if (!r) setError("That doesn't look like a valid URL. Try something like example.com");
      setReport(r);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 md:px-6 md:pt-14">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
          <Sparkles className="h-3 w-3" /> Link Scanner
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
          Check any URL before you <span className="text-gradient">click</span>.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Paste a suspicious link to inspect its domain, TLD, redirect chain and phishing signals.
        </p>
      </div>

      <div className="glass-card animated-border mx-auto mt-8 max-w-2xl rounded-2xl p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="paste a link e.g. http://hdfc-rewards.top/login"
              className="w-full rounded-lg border border-border bg-white/70 py-3 pl-9 pr-3 text-sm focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={run}
            disabled={loading || !input.trim()}
            className="rounded-lg bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Scanning…" : "Scan URL"}
          </button>
        </div>
        {error && <p className="mt-3 text-xs text-danger">{error}</p>}
      </div>

      {loading && (
        <div className="mx-auto mt-6 max-w-2xl space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-white/60" />
          ))}
        </div>
      )}

      {report && !loading && (
        <div className="mx-auto mt-8 grid max-w-4xl gap-5 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
          <div className="glass-card rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Risk Score</p>
            <p className="mt-1 font-mono text-4xl font-semibold tabular-nums text-foreground">
              {report.score}<span className="text-base text-muted-foreground">/100</span>
            </p>
            <div className="mt-3"><ThreatBadge level={report.level} /></div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-start gap-2"><Globe className="mt-0.5 h-4 w-4 text-primary" /><div><p className="text-xs uppercase tracking-wider text-muted-foreground">Domain</p><p className="font-mono text-foreground break-all">{report.domain}</p></div></div>
              <div className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 text-primary" /><div><p className="text-xs uppercase tracking-wider text-muted-foreground">Domain age</p><p className="text-foreground">{report.domainAgeDays} days <span className="text-xs text-muted-foreground">{report.domainAgeDays < 90 ? "(very new — high risk)" : "(established)"}</span></p></div></div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass-card rounded-2xl p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Signals</h3>
              <ul className="space-y-2">
                {report.signals.map((s, i) => (
                  <li key={i} className={`flex items-start gap-3 rounded-lg border p-3 ${s.ok ? "border-safe/30 bg-safe/5" : "border-danger/30 bg-danger/5"}`}>
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${s.ok ? "bg-safe/20 text-safe" : "bg-danger/20 text-danger"}`}>
                      {s.ok ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-warning" /> Redirect Chain
              </h3>
              <ol className="space-y-2">
                {report.redirectChain.map((hop, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-lg border border-border bg-white/60 p-2.5">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 font-mono text-xs text-primary">{i + 1}</span>
                    <span className="font-mono text-sm text-foreground break-all">{hop}</span>
                    {i < report.redirectChain.length - 1 && <ArrowRight className="ml-auto h-3 w-3 text-muted-foreground" />}
                  </li>
                ))}
              </ol>
              {report.redirectChain.length === 1 && (
                <p className="mt-2 text-xs text-muted-foreground">Direct link — no redirects detected.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
