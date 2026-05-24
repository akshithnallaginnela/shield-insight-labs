import type { RedFlag } from "@/lib/mockAnalyzer";
import { Flame, AlertCircle, Info } from "lucide-react";

const SEV = {
  high: { cls: "border-danger/40 bg-danger/10 text-danger", Icon: Flame },
  medium: { cls: "border-warning/40 bg-warning/10 text-warning", Icon: AlertCircle },
  low: { cls: "border-muted-foreground/30 bg-muted/30 text-muted-foreground", Icon: Info },
} as const;

export function RedFlagsList({ flags }: { flags: RedFlag[] }) {
  if (!flags.length) {
    return (
      <div className="glass-card rounded-xl p-5 text-sm text-muted-foreground">
        No specific red flags identified. Stay vigilant — context still matters.
      </div>
    );
  }
  return (
    <div className="space-y-2.5">
      {flags.map((f, i) => {
        const { cls, Icon } = SEV[f.severity];
        return (
          <div
            key={f.id}
            className={`glass-card glass-card-hover rounded-xl border p-4 ${cls} animate-fade-up`}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-current/40 bg-background/30">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{f.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{f.description}</p>
              </div>
              <span className="ml-auto rounded-full border border-current/40 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                {f.severity}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
