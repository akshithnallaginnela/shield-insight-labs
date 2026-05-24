export interface LinguisticMarker {
  marker: string;
  type: "grammar" | "tone" | "vocabulary" | "structure";
  riskScore: number;
  explanation: string;
}

export function analyzeLinguistics(text: string): LinguisticMarker[] {
  const markers: LinguisticMarker[] = [];

  // 1. ARCHAIC LANGUAGE
  if (/\b(kindly|oblige|forthwith|hereby|thereupon|henceforth)\b/i.test(text)) {
    markers.push({
      marker: "Archaic Language",
      type: "vocabulary",
      riskScore: 8,
      explanation: "Uses formal/archaic words to appear legitimate",
    });
  }

  // 2. MIXED TONE (formal + casual)
  const formalWords = (
    text.match(/\b(hereby|therefore|thus|furthermore|moreover|notwithstanding)\b/gi) || []
  ).length;
  const casualWords = (text.match(/\b(hey|lol|u|ur|gonna|wanna|btw|asap)\b/gi) || []).length;

  if (formalWords > 0 && casualWords > 0) {
    markers.push({
      marker: "Tone Inconsistency",
      type: "tone",
      riskScore: 12,
      explanation: "Mixes formal and casual language suggesting template or multiple authors",
    });
  }

  // 3. COPY-PASTE INDICATORS
  if (/\b(copy of|below is|attached is|as follows|the following|see below)\b/i.test(text)) {
    markers.push({
      marker: "Copy-Paste Template Indicator",
      type: "structure",
      riskScore: 10,
      explanation: "Language suggests message is copied from template",
    });
  }

  // 4. FINANCIAL JARGON OVERUSE
  const financeWords = (
    text.match(
      /\b(crypto|blockchain|bitcoin|ethereum|margin|leverage|forex|commodity|derivative|arbitrage)\b/gi,
    ) || []
  ).length;
  if (financeWords >= 3) {
    markers.push({
      marker: "Financial Jargon Overuse",
      type: "vocabulary",
      riskScore: 14,
      explanation: "Uses complex financial terminology to appear authoritative",
    });
  }

  // 5. SUBJECT-VERB DISAGREEMENT
  const svPatterns = /(he|she|it|the company|the bank)\s+\w+\s+(are|were)/gi;
  if (svPatterns.test(text)) {
    markers.push({
      marker: "Grammar Error: Subject-Verb Disagreement",
      type: "grammar",
      riskScore: 6,
      explanation: "Non-native speaker or automated message",
    });
  }

  // 6. VERB TENSE INCONSISTENCY
  if (/\b(is going|has went|have go|were going|was go)\b/i.test(text)) {
    markers.push({
      marker: "Verb Tense Inconsistency",
      type: "grammar",
      riskScore: 6,
      explanation: "Incorrect verb conjugation indicates non-native speaker",
    });
  }

  // 7. MISSING ARTICLES (a, an, the)
  const missingArticles = text.match(/\b(by \w+|in \w+|to \w+)\b/g) || [];
  if (missingArticles.length >= 3) {
    markers.push({
      marker: "Missing Articles",
      type: "grammar",
      riskScore: 5,
      explanation: "Non-native English speaker",
    });
  }

  // 8. ABRUPT TOPIC CHANGES
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 10);
  if (sentences.length >= 3) {
    const topicWords = sentences.map((s) => s.split(" ")[0]);
    const uniqueTopics = new Set(topicWords).size;

    if (uniqueTopics >= sentences.length * 0.7) {
      markers.push({
        marker: "Abrupt Topic Changes",
        type: "structure",
        riskScore: 8,
        explanation: "Random topic switching suggests multiple unrelated templates combined",
      });
    }
  }

  // 9. LANGUAGE ORIGIN DETECTION (English as second language)
  const eslIndicators = /(your|you're|there|their|they're)\s+\w+\s+(are|is|was)/gi;
  if ((text.match(eslIndicators) || []).length >= 2) {
    markers.push({
      marker: "Non-Native English",
      type: "grammar",
      riskScore: 7,
      explanation: "Language patterns suggest English as second language",
    });
  }

  // 10. EXCLAMATION OVERUSE & EMOTICONS
  const exclamations = (text.match(/!{2,}/g) || []).length;
  const emojis = (text.match(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}]/gu) || []).length;

  if (exclamations >= 3 || emojis >= 3) {
    markers.push({
      marker: "Emotional Manipulation Language",
      type: "tone",
      riskScore: 9,
      explanation: "Excessive exclamation marks and emojis used to manipulate emotions",
    });
  }

  return markers;
}

export function calculateLinguisticScore(markers: LinguisticMarker[]): number {
  return markers.reduce((score, marker) => score + marker.riskScore, 0);
}
