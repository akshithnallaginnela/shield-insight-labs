import { useEffect, useState } from "react";
import type { ThreatLevel } from "@/lib/mockAnalyzer";

const COLORS: Record<ThreatLevel, { stroke: string; glow: string }> = {
  safe: { stroke: "var(--safe)", glow: "color-mix(in oklab, var(--safe) 60%, transparent)" },
  suspicious: {
    stroke: "var(--warning)",
    glow: "color-mix(in oklab, var(--warning) 60%, transparent)",
  },
  critical: {
    stroke: "var(--danger)",
    glow: "color-mix(in oklab, var(--danger) 60%, transparent)",
  },
};

export function ProbabilityGauge({ score, level }: { score: number; level: ThreatLevel }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(score * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const R = 88;
  const C = 2 * Math.PI * R;
  const offset = C - (display / 100) * C;
  const color = COLORS[level];

  return (
    <div className="relative grid place-items-center">
      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        className="drop-shadow-[0_0_30px_var(--cyber)]"
      >
        <defs>
          <linearGradient id="gaugeGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--cyber)" />
            <stop offset="100%" stopColor="var(--neon)" />
          </linearGradient>
        </defs>
        <circle
          cx="110"
          cy="110"
          r={R}
          stroke="color-mix(in oklab, var(--foreground) 8%, transparent)"
          strokeWidth="14"
          fill="none"
        />
        <circle
          cx="110"
          cy="110"
          r={R}
          stroke={color.stroke}
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={C}
          strokeDashoffset={offset}
          transform="rotate(-90 110 110)"
          style={{ transition: "stroke 0.5s ease", filter: `drop-shadow(0 0 14px ${color.glow})` }}
        />
        <circle
          cx="110"
          cy="110"
          r={R - 22}
          stroke="url(#gaugeGrad)"
          strokeOpacity="0.15"
          strokeWidth="1"
          fill="none"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div
            className="font-mono text-5xl font-semibold tabular-nums"
            style={{ color: color.stroke }}
          >
            {display}
            <span className="text-xl text-muted-foreground">%</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Scam Probability
          </div>
        </div>
      </div>
    </div>
  );
}
