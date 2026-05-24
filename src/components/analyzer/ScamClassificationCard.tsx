import { Card } from "@/components/ui/card";
import type { ScamClassification } from "@/lib/scamTypes/scamClassifier";

export function ScamClassificationCard({ classification }: { classification: ScamClassification }) {
  const label = classification.primaryType.replace(/_/g, " ");
  const indicators = classification.indicators.slice(0, 4);

  return (
    <Card className="p-5 border-neon/20 bg-neon/5">
      <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-neon">Scam Type Classification</h3>
      <p className="font-semibold text-foreground text-sm">{label.toUpperCase()}</p>
      <p className="text-xs text-muted-foreground mt-1">{classification.explanation}</p>

      <div className="flex items-center gap-2 mt-3">
        <div className="flex-1 bg-background/40 rounded-full h-2">
          <div
            className="bg-neon h-2 rounded-full transition-all"
            style={{ width: `${classification.confidence}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-neon">{classification.confidence}%</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {indicators.length ? (
          indicators.map((indicator, i) => (
            <span key={i} className="px-2 py-0.5 bg-background/60 rounded text-[10px] text-muted-foreground">
              {indicator}
            </span>
          ))
        ) : (
          <span className="text-[10px] text-muted-foreground">No strong indicators detected.</span>
        )}
      </div>
    </Card>
  );
}
