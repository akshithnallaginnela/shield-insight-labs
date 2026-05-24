import { Card } from "@/components/ui/card";
import type { BehavioralAnomaly } from "@/lib/psychology/behavioralAnalyzer";
import { AlertCircle, Flame, Info } from "lucide-react";

interface Props {
  anomalies: BehavioralAnomaly[];
  score: number;
}

const SEVERITY = {
  high: { Icon: Flame, color: "text-danger" },
  medium: { Icon: AlertCircle, color: "text-warning" },
  low: { Icon: Info, color: "text-muted-foreground" },
} as const;

export function BehavioralBreakdown({ anomalies, score }: Props) {
  if (!anomalies.length) return null;

  return (
    <Card className="p-5 border-warning/20 bg-warning/5">
      <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 text-warning">🧭 Behavioral Anomalies</h3>

      <div className="space-y-3">
        {anomalies.map((anomaly, idx) => {
          const { Icon, color } = SEVERITY[anomaly.severity];
          return (
            <div key={`${anomaly.anomaly}-${idx}`} className="flex gap-3 text-xs">
              <div className="flex-shrink-0 mt-0.5">
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{anomaly.anomaly}</p>
                <p className="text-muted-foreground">{anomaly.explanation}</p>
                {anomaly.evidence && (
                  <span className="inline-flex mt-1 px-2 py-0.5 bg-background/60 rounded text-[10px] text-muted-foreground">
                    "{anomaly.evidence}"
                  </span>
                )}
              </div>
              <div className="flex-shrink-0 font-semibold text-warning">
                {anomaly.severity.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Behavior Score</p>
        <p className="text-lg font-bold text-warning">{Math.round(score)}/100</p>
      </div>
    </Card>
  );
}
