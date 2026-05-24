import { create } from "zustand";
import type { AnalysisResult } from "@/lib/mockAnalyzer";

interface AnalysisState {
  pendingMessage: string;
  result: AnalysisResult | null;
  setPending: (m: string) => void;
  setResult: (r: AnalysisResult | null) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  pendingMessage: "",
  result: null,
  setPending: (m) => set({ pendingMessage: m }),
  setResult: (r) => set({ result: r }),
}));
