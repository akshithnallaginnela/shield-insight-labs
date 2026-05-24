export type ScamType =
  | "job_recruiter"
  | "romance"
  | "investment_crypto"
  | "tech_support"
  | "identity_theft"
  | "phishing"
  | "money_transfer"
  | "lottery_prize"
  | "unknown";

export interface ScamClassification {
  primaryType: ScamType;
  confidence: number; // 0-100
  explanation: string;
  indicators: string[];
}

export function classifyScamType(text: string): ScamClassification {
  let scores: Record<ScamType, number> = {
    job_recruiter: 0,
    romance: 0,
    investment_crypto: 0,
    tech_support: 0,
    identity_theft: 0,
    phishing: 0,
    money_transfer: 0,
    lottery_prize: 0,
    unknown: 0,
  };
  const indicators: string[] = [];

  // JOB/RECRUITER SCAM
  if (
    /\b(job|position|recruiter|hiring|interview|salary|hr|recruitment|apply|role|vacancy)\b/i.test(
      text,
    )
  ) {
    scores.job_recruiter += 30;
    indicators.push("Job/recruitment keywords");
  }
  if (/\b(work from home|part time|flexible|registration fee|upfront payment)\b/i.test(text)) {
    scores.job_recruiter += 20;
    indicators.push("WFH/payment for job indicators");
  }
  if (/\b(linkedin|indeed|naukri|glassdoor)\b/i.test(text)) {
    scores.job_recruiter += 15;
    indicators.push("Job platform references");
  }

  // ROMANCE SCAM
  if (
    /\b(love|miss|heart|dear|sweetheart|darling|marry|relationship|dating|feelings)\b/i.test(text)
  ) {
    scores.romance += 30;
    indicators.push("Romantic/emotional language");
  }
  if (/\b(i care about you|let me help|i need your help|trust me|believe me)\b/i.test(text)) {
    scores.romance += 25;
    indicators.push("Emotional manipulation tactics");
  }
  if (/\b(emergency|sick|accident|hospital|visa|travel|business problem)\b/i.test(text)) {
    scores.romance += 20;
    indicators.push("Emergency money request indicators");
  }

  // INVESTMENT/CRYPTO SCAM
  if (
    /\b(crypto|bitcoin|ethereum|blockchain|forex|stock|investment|roi|returns|profit)\b/i.test(text)
  ) {
    scores.investment_crypto += 35;
    indicators.push("Crypto/investment keywords");
  }
  if (/\b(guaranteed returns|unlimited income|quick money|passive income|no risk)\b/i.test(text)) {
    scores.investment_crypto += 25;
    indicators.push("Unrealistic return promises");
  }
  if (/\b(pump|dump|insider tip|hot tip|exclusive opportunity)\b/i.test(text)) {
    scores.investment_crypto += 20;
    indicators.push("Investment scam indicators");
  }

  // TECH SUPPORT SCAM
  if (/\b(malware|virus|infected|antivirus|security alert|update|download|install)\b/i.test(text)) {
    scores.tech_support += 30;
    indicators.push("Tech/malware keywords");
  }
  if (/\b(your computer|system|device|immediate action required)\b/i.test(text)) {
    scores.tech_support += 20;
    indicators.push("Tech support urgency indicators");
  }
  if (/\b(remote access|teamviewer|anydesk|click link)\b/i.test(text)) {
    scores.tech_support += 25;
    indicators.push("Remote access request");
  }

  // IDENTITY THEFT/KYC FRAUD
  if (/\b(kyc|aadhar|pan|bank details|account number|otp|verify|confirm identity)\b/i.test(text)) {
    scores.identity_theft += 35;
    indicators.push("KYC/identity verification requests");
  }
  if (/\b(update required|verification link|click here|confirm)\b/i.test(text)) {
    scores.identity_theft += 20;
    indicators.push("Phishing-style verification");
  }

  // PHISHING
  if (/\b(click here|tap here|verify account|unusual activity|suspicious|confirm)\b/i.test(text)) {
    scores.phishing += 25;
    indicators.push("Phishing call-to-action");
  }
  if (/\b(bit\.ly|tinyurl|short\.link|re\.direct)\b/i.test(text)) {
    scores.phishing += 20;
    indicators.push("Shortened URL in message");
  }
  if (/\b(password|credentials|login|username)\b/i.test(text)) {
    scores.phishing += 25;
    indicators.push("Credential theft indicators");
  }

  // MONEY TRANSFER SCAM
  if (
    /\b(upi|paytm|phone pe|google pay|bank transfer|western union|money gram|send money)\b/i.test(
      text,
    )
  ) {
    scores.money_transfer += 30;
    indicators.push("Money transfer method");
  }
  if (/\b(transfer|send|pay|deposit|amount|rupees|rs)\b/i.test(text)) {
    scores.money_transfer += 15;
    indicators.push("Payment request language");
  }

  // LOTTERY/PRIZE SCAM
  if (/\b(congratulations|you won|selected|lucky|jackpot|prize|lottery|claim)\b/i.test(text)) {
    scores.lottery_prize += 35;
    indicators.push("Lottery/prize keywords");
  }
  if (/\b(processing fee|claim fee|tax)\b/i.test(text)) {
    scores.lottery_prize += 25;
    indicators.push("Upfront payment for prize");
  }

  const sortedTypes = Object.entries(scores)
    .filter(([key]) => key !== "unknown")
    .sort(([, a], [, b]) => b - a);

  const [primaryType, score] = sortedTypes[0] || ["unknown", 0];
  const confidence = Math.min(score, 100);

  let explanation = `This appears to be a ${primaryType.replace(/_/g, " ")} scam.`;
  if (confidence < 30) {
    explanation = "Unable to confidently classify scam type. Review indicators below.";
  } else if (confidence < 60) {
    explanation = `Likely a ${primaryType.replace(/_/g, " ")} scam, but moderate confidence.`;
  }

  return {
    primaryType: primaryType as ScamType,
    confidence,
    explanation,
    indicators,
  };
}
