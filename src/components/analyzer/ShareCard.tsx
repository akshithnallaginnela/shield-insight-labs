import { useRef, useState, useMemo } from "react";
import type { AnalysisResult } from "@/lib/mockAnalyzer";
import { Share2, Download, Check, Link2, Pencil, Quote } from "lucide-react";

const LEVEL_COLOR = {
  safe: { bg: "#10b981", label: "Looks Safe" },
  suspicious: { bg: "#f59e0b", label: "Suspicious" },
  critical: { bg: "#ef4444", label: "Critical Danger" },
} as const;

const SEV_DOT = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#64748b",
} as const;

function buildSourceUrl(text: string) {
  const base = typeof window !== "undefined" ? window.location.origin : "https://shield-insight-labs.lovable.app";
  return `${base}/analyze?msg=${encodeURIComponent(text)}`;
}

function getSuspiciousSentence(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const triggerWords = /urgent|immediately|expires?|last chance|act now|otp|password|pin|cvv|click here|verify now|won|selected|congratulations|limited time|exclusive|invest|double your money|guaranteed|high return|fee|deposit|pay now|transfer|bank account|install|download|remote access|call support/i;
  for (const s of sentences) {
    if (triggerWords.test(s) && s.length > 20) return s.trim();
  }
  return sentences[ 0 ]?.trim() || text;
}

type ExcerptMode = "auto" | "suspicious" | "custom";

