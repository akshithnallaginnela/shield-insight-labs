import type { ThreatLevel } from "@/lib/mockAnalyzer";
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

const MAP = {
  safe: { label: "Looks Safe", cls: "border-safe/40 bg-safe/10 text-safe", Icon: ShieldCheck },
  suspicious: { label: "Suspicious", cls: "border-warning/40 bg-warning/10 text-warning", Icon: AlertTriangle },
  critical: { label: "Critical Danger", cls: "border-danger/50 bg-danger/10 text-danger", Icon: ShieldAlert },
} as const;

export function ThreatBadge({ level, size = "md" }: { level: ThreatLevel; size?: "sm" | "md" }) {
  const { label, cls, Icon } = MAP[level];
  const sz = size === "sm" ? "text-xs px-2.5 py-1" : "text-sm px-3.5 py-1.5";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${cls} ${sz}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
