import { Card } from "@/components/ui/card";
import type { LinguisticMarker } from "@/lib/psychology/linguisticAnalyzer";

interface Props {
  markers: LinguisticMarker[];
  score: number;
}

const TYPE_STYLE = {
  grammar: "border-danger/30 bg-danger/10 text-danger",
  tone: "border-warning/30 bg-warning/10 text-warning",
  vocabulary: "border-cyber/30 bg-cyber/10 text-cyber",
  structure: "border-muted-foreground/30 bg-muted/30 text-muted-foreground",
} as const;

export function LinguisticBreakdown({ markers, score }: Props) {
  if (!markers.length) return null;

  return (
    <Card className="p-5 border-neon/20 bg-neon/5">
      <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 text-neon">
        📝 Linguistic Markers
      </h3>

      <div className="space-y-3">
        {markers.map((marker, idx) => (
          <div key={`${marker.marker}-${idx}`} className="flex items-start gap-3 text-xs">
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${TYPE_STYLE[marker.type]}`}
            >
              {marker.type}
            </span>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{marker.marker}</p>
              <p className="text-muted-foreground">{marker.explanation}</p>
            </div>
            <div className="flex-shrink-0 font-semibold text-neon">+{marker.riskScore}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Linguistic Score</p>
        <p className="text-lg font-bold text-neon">{Math.round(score)}/100</p>
      </div>
    </Card>
  );
}
