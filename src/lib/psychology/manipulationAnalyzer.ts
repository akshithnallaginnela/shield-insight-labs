export interface PsychologicalTactic {
  tactic: string;
  score: number; // 0-100 intensity
  evidence: string[]; // phrases that triggered it
  category: "fear" | "greed" | "authority" | "trust" | "confusion" | "urgency";
  explanation: string;
  severity: "low" | "medium" | "high";
}

export function analyzePsychology(text: string): PsychologicalTactic[] {
  const tactics: PsychologicalTactic[] = [];

  // 1. ARTIFICIAL URGENCY
  const urgencyPatterns =
    /\b(urgent|immediately|act now|limited time|expires?|last chance|within \d+ (min|hour)|hurry|asap)\b/gi;
  const urgencyMatches = text.match(urgencyPatterns) || [];
  if (urgencyMatches.length) {
    tactics.push({
      tactic: "Artificial Urgency",
      score: 22,
      evidence: urgencyMatches,
      category: "urgency",
      explanation: "Uses time pressure to make you act without thinking",
      severity: "high",
    });
  }

  // 2. FEAR & THREAT
  const fearPatterns =
    /\b(account (will be |)blocked|suspended|frozen|kyc expired|funds frozen|legal action|police|lawsuit|permanent ban)\b/gi;
  const fearMatches = text.match(fearPatterns) || [];
  if (fearMatches.length) {
    tactics.push({
      tactic: "Fear & Account Loss Threat",
      score: 22,
      evidence: fearMatches,
      category: "fear",
      explanation: "Threatens account closure to force immediate action",
      severity: "high",
    });
  }

  // 3. GREED EXPLOITATION
  const greedPatterns =
    /\b(easy money|no experience|guaranteed returns?|unlimited income|daily income|passive income|work from home|earn ₹|quick cash|100% profit)\b/gi;
  const greedMatches = text.match(greedPatterns) || [];
  if (greedMatches.length) {
    tactics.push({
      tactic: "Greed Exploitation",
      score: 18,
      evidence: greedMatches,
      category: "greed",
      explanation: "Promises unrealistic financial rewards with minimal effort",
      severity: "high",
    });
  }

  // 4. FALSE AUTHORITY
  const authorityPatterns =
    /\b(bank official|police|government|ceo|director|manager|compliance team|security team|official|authorized)\b/gi;
  const authorityMatches = text.match(authorityPatterns) || [];
  if (authorityMatches.length) {
    tactics.push({
      tactic: "False Authority",
      score: 20,
      evidence: authorityMatches,
      category: "authority",
      explanation: "Impersonates legitimate authority figures",
      severity: "high",
    });
  }

  // 5. CREDENTIAL REQUEST
  const credentialPatterns =
    /\b(otp|password|cvv|pin|verify|confirm|credential|secret code|one-time password|aadhar|pan|bank details|account number|card details)\b/gi;
  const credentialMatches = text.match(credentialPatterns) || [];
  if (credentialMatches.length) {
    tactics.push({
      tactic: "Sensitive Credential Request",
      score: 28,
      evidence: credentialMatches,
      category: "trust",
      explanation: "Requests sensitive information no legitimate entity would ask for",
      severity: "high",
    });
  }

  // 6. SOCIAL PROOF
  const socialProofPatterns =
    /\b(10,?000\+ |everyone|all|trusted by millions|already joined|you're the only one|most popular|best rated)\b/gi;
  const socialProofMatches = text.match(socialProofPatterns) || [];
  if (socialProofMatches.length) {
    tactics.push({
      tactic: "False Social Proof",
      score: 14,
      evidence: socialProofMatches,
      category: "trust",
      explanation: "Claims widespread adoption to seem legitimate",
      severity: "medium",
    });
  }

  // 7. SCARCITY PRESSURE
  const scarcityPatterns =
    /\b(only \d+ (slots|places|seats)|limited availability|exclusive|first come first served|hurry|slots filling fast)\b/gi;
  const scarcityMatches = text.match(scarcityPatterns) || [];
  if (scarcityMatches.length) {
    tactics.push({
      tactic: "Artificial Scarcity",
      score: 16,
      evidence: scarcityMatches,
      category: "urgency",
      explanation: "Creates fear of missing out by claiming limited availability",
      severity: "medium",
    });
  }

  // 8. RECIPROCITY EXPLOITATION
  const reciprocityPatterns =
    /\b(we (have |)helped you|you owe us|as a favor|in return|we need your help|give back)\b/gi;
  const reciprocityMatches = text.match(reciprocityPatterns) || [];
  if (reciprocityMatches.length) {
    tactics.push({
      tactic: "Reciprocity Exploitation",
      score: 14,
      evidence: reciprocityMatches,
      category: "trust",
      explanation: "Claims prior help to obligate you to reciprocate",
      severity: "medium",
    });
  }

  // 9. COMMITMENT ESCALATION
  const escalationPatterns =
    /\b(just verify once|small fee first|test withdrawal|try it out|free trial|no risk)\b/gi;
  const escalationMatches = text.match(escalationPatterns) || [];
  if (escalationMatches.length) {
    tactics.push({
      tactic: "Commitment Escalation",
      score: 18,
      evidence: escalationMatches,
      category: "trust",
      explanation: "Starts with small request to build trust before larger asks",
      severity: "medium",
    });
  }

  // 10. AUTHORITY CLONING
  const cloningPatterns =
    /\b(official|verified|official channel|official page|official account|real account|authentic|certified|legitimate)\b/gi;
  const cloningMatches = text.match(cloningPatterns) || [];
  if (cloningMatches.length) {
    tactics.push({
      tactic: "Authority Cloning",
      score: 16,
      evidence: cloningMatches,
      category: "authority",
      explanation: "Claims to be official/verified when they're not",
      severity: "medium",
    });
  }

  // 11. CURIOSITY EXPLOITATION
  const curiosityPatterns =
    /\b(click here|tap here|see more|shocking|unbelievable|you won't believe|reveal|secret|discover|exclusive)\b/gi;
  const curiosityMatches = text.match(curiosityPatterns) || [];
  if (curiosityMatches.length) {
    tactics.push({
      tactic: "Curiosity Exploitation",
      score: 12,
      evidence: curiosityMatches,
      category: "confusion",
      explanation: "Uses curiosity to get you to click/engage",
      severity: "medium",
    });
  }

  // 12. LOSS AVERSION
  const lossPatterns =
    /\b(don't miss out|you'll regret|everyone else (knows|has)|don't be left behind|act before it's gone)\b/gi;
  const lossMatches = text.match(lossPatterns) || [];
  if (lossMatches.length) {
    tactics.push({
      tactic: "Loss Aversion",
      score: 16,
      evidence: lossMatches,
      category: "fear",
      explanation: "Makes you fear missing opportunity more than gaining something",
      severity: "medium",
    });
  }

  // 13. TECHNICAL CONFUSION
  const technicalPatterns =
    /\b(update required|security alert|system maintenance|verify account|unusual activity detected|confirm identity)\b/gi;
  const technicalMatches = text.match(technicalPatterns) || [];
  if (technicalMatches.length) {
    tactics.push({
      tactic: "Technical Confusion",
      score: 18,
      evidence: technicalMatches,
      category: "confusion",
      explanation: "Uses technical language to confuse and manipulate",
      severity: "high",
    });
  }

  // 14. UPFRONT PAYMENT
  const paymentPatterns =
    /\b(registration fee|processing fee|security deposit|pay ₹|pay usd|payment required|send money|transfer funds)\b/gi;
  const paymentMatches = text.match(paymentPatterns) || [];
  if (paymentMatches.length) {
    tactics.push({
      tactic: "Upfront Payment Request",
      score: 26,
      evidence: paymentMatches,
      category: "greed",
      explanation: "Requests payment upfront - red flag for scams",
      severity: "high",
    });
  }

  return tactics;
}

export function calculatePsychologyScore(tactics: PsychologicalTactic[]): number {
  let score = 0;
  const highSeverity = tactics.filter((t) => t.severity === "high").length;

  tactics.forEach((t) => {
    score += t.score;
  });

  if (highSeverity >= 3) score *= 1.3;
  if (highSeverity >= 5) score *= 1.5;

  return Math.min(score, 100);
}
