import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { FeedItem } from "@/lib/seedFeed";
import { FEED, type FeedCategory } from "@/lib/seedFeed";
import { Search, Radio, AlertTriangle, ShieldAlert, Info } from "lucide-react";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Community Threat Feed — ScamShield AI" },
      { name: "description", content: "Live feed of user-reported scams across WhatsApp, Telegram, SMS, banking and recruiter channels." },
      { property: "og:title", content: "Community Threat Feed — ScamShield AI" },
      { property: "og:description", content: "Live feed of user-reported scams across WhatsApp, Telegram, SMS, banking and recruiter channels." },
    ],
  }),
  component: FeedPage,
});

const CATS: FeedCategory[] = ["WhatsApp", "Telegram", "Recruiter", "Banking", "Internship", "SMS"];

const SEV_STYLE = {
  high: { dot: "bg-danger shadow-[0_0_12px_var(--danger)]", cls: "text-danger", Icon: ShieldAlert },
  medium: { dot: "bg-warning shadow-[0_0_12px_var(--warning)]", cls: "text-warning", Icon: AlertTriangle },
  low: { dot: "bg-muted-foreground", cls: "text-muted-foreground", Icon: Info },
} as const;

function FeedPage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<FeedCategory | "All">("All");

  const items = useMemo(() => {
    return FEED.filter((i) => (active === "All" ? true : i.category === active)).filter((i) =>
      q ? (i.title + i.description + i.category).toLowerCase().includes(q.toLowerCase()) : true
    );
  }, [q, active]);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-10 md:px-6 md:pt-14">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyber/30 bg-cyber/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyber">
            <Radio className="h-3 w-3 animate-pulse" /> Live · {FEED.length} reports
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Community Threat Feed</h1>
          <p className="mt-1 text-sm text-muted-foreground">User-reported scams in the wild — updated continuously.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search scams…"
            className="w-full rounded-lg border border-border/60 bg-background/40 py-2.5 pl-9 pr-3 text-sm focus:border-cyber/60 focus:outline-none focus:ring-2 focus:ring-cyber/30"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(["All", ...CATS] as const).map((c) => {
          const sel = active === c;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                sel
                  ? "border-cyber/60 bg-cyber/15 text-foreground shadow-[0_0_24px_-6px_var(--cyber)]"
                  : "border-border/60 bg-background/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 && (
          <div className="glass-card grid place-items-center rounded-2xl p-12 text-center text-sm text-muted-foreground">
            <Search className="mb-3 h-6 w-6 text-muted-foreground" />
            No reports match your search.
          </div>
        )}
        {items.map((i, idx) => {
          const sev = SEV_STYLE[i.severity];
          return (
            <article
              key={i.id}
              className="glass-card glass-card-hover relative overflow-hidden rounded-xl p-4 animate-fade-up md:p-5"
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${sev.dot}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground md:text-base">{i.title}</h3>
                    <span className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {i.category}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider ${sev.cls}`}>
                      <sev.Icon className="h-3 w-3" /> {i.severity}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{i.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground/80">
                    <span>by {i.reporter}</span>
                    <span>·</span>
                    <span>{formatAgo(i.minutesAgo)}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function formatAgo(min: number) {
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