export function ShareCard({ result }: { result: AnalysisResult }) {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [excerptMode, setExcerptMode] = useState<ExcerptMode>("auto");
  const [customExcerpt, setCustomExcerpt] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);
  const tone = LEVEL_COLOR[result.level];

  const sourceUrl = useMemo(() => buildSourceUrl(result.originalText), [result.originalText]);

  const preview = useMemo(() => {
    if (excerptMode === "custom" && customExcerpt.trim()) {
      const t = customExcerpt.trim();
      return t.length > 200 ? t.slice(0, 200) + "…" : t;
    }
    if (excerptMode === "suspicious") {
      const s = getSuspiciousSentence(result.originalText);
      return s.length > 200 ? s.slice(0, 200) + "…" : s;
    }
    // auto
    const t = result.originalText;
    return t.length > 140 ? t.slice(0, 140) + "…" : t;
  }, [excerptMode, customExcerpt, result.originalText]);

  const visibleFlags = result.redFlags.slice(1, 4);
  const topFlag = result.redFlags[0];

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
    const text = `⚠️ ScamShield AI flagged this message as ${tone.label.toUpperCase()} (${Math.round(result.score)}% scam probability).

"${preview}"

Detected red flags:\n${result.redFlags.map((f) => `• ${f.label} (${f.severity})`).join("\n") || "—"}\n\nView full analysis: ${sourceUrl}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(sourceUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1800);
  };

  return (
    <section className="glass-card rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
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

      {/* Excerpt chooser */}
      <div className="mb-4 rounded-xl border border-border bg-background/40 p-3">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Quote className="h-3 w-3" /> Choose message excerpt
        </p>
        <div className="flex flex-wrap gap-2">
          {([
            { key: "auto", label: "Auto" },
            { key: "suspicious", label: "Most suspicious" },
            { key: "custom", label: "Custom" },
          ] as { key: ExcerptMode; label: string }[]).map((m) => (
            <button
              key={m.key}
              onClick={() => setExcerptMode(m.key)}
              className={`rounded-full px-3 py-1 text-xs transition ${
                excerptMode === m.key
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-white/60 text-muted-foreground hover:bg-white"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        {excerptMode === "custom" && (
          <textarea
            value={customExcerpt}
            onChange={(e) => setCustomExcerpt(e.target.value)}
            placeholder="Paste the excerpt you want to highlight…"
            maxLength={220}
            className="mt-2 w-full rounded-lg border border-border bg-white/70 px-3 py-2 text-xs text-foreground outline-none ring-ring transition focus:ring-2"
            rows={3}
          />
        )}
        <p className="mt-2 text-[11px] text-muted-foreground">
          Preview: “{preview}”
        </p>
      </div>

      {/* Source link */}
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-background/40 p-3">
        <Link2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 truncate text-xs text-primary underline underline-offset-2 hover:text-primary/80"
          title={sourceUrl}
        >
          {sourceUrl}
        </a>
        <button
          onClick={copyLink}
          className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-white/70 px-2 py-1 text-[11px] hover:bg-white"
        >
          {linkCopied ? <Check className="h-3 w-3 text-safe" /> : <Pencil className="h-3 w-3" />}
          {linkCopied ? "Copied" : "Copy link"}
        </button>
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
          <g transform="translate(60, 50)">
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
          <g transform="translate(60, 120)">
            <rect width="260" height="44" rx="22" fill={tone.bg} opacity="0.12" />
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
          <g transform="translate(60, 195)">
            <text fontFamily="Sora, sans-serif" fontWeight="800" fontSize="120" fill="#0f172a">
              {Math.round(result.score)}
              <tspan fontSize="56" fill="#64748b">
                %
              </tspan>
            </text>
            <text y="155" fontFamily="Manrope, sans-serif" fontSize="22" fill="#64748b">
              scam probability
            </text>
          </g>

          {/* Message preview */}
          <g transform="translate(560, 160)">
            <rect width="580" height="210" rx="16" fill="#ffffff" stroke="#e2e8f0" />
            <foreignObject x="20" y="16" width="540" height="178">
              <div
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "18px",
                  lineHeight: 1.5,
                  color: "#334155",
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                "{preview}"
              </div>
            </foreignObject>
          </g>

          {/* Top red flag */}
          {topFlag && (
            <g transform="translate(60, 390)">
              <rect width="500" height="56" rx="12" fill="#ffffff" stroke="#e2e8f0" />
              <circle cx="24" cy="28" r="8" fill={SEV_DOT[topFlag.severity]} />
              <text
                x="44"
                y="25"
                fontFamily="Manrope, sans-serif"
                fontWeight="700"
                fontSize="17"
                fill="#0f172a"
              >
                {topFlag.label}
              </text>
              <text
                x="44"
                y="45"
                fontFamily="Manrope, sans-serif"
                fontSize="13"
                fill="#64748b"
              >
                {topFlag.description}
              </text>
            </g>
          )}

          {/* Red flag chips */}
          {visibleFlags.length > 1 ? (
            <g transform="translate(60, 462)">
              {visibleFlags.map((f, i) => (
                <g key={f.id} transform={`translate(${i * 280}, 0)`}>
                  <rect width="260" height="48" rx="10" fill="#ffffff" stroke="#e2e8f0" />
                  <circle cx="18" cy="24" r="6" fill={SEV_DOT[f.severity]} />
                  <text
                    x="34"
                    y="30"
                    fontFamily="Manrope, sans-serif"
                    fontWeight="600"
                    fontSize="15"
                    fill="#0f172a"
                  >
                    {f.label}
                  </text>
                </g>
              ))}
            </g>
          ) : visibleFlags.length === 1 ? (
            <g transform="translate(60, 462)">
              <rect width="260" height="48" rx="10" fill="#ffffff" stroke="#e2e8f0" />
              <circle cx="18" cy="24" r="6" fill={SEV_DOT[visibleFlags[0].severity]} />
              <text
                x="34"
                y="30"
                fontFamily="Manrope, sans-serif"
                fontWeight="600"
                fontSize="15"
                fill="#0f172a"
              >
                {visibleFlags[0].label}
              </text>
            </g>
          ) : null}

          {/* Footer */}
          <text x="60" y="580" fontFamily="Manrope, sans-serif" fontSize="15" fill="#64748b">
            Verify before you trust · {sourceUrl.replace(/^https?:\/\//, "")}
          </text>
        </svg>
      </div>
    </section>
  );
}
