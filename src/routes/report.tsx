import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Send, CheckCircle2 } from "lucide-react";
import type { FeedCategory, FeedSeverity } from "@/lib/seedFeed";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a Scam — ScamShield AI" },
      { name: "description", content: "Help protect the community by reporting a scam. Your report appears in the live Threat Feed." },
      { property: "og:title", content: "Report a Scam — ScamShield AI" },
      { property: "og:description", content: "Help protect the community by reporting a scam. Your report appears in the live Threat Feed." },
    ],
  }),
  component: ReportPage,
});

const CATS: FeedCategory[] = ["WhatsApp", "Telegram", "Recruiter", "Banking", "Internship", "SMS"];
const SEVS: FeedSeverity[] = ["low", "medium", "high"];

function ReportPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<FeedCategory>("WhatsApp");
  const [severity, setSeverity] = useState<FeedSeverity>("high");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    // Persist locally so the feed can pick it up later (best-effort).
    try {
      const existing = JSON.parse(localStorage.getItem("scamshield_reports") ?? "[]");
      existing.unshift({ id: crypto.randomUUID(), title, category, severity, description, minutesAgo: 0, reporter: "you" });
      localStorage.setItem("scamshield_reports", JSON.stringify(existing.slice(0, 50)));
    } catch {}
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 pt-20 md:px-6">
        <div className="glass-card animated-border rounded-2xl p-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-safe/15 text-safe">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">Report submitted</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you. Reports like yours help thousands stay safe. Your submission has been added to the local feed.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link to="/feed" className="rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white">View Threat Feed</Link>
            <button
              onClick={() => { setSubmitted(false); setTitle(""); setDescription(""); }}
              className="rounded-lg border border-border bg-white/70 px-4 py-2 text-sm font-medium"
            >Report another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 md:px-6 md:pt-14">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
          <Sparkles className="h-3 w-3" /> Report a Scam
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Help others <span className="text-gradient">stay safe</span>.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Share the scam you encountered. We'll add it to the community feed.
        </p>
      </div>

      <form onSubmit={submit} className="glass-card animated-border mt-8 space-y-5 rounded-2xl p-6 md:p-8">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Short title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            placeholder="e.g. Fake Amazon Recruiter on WhatsApp"
            className="w-full rounded-lg border border-border bg-white/70 px-3 py-2.5 text-sm focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Category</span>
            <div className="flex flex-wrap gap-1.5">
              {CATS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    category === c ? "border-primary/60 bg-primary/15 text-primary" : "border-border bg-white/60 text-muted-foreground hover:text-foreground"
                  }`}
                >{c}</button>
              ))}
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Severity</span>
            <div className="flex gap-1.5">
              {SEVS.map((s) => {
                const sel = severity === s;
                const selCls =
                  s === "high"
                    ? "border-danger/60 bg-danger/10 text-danger"
                    : s === "medium"
                    ? "border-warning/60 bg-warning/10 text-warning"
                    : "border-muted-foreground/60 bg-muted text-foreground";
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSeverity(s)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-xs uppercase tracking-wider transition ${
                      sel ? selCls : "border-border bg-white/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >{s}</button>
                );
              })}
            </div>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            maxLength={500}
            placeholder="What happened? Include the platform, what the scammer asked for, and any red flags you noticed."
            className="w-full resize-none rounded-lg border border-border bg-white/70 p-3 text-sm leading-relaxed focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <p className="mt-1 text-right text-[11px] text-muted-foreground">{description.length}/500</p>
        </label>

        <button
          type="submit"
          disabled={!title.trim() || !description.trim()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" /> Submit report
        </button>
      </form>
    </div>
  );
}
