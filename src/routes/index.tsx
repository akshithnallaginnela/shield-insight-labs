import { createFileRoute } from "@tanstack/react-router";
import { MessageInput } from "@/components/analyzer/MessageInput";
import { ScanEye, Briefcase, Users, Brain, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScamShield AI — Stop Phishing. Verify Before You Trust." },
      { name: "description", content: "AI-powered scam detection for fake recruiters, phishing attacks, suspicious messages, and online fraud." },
      { property: "og:title", content: "ScamShield AI — Stop Phishing. Verify Before You Trust." },
      { property: "og:description", content: "AI-powered scam detection for fake recruiters, phishing attacks, suspicious messages, and online fraud." },
    ],
  }),
  component: LandingPage,
});

const FEATURES = [
  { Icon: ScanEye, title: "Screenshot Analysis", desc: "Upload a screenshot of any message — our vision model extracts and analyzes the text for scam patterns." },
  { Icon: Briefcase, title: "Recruiter Verification", desc: "Validate recruiters against suspicious domains and known fake-HR patterns before you reply." },
  { Icon: Users, title: "Community Threat Feed", desc: "A live feed of reported scams from real users so you can spot active campaigns instantly." },
  { Icon: Brain, title: "Emotional Manipulation Detection", desc: "Identifies urgency, fear, and authority tactics scammers use to bypass rational thinking." },
  { Icon: Globe, title: "Fake Domain Detection", desc: "Flags lookalike domains, suspicious TLDs, and shortened links that hide phishing pages." },
  { Icon: ShieldCheck, title: "Real-time Safe Steps", desc: "Get an actionable checklist tailored to the exact threat in front of you." },
];

function LandingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
      {/* Hero */}
      <section className="relative pt-12 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyber/30 bg-cyber/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyber">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyber shadow-[0_0_8px_var(--cyber)]" />
            AI Threat Engine · v1.0
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Stop Phishing.{" "}
            <span className="text-gradient">Verify Before You Trust.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">
            AI-powered scam detection for fake recruiters, phishing attacks, suspicious messages, and online fraud — built for the messaging-first generation.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <MessageInput />
        </div>

        {/* Trust strip */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 text-center">
          {[
            { k: "10,000+", v: "Scams analyzed" },
            { k: "Real-time", v: "Threat detection" },
            { k: "AI-powered", v: "Analysis engine" },
          ].map((t) => (
            <div key={t.v} className="glass-card rounded-xl p-3 md:p-4">
              <p className="text-sm font-semibold text-foreground md:text-lg">{t.k}</p>
              <p className="text-[11px] text-muted-foreground md:text-xs">{t.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyber">Capabilities</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            A complete cybersecurity layer<br className="hidden md:block" /> for your inbox.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Six engines working in concert to keep you ahead of every scam wave.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="glass-card glass-card-hover group relative overflow-hidden rounded-2xl p-5 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyber/10 blur-2xl transition-all duration-500 group-hover:bg-neon/20" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyber/30 bg-gradient-to-br from-cyber/15 to-neon/15">
                  <f.Icon className="h-5 w-5 text-cyber transition-colors group-hover:text-neon" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="mt-20">
        <div className="glass-card animated-border relative overflow-hidden rounded-2xl p-8 md:p-12">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Don't guess. <span className="text-gradient">Verify.</span>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Run a scan in under 3 seconds. No login. No data stored.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/analyze" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyber to-neon px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_40px_-10px_var(--cyber)]">
                Open Analyzer <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/feed" className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-5 py-2.5 text-sm">
                View Threat Feed
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
