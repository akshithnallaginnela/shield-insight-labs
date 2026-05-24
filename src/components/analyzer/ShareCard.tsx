import { useRef, useState } from "react";
import type { AnalysisResult } from "@/lib/mockAnalyzer";
import { Share2, Download, Check } from "lucide-react";

const LEVEL_COLOR = {
  safe: { bg: "#10b981", label: "Looks Safe" },
  suspicious: { bg: "#f59e0b", label: "Suspicious" },
  critical: { bg: "#ef4444", label: "Critical Danger" },
} as const;

export function ShareCard({ result }: { result: AnalysisResult }) {
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const tone = LEVEL_COLOR[result.level];

  const download = async () => {
    const svg = svgRef.current;
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 1200, 630);
      canvas.toBlob((b) => {
        if (!b) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.download = `scamshield-${result.level}.png`;
        a.click();
        URL.revokeObjectURL(a.href);
      }, "image/png");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const copyText = async () => {
    const text = `⚠️ ScamShield AI flagged this message as ${tone.label.toUpperCase()} (${result.score}% scam probability).\n\nTop red flags: ${
      result.redFlags
        .slice(0, 3)
        .map((f) => f.label)
        .join(", ") || "—"
    }\n\nVerify before you trust: scamshield.ai`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const preview =
    result.originalText.length > 140
      ? result.originalText.slice(0, 140) + "…"
      : result.originalText;

  return (
    <section className="glass-card rounded-xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Share this warning
        </h3>
        <div className="flex gap-2">
          <button
            onClick={copyText}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white/70 px-3 py-1.5 text-xs hover:bg-white"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-safe" />
            ) : (
              <Share2 className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied!" : "Copy text"}
          </button>
          <button
            onClick={download}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-brand px-3 py-1.5 text-xs font-semibold text-white"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <svg
          ref={svgRef}
          viewBox="0 0 1200 630"
          className="block h-auto w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bgg" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#fafbfc" />
              <stop offset="100%" stopColor="#eef2ff" />
            </linearGradient>
            <linearGradient id="brand" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#bgg)" />
          <circle cx="100" cy="80" r="180" fill="#3b82f6" opacity="0.10" />
          <circle cx="1100" cy="560" r="220" fill="#8b5cf6" opacity="0.10" />

          {/* Brand */}
          <g transform="translate(60, 60)">
            <rect width="44" height="44" rx="10" fill="url(#brand)" />
            <text
              x="56"
              y="30"
              fontFamily="Sora, sans-serif"
              fontWeight="700"
              fontSize="24"
              fill="#0f172a"
            >
              ScamShield AI
            </text>
          </g>

          {/* Verdict badge */}
          <g transform="translate(60, 140)">
            <rect width="240" height="44" rx="22" fill={tone.bg} opacity="0.15" />
            <circle cx="22" cy="22" r="8" fill={tone.bg} />
            <text
              x="42"
              y="29"
              fontFamily="Manrope, sans-serif"
              fontWeight="700"
              fontSize="16"
              fill={tone.bg}
            >
              {tone.label.toUpperCase()}
            </text>
          </g>

          {/* Score */}
          <g transform="translate(60, 215)">
            <text fontFamily="Sora, sans-serif" fontWeight="800" fontSize="120" fill="#0f172a">
              {result.score}
              <tspan fontSize="56" fill="#64748b">
                %
              </tspan>
            </text>
            <text y="155" fontFamily="Manrope, sans-serif" fontSize="22" fill="#64748b">
              scam probability
            </text>
          </g>

          {/* Message preview */}
          <g transform="translate(560, 200)">
            <rect width="580" height="200" rx="16" fill="#ffffff" stroke="#e2e8f0" />
            <foreignObject x="20" y="16" width="540" height="168">
              <div
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "18px",
                  lineHeight: 1.5,
                  color: "#334155",
                }}
              >
                "{preview}"
              </div>
            </foreignObject>
          </g>

          {/* Red flag chips */}
          <g transform="translate(60, 470)">
            {result.redFlags.slice(0, 3).map((f, i) => (
              <g key={f.id} transform={`translate(${i * 360}, 0)`}>
                <rect width="340" height="50" rx="10" fill="#ffffff" stroke="#e2e8f0" />
                <circle cx="22" cy="25" r="6" fill={tone.bg} />
                <text
                  x="40"
                  y="32"
                  fontFamily="Manrope, sans-serif"
                  fontWeight="600"
                  fontSize="16"
                  fill="#0f172a"
                >
                  {f.label}
                </text>
              </g>
            ))}
          </g>

          {/* Footer */}
          <text x="60" y="580" fontFamily="Manrope, sans-serif" fontSize="16" fill="#64748b">
            Verify before you trust · scamshield.ai
          </text>
        </svg>
      </div>
    </section>
  );
}
