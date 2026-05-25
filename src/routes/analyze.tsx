import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { MessageInput } from "@/components/analyzer/MessageInput";
import { ScanningOverlay } from "@/components/analyzer/ScanningOverlay";
import { ProbabilityGauge } from "@/components/analyzer/ProbabilityGauge";
import { ThreatBadge } from "@/components/ui/ThreatBadge";
import { RedFlagsList } from "@/components/analyzer/RedFlagsList";
import { ThreatBreakdown } from "@/components/analyzer/ThreatBreakdown";
import { PsychologyBreakdown } from "@/components/analyzer/PsychologyBreakdown";
import { BehavioralBreakdown } from "@/components/analyzer/BehavioralBreakdown";
import { LinguisticBreakdown } from "@/components/analyzer/LinguisticBreakdown";
import { ScamClassificationCard } from "@/components/analyzer/ScamClassificationCard";
import { SafeStepsChecklist } from "@/components/analyzer/SafeStepsChecklist";
import { ShareCard } from "@/components/analyzer/ShareCard";
import { useAnalysisStore } from "@/stores/analysisStore";
import { analyzeMessage } from "@/lib/mockAnalyzer";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Analyzer — ScamShield AI" },
      {
        name: "description",
        content: "Run AI-powered threat analysis on any suspicious message in seconds.",
      },
      { property: "og:title", content: "Analyzer — ScamShield AI" },
      {
        property: "og:description",
        content: "Run AI-powered threat analysis on any suspicious message in seconds.",
      },
    ],
  }),
  component: AnalyzePage,
});

function AnalyzePage() {
  const pending = useAnalysisStore((s) => s.pendingMessage);
  const result = useAnalysisStore((s) => s.result);
  const setResult = useAnalysisStore((s) => s.setResult);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (pending && !result) {
      setScanning(true);
    }
  }, [pending, result]);

  const finishScan = () => {
    setResult(analyzeMessage(pending));
    setScanning(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 md:px-6 md:pt-14">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full border border-cyber/30 bg-cyber/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cyber">
          <Sparkles className="h-3 w-3" /> Analysis Dashboard
        </div>
      </div>

      {!pending && !result && (
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Run a Threat Analysis
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Paste a message below to begin scanning.
            </p>
          </div>
          <MessageInput />
        </div>
      )}

      {scanning && (
        <div className="mx-auto max-w-2xl">
          <ScanningOverlay onDone={finishScan} />
        </div>
      )}

      {!scanning && result && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
          {/* LEFT */}
          <div className="space-y-5">
            <div className="glass-card animated-border relative overflow-hidden rounded-2xl p-6">
              <div className="flex flex-col items-center gap-4">
                <ProbabilityGauge score={result.score} level={result.level} />
                <ThreatBadge level={result.level} />
                <p className="text-center text-xs text-muted-foreground">
                  Based on {result.redFlags.length} detected pattern
                  {result.redFlags.length === 1 ? "" : "s"}.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Detected Red Flags
              </h2>
              <RedFlagsList flags={result.redFlags} />
            </div>

            <button
              onClick={() => {
                setResult(null);
                useAnalysisStore.getState().setPending("");
              }}
              className="w-full rounded-lg border border-border/60 bg-background/40 px-4 py-2.5 text-sm transition hover:border-cyber/40 hover:text-foreground"
            >
              Analyze another message
            </button>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            <ThreatBreakdown result={result} />
            <PsychologyBreakdown
              tactics={result.psychologyTactics}
              score={result.psychologyScore}
            />
            <BehavioralBreakdown
              anomalies={result.behavioralAnomalies}
              score={result.behaviorScore}
            />
            <LinguisticBreakdown
              markers={result.linguisticMarkers}
              score={result.linguisticScore}
            />
            <ScamClassificationCard classification={result.scamClassification} />
            <SafeStepsChecklist steps={result.safeSteps} />
            <ShareCard result={result} />
          </div>
        </div>
      )}
    </div>
  );
}
