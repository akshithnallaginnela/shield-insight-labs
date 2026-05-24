import { useEffect, useState } from "react";
import { Radar, Fingerprint, Brain, Link2 } from "lucide-react";

const STAGES = [
  { label: "Scanning message patterns…", Icon: Radar },
  { label: "Checking phishing indicators…", Icon: Fingerprint },
  { label: "Analyzing emotional manipulation…", Icon: Brain },
  { label: "Cross-referencing known scam domains…", Icon: Link2 },
];

export function ScanningOverlay({ onDone, duration = 2200 }: { onDone: () => void; duration?: number }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const step = duration / STAGES.length;
    const id = setInterval(() => setActive((i) => Math.min(STAGES.length - 1, i + 1)), step);
    const done = setTimeout(onDone, duration);
    return () => {
      clearInterval(id);
      clearTimeout(done);
    };
  }, [duration, onDone]);

  return (
    <div className="glass-card animated-border relative overflow-hidden rounded-2xl p-8">
      <div className="absolute inset-x-0 top-0 h-full overflow-hidden">
        <div className="scan-line animate-scan" />
      </div>
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative grid h-20 w-20 place-items-center rounded-full border border-cyber/40 bg-cyber/10">
          <div className="absolute inset-0 rounded-full border border-cyber/30 animate-ping" />
          <Radar className="h-8 w-8 text-cyber animate-spin-slow" />
        </div>
        <div className="text-center">
          <p className="shimmer-text font-mono text-sm uppercase tracking-[0.25em]">Analyzing</p>
          <p className="mt-2 text-lg font-medium">Running threat analysis pipeline</p>
        </div>
        <ul className="w-full max-w-sm space-y-2">
          {STAGES.map((s, i) => {
            const done = i < active;
            const cur = i === active;
            const Icon = s.Icon;
            return (
              <li
                key={s.label}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-all ${
                  cur ? "border-cyber/40 bg-cyber/5 text-foreground" : done ? "border-safe/30 bg-safe/5 text-muted-foreground" : "border-border/50 text-muted-foreground/60"
                }`}
              >
                <Icon className={`h-4 w-4 ${cur ? "text-cyber animate-pulse" : done ? "text-safe" : ""}`} />
                <span>{s.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
