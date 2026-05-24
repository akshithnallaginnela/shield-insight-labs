import type { AnalysisResult } from "@/lib/mockAnalyzer";
import { Brain, Sparkles } from "lucide-react";

export function ThreatBreakdown({ result }: { result: AnalysisResult }) {
  return (
    <div className="space-y-5">
      <section className="glass-card rounded-xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyber" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Annotated Message</h3>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
          <HighlightedText result={result} />
        </p>
      </section>

      <section className="glass-card rounded-xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <Brain className="h-4 w-4 text-neon" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">AI Threat Breakdown</h3>
        </div>
        <div className="space-y-3 text-sm text-foreground/85">
          {result.breakdown.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {result.manipulationTactics.length > 0 && (
        <section className="glass-card rounded-xl p-5">
          <div className="mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4 text-neon" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Manipulation Psychology</h3>
          </div>
          <ul className="space-y-3">
            {result.manipulationTactics.map((t) => (
              <li key={t.name} className="rounded-lg border border-neon/20 bg-neon/5 p-3">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.explanation}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function HighlightedText({ result }: { result: AnalysisResult }) {
  const { originalText, highlights } = result;
  if (!originalText) return <span className="text-muted-foreground">No message provided.</span>;
  if (!highlights.length) return <>{originalText}</>;

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  highlights.forEach((h, i) => {
    if (h.start > cursor) parts.push(<span key={`p${i}`}>{originalText.slice(cursor, h.start)}</span>);
    parts.push(
      <mark
        key={`h${i}`}
        title={h.reason}
        className="rounded bg-danger/20 px-1 py-0.5 text-danger underline decoration-danger/60 decoration-wavy underline-offset-4"
      >
        {originalText.slice(h.start, h.end)}
      </mark>
    );
    cursor = h.end;
  });
  if (cursor < originalText.length) parts.push(<span key="tail">{originalText.slice(cursor)}</span>);
  return <>{parts}</>;
}
