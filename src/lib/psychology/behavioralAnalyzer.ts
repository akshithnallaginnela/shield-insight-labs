export interface BehavioralAnomaly {
  anomaly: string;
  severity: "low" | "medium" | "high";
  explanation: string;
  evidence: string;
}

export function analyzeBehavior(text: string): BehavioralAnomaly[] {
  const anomalies: BehavioralAnomaly[] = [];

  // 1. GENERIC/IMPERSONAL ADDRESSING
  const greetingMatch = text.match(
    /\b(dear sir|dear madam|dear customer|valued customer|hello there|hi there|dear user)\b/i,
  );
  if (greetingMatch) {
    anomalies.push({
      anomaly: "Generic/Impersonal Addressing",
      severity: "medium",
      explanation:
        "Uses generic greetings indicating mass targeting, not personalized communication",
      evidence: greetingMatch[0],
    });
  }

  // 2. CHANNEL HOPPING
  const channelMatch = text.match(/\b(whatsapp|telegram|t\.me|wa\.me|dm me|contact me on)\b/i);
  if (channelMatch) {
    anomalies.push({
      anomaly: "Channel Switching/Hopping",
      severity: "high",
      explanation: "Moves conversation to encrypted channels to avoid audit trails",
      evidence: channelMatch[0],
    });
  }

  // 3. GRAMMAR & TYPOS (Non-native language indicator)
  const typoMatches = text.match(/\b(ur|u r|dont|wanna|gonna|thier|recieve|occured)\b/gi) || [];
  if (typoMatches.length >= 2 || /\b[a-z]\b/.test(text)) {
    anomalies.push({
      anomaly: "Grammar Issues/Typos",
      severity: "low",
      explanation: "Multiple typos suggest non-native speaker or mass template",
      evidence: typoMatches[0] || "Multiple typo patterns detected",
    });
  }

  // 4. EXCESSIVE CAPS/EXCITEMENT
  const capsCount = (text.match(/[A-Z]{4,}/g) || []).length;
  const exclamationCount = (text.match(/!!+/g) || []).length;
  if (capsCount >= 2 || exclamationCount >= 2) {
    anomalies.push({
      anomaly: "Excessive Excitement/Emphasis",
      severity: "low",
      explanation: "Overuse of caps and exclamation marks suggests manipulation",
      evidence: `${capsCount} caps sequences, ${exclamationCount} multiple exclamations`,
    });
  }

  // 5. REQUEST ESCALATION (if message is long, check for progression)
  if (text.length > 200) {
    const hasInitialRequest = /\b(click|verify|confirm|check|look at)\b/i.test(text);
    const hasPaymentRequest = /\b(pay|send|transfer|deposit|fee)\b/i.test(text);
    const hasCredentialRequest = /\b(otp|password|account|details|number)\b/i.test(text);

    if (hasInitialRequest && hasPaymentRequest && hasCredentialRequest) {
      anomalies.push({
        anomaly: "Request Escalation Pattern",
        severity: "high",
        explanation:
          "Combines multiple types of requests suggesting gradual trust-building for exploitation",
        evidence: "Multiple request types detected",
      });
    }
  }

  // 6. INCONSISTENT INFORMATION
  const claimsBank = /\b(bank|official|rbi|reserve bank)\b/i.test(text);
  const requestsWhatsapp = /\b(whatsapp|telegram)\b/i.test(text);
  if (claimsBank && requestsWhatsapp) {
    anomalies.push({
      anomaly: "Inconsistent Information",
      severity: "high",
      explanation:
        "Claims to be from bank but asks to contact via WhatsApp - banks don't work this way",
      evidence: "Bank claims + WhatsApp request",
    });
  }

  // 7. TIMEFRAME INCONSISTENCIES
  if (
    /\b(just now|5 mins ago|recently|just saw)\b/i.test(text) &&
    /\b(long time|for years|since|always|never)\b/i.test(text)
  ) {
    anomalies.push({
      anomaly: "Timeframe Inconsistency",
      severity: "medium",
      explanation: "Message contains contradictory timeframe references",
      evidence: "Conflicting time references detected",
    });
  }

  // 8. VERIFICATION AVOIDANCE
  const avoidanceMatch = text.match(
    /\b(don't ask|no questions|don't worry|don't check|don't verify|just do it|trust me)\b/i,
  );
  if (avoidanceMatch) {
    anomalies.push({
      anomaly: "Verification Avoidance",
      severity: "high",
      explanation: "Discourages verification or questions - classic scam tactic",
      evidence: avoidanceMatch[0],
    });
  }

  // 9. SUSPICIOUS DOMAIN
  const suspiciousTldMatch = text.match(/\b(xyz|top|click|work|monster|cyou|loan|zip|tk|ml|ga)\b/i);
  if (suspiciousTldMatch) {
    anomalies.push({
      anomaly: "Suspicious Domain TLD",
      severity: "high",
      explanation: "Uses known abuse-prone domain extensions",
      evidence: suspiciousTldMatch[0],
    });
  }

  return anomalies;
}

export function calculateBehaviorScore(anomalies: BehavioralAnomaly[]): number {
  let score = 0;
  const highCount = anomalies.filter((a) => a.severity === "high").length;
  const mediumCount = anomalies.filter((a) => a.severity === "medium").length;

  score += highCount * 15;
  score += mediumCount * 8;

  return Math.min(score, 100);
}
