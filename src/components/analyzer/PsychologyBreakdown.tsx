import { Card } from "@/components/ui/card";
import type { PsychologicalTactic } from "@/lib/psychology/manipulationAnalyzer";
import { AlertCircle, Flame, Info } from "lucide-react";

interface Props {
  tactics: PsychologicalTactic[];
  score: number;
}

const SEVERITY = {
  high: { Icon: Flame, color: "text-danger" },
  medium: { Icon: AlertCircle, color: "text-warning" },
  low: { Icon: Info, color: "text-muted-foreground" },
} as const;

export function PsychologyBreakdown({ tactics, score }: Props) {
  if (!tactics.length) return null;

  return (
    <Card className="p-5 border-cyber/20 bg-gradient-to-br from-cyber/5 to-neon/5">
      <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 text-cyber">🧠 Psychological Tactics Detected</h3>

      <div className="space-y-3">
        {tactics.map((tactic, idx) => {
          const { Icon, color } = SEVERITY[tactic.severity];
          return (
            <div key={`${tactic.tactic}-${idx}`} className="flex gap-3 text-xs">
              <div className="flex-shrink-0 mt-0.5">
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{tactic.tactic}</p>
                <p className="text-muted-foreground">{tactic.explanation}</p>
                <div className="flex gap-1 flex-wrap mt-1">
                  {tactic.evidence.slice(0, 2).map((e, i) => (
                    <span key={i} className="px-2 py-0.5 bg-background/60 rounded text-[10px] text-muted-foreground">
                      "{e}"
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 font-semibold text-cyber">+{tactic.score}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Psychology Score</p>
        <p className="text-lg font-bold text-cyber">{Math.round(score)}/100</p>
      </div>
    </Card>
  );
}
