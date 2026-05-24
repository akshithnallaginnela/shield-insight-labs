import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Upload, Sparkles, ImageIcon } from "lucide-react";
import { useAnalysisStore } from "@/stores/analysisStore";

const SAMPLE =
  "Congratulations! You have been shortlisted for Amazon WFH role. Earn ₹4,500/day. Pay ₹999 refundable registration fee via UPI. Send OTP to confirm. Reply on WhatsApp +91 99999 88888 within 1 hour or offer expires.";

export function MessageInput({ compact = false }: { compact?: boolean }) {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const navigate = useNavigate();
  const setPending = useAnalysisStore((s) => s.setPending);
  const setResult = useAnalysisStore((s) => s.setResult);
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (!text.trim()) return;
    setResult(null);
    setPending(text.trim());
    navigate({ to: "/analyze" });
  };

  return (
    <div className="glass-card animated-border relative overflow-hidden rounded-2xl p-4 md:p-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyber shadow-[0_0_10px_var(--cyber)]" />
          Live Analyzer
        </div>
        <button
          type="button"
          onClick={() => setText(SAMPLE)}
          className="text-[11px] text-muted-foreground transition hover:text-foreground"
        >
          Try a sample
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste a suspicious WhatsApp message, recruiter email, or SMS here…"
        rows={compact ? 4 : 6}
        className="w-full resize-none rounded-xl border border-border/60 bg-background/40 p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-cyber/60 focus:outline-none focus:ring-2 focus:ring-cyber/30"
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setFileName(f.name);
        }}
      />

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2 text-xs text-muted-foreground transition hover:border-cyber/40 hover:text-foreground"
        >
          {fileName ? <ImageIcon className="h-4 w-4 text-cyber" /> : <Upload className="h-4 w-4" />}
          <span className="max-w-[180px] truncate">{fileName ?? "Upload screenshot"}</span>
        </button>

        <button
          type="button"
          onClick={submit}
          disabled={!text.trim()}
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-cyber to-neon px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_40px_-8px_var(--cyber)] transition hover:shadow-[0_0_60px_-6px_var(--neon)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          Analyze Message
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>
    </div>
  );
}
