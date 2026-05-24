export type ThreatLevel = "safe" | "suspicious" | "critical";

export interface RedFlag {
  id: string;
  label: string;
  description: string;
  severity: "low" | "medium" | "high";
}

export interface Highlight {
  start: number;
  end: number;
  reason: string;
}

export interface AnalysisResult {
  score: number; // 0-100 scam probability
  level: ThreatLevel;
  redFlags: RedFlag[];
  highlights: Highlight[];
  breakdown: string[];
  manipulationTactics: { name: string; explanation: string }[];
  safeSteps: string[];
  originalText: string;
}

type DetectionPattern = {
  id: string;
  regex: RegExp;
  flag: Omit<RedFlag, "id">;
  weight: number;
  tactic?: { name: string; explanation: string };
};

const DETECTION_PATTERNS: DetectionPattern[] = [
  {
    id: "urgency",
    regex: /\b(urgent|immediately|expires? (in|today)|last chance|act now|within \d+ ?(min|hour|hr))/gi,
    flag: { label: "Urgency Tactics", description: "Creates artificial time pressure to bypass rational thinking.", severity: "high" },
    weight: 22,
    tactic: { name: "Scarcity & Urgency", explanation: "Scammers create false deadlines so victims act before verifying." },
  },
  {
    id: "credential-request",
    regex: /\b(otp|one[- ]time password|verification code|cvv|pin)\b/gi,
    flag: { label: "Credential Request", description: "Asks for OTP, PIN or verification codes — legitimate companies never do this.", severity: "high" },
    weight: 28,
    tactic: { name: "Authority Impersonation", explanation: "Pretends to be a bank/recruiter to extract sensitive credentials." },
  },
  {
    id: "upfront-payment",
    regex: /\b(registration fee|processing fee|security deposit|refundable|pay (₹|rs\.?|inr|\$)\s?\d+)/gi,
    flag: { label: "Upfront Payment Demand", description: "Real employers and banks do not ask for upfront payments.", severity: "high" },
    weight: 26,
  },
  {
    id: "channel-redirect",
    regex: /(t\.me\/|telegram|wa\.me\/|whatsapp(\.com)?\/|\+\d{10,})/gi,
    flag: { label: "Telegram/WhatsApp Redirect", description: "Moves conversation to encrypted apps to avoid moderation.", severity: "medium" },
    weight: 14,
  },
  {
    id: "suspicious-domain",
    regex: /https?:\/\/[^\s]*\.(xyz|top|click|work|monster|cyou|loan|zip|tk|ml)\b/gi,
    flag: { label: "Suspicious Domain", description: "Link uses a TLD frequently abused by phishing kits.", severity: "high" },
    weight: 20,
  },
  {
    id: "shortened-link",
    regex: /\b(bit\.ly|tinyurl|cutt\.ly|rb\.gy|shorturl|t\.co)\b/gi,
    flag: { label: "Shortened Link", description: "Shortened URLs hide the real destination from victims.", severity: "medium" },
    weight: 12,
  },
  {
    id: "too-good-to-be-true",
    regex: /\b(work from home|part[- ]time job|daily (income|earning)|earn (₹|rs\.?|\$)\s?\d{2,}|easy money|no experience)/gi,
    flag: { label: "Too-Good-To-Be-True Offer", description: "Unrealistic compensation is a hallmark of task & job scams.", severity: "medium" },
    weight: 16,
    tactic: { name: "Greed Exploitation", explanation: "Promises outsized rewards to override critical thinking." },
  },
  {
    id: "fake-verification",
    regex: /\b(congratulations|you (have )?won|selected|shortlisted|lucky winner|lottery)\b/gi,
    flag: { label: "Fake Verification Request", description: "False selection notices used to harvest data.", severity: "medium" },
    weight: 14,
  },
  {
    id: "generic-greeting",
    regex: /\b(dear (sir|madam|customer|user)|valued customer)\b/gi,
    flag: { label: "Generic Greeting", description: "Legitimate companies address you by name.", severity: "low" },
    weight: 6,
  },
  {
    id: "fear-pressure",
    regex: /\b(account (will be )?(blocked|suspended)|kyc (update|expired)|frozen)\b/gi,
    flag: { label: "Fear-Based Pressure", description: "Threatens account loss to force a click.", severity: "high" },
    weight: 22,
    tactic: { name: "Loss Aversion", explanation: "Threatens loss of access so the victim acts to 'protect' themselves." },
  },
];

const EDUCATION_PATTERNS = [
  /\b(never share|do not share|don'?t share|avoid scams|fraud alert|scam alert|security tip|how to spot|awareness)\b/gi,
  /\b(report|block|verify|confirm) (the )?sender\b/gi,
];

const OPERATIONAL_PATTERNS = {
  apkOrInstall: /\b(apk|install now|download app|enable unknown sources|sideload|update app)\b/gi,
  paymentIntent: /\b(pay|transfer|deposit|upi|bank|wallet|gpay|phonepe|paytm|refund|fee|charge)\b/gi,
  contactRedirect: /\b(contact me on|move to|continue on|dm on|whatsapp|telegram|call on)\b/gi,
  authorityCue: /\b(bank|hr|recruiter|support|customer care|courier|delivery|income tax|government|police|amazon|flipkart|microsoft|google|tcs|sbi|hdfc)\b/gi,
  sensitiveRequest: /\b(otp|one[- ]time password|verification code|cvv|pin|password|aadhar|aadhaar|net banking|card details|account number)\b/gi,
  callToAction: /\b(click here|open link|tap here|verify now|respond now|send details|share details|apply now)\b/gi,
};

export function analyzeMessage(text: string): AnalysisResult {
  const trimmed = text.trim();
  const normalized = trimmed.toLowerCase();
  const highlights: Highlight[] = [];
  const redFlagsMap = new Map<string, RedFlag>();
  const tactics = new Map<string, { name: string; explanation: string }>();
  let score = 0;
  let strongSignals = 0;

  for (const p of DETECTION_PATTERNS) {
    let m: RegExpExecArray | null;
    const re = new RegExp(p.regex.source, p.regex.flags);
    let matched = false;
    while ((m = re.exec(trimmed)) !== null) {
      matched = true;
      highlights.push({ start: m.index, end: m.index + m[0].length, reason: p.flag.label });
      if (re.lastIndex === m.index) re.lastIndex++;
    }
    if (matched) {
      const id = p.flag.label.toLowerCase().replace(/\s+/g, "-");
      redFlagsMap.set(id, { id, ...p.flag });
      const matchBoost = p.weight + Math.min(6, Math.max(0, Math.floor(trimmed.length / 120)));
      score += matchBoost;
      if (p.flag.severity === "high") strongSignals += 1;
      if (p.tactic) tactics.set(p.tactic.name, p.tactic);
    }
  }

  const linkCount = (trimmed.match(/https?:\/\//gi) || []).length;
  const shortLinkCount = (trimmed.match(/\b(bit\.ly|tinyurl|cutt\.ly|rb\.gy|shorturl|t\.co)\b/gi) || []).length;
  const messageLength = normalized.length;
  const hasEducationCue = EDUCATION_PATTERNS.some((pattern) => pattern.test(trimmed));
  const hasInstallCue = OPERATIONAL_PATTERNS.apkOrInstall.test(trimmed);
  const hasPaymentCue = OPERATIONAL_PATTERNS.paymentIntent.test(trimmed);
  const hasRedirectCue = OPERATIONAL_PATTERNS.contactRedirect.test(trimmed);
  const hasAuthorityCue = OPERATIONAL_PATTERNS.authorityCue.test(trimmed);
  const hasSensitiveCue = OPERATIONAL_PATTERNS.sensitiveRequest.test(trimmed);
  const hasCallToAction = OPERATIONAL_PATTERNS.callToAction.test(trimmed);

  if (linkCount >= 2) score += 6;
  if (shortLinkCount > 0) score += 4;
  if (/[!]{2,}/.test(trimmed) || /[A-Z]{6,}/.test(trimmed)) score += 4;
  if (hasInstallCue) score += 14;
  if (hasPaymentCue && hasCallToAction) score += 10;
  if (hasRedirectCue && (hasSensitiveCue || hasPaymentCue)) score += 12;
  if (hasAuthorityCue && (hasSensitiveCue || hasPaymentCue || linkCount > 0)) score += 10;
  if (messageLength > 280 && (linkCount > 0 || hasCallToAction)) score += 4;
  if (hasEducationCue && score > 0) score = Math.max(0, score - 18);

  if (strongSignals >= 2) score += 8;
  if (strongSignals >= 3) score += 10;

  score = Math.max(0, Math.min(100, score));
  if (!trimmed) score = 0;

  const level: ThreatLevel = score >= 70 ? "critical" : score >= 35 ? "suspicious" : "safe";

  const redFlags = Array.from(redFlagsMap.values());
  const manipulationTactics = Array.from(tactics.values());

  const breakdown = buildBreakdown(level, redFlags, trimmed);
  const safeSteps = buildSafeSteps(level, redFlags);

  return {
    score,
    level,
    redFlags,
    highlights: dedupeHighlights(highlights),
    breakdown,
    manipulationTactics,
    safeSteps,
    originalText: trimmed,
  };
}

function dedupeHighlights(h: Highlight[]): Highlight[] {
  return h
    .sort((a, b) => a.start - b.start)
    .filter((cur, i, arr) => i === 0 || cur.start >= arr[i - 1].end);
}

function buildBreakdown(level: ThreatLevel, flags: RedFlag[], text: string): string[] {
  if (!text) return ["Paste a suspicious message above to start an analysis."];
  if (level === "safe" && flags.length === 0) {
    return [
      "The analyzer did not detect strong scam indicators in this message.",
      "Stay cautious — context matters. Verify the sender independently before acting on any request.",
    ];
  }
  const intro =
    level === "critical"
      ? "This message combines multiple high-risk patterns that are frequently seen in active phishing and fraud campaigns."
      : "This message contains patterns commonly used in social engineering attempts.";

  return [
    intro,
    flags.length
      ? `We detected ${flags.length} red flag${flags.length > 1 ? "s" : ""}, including ${flags
          .slice(0, 3)
          .map((f) => f.label)
          .join(", ")}.`
      : "While no single phrase is conclusive, the overall pattern raises concern.",
    "Scammers combine urgency, authority impersonation, and credential requests to bypass rational verification. Do not respond, click, or transfer money.",
  ];
}

function buildSafeSteps(level: ThreatLevel, flags: RedFlag[]): string[] {
  const base = [
    "Do not click any links or download attachments from this message.",
    "Do not share OTPs, passwords, PINs, or banking details.",
    "Verify the sender independently via the company's official website.",
  ];
  if (flags.some((f) => f.id === "telegram-whatsapp-redirect")) base.push("Refuse to move the conversation to Telegram or WhatsApp.");
  if (flags.some((f) => f.id === "upfront-payment-demand")) base.push("Never pay a 'registration' or 'security' fee for a job.");
  if (level !== "safe") base.push("Block the sender and report to your bank/cybercrime portal (cybercrime.gov.in in India).");
  return base;
}

// --- Recruiter verifier ---
export interface RecruiterCheck {
  trustScore: number;
  level: ThreatLevel;
  signals: { label: string; ok: boolean; detail: string }[];
}

const FREE_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "rediffmail.com", "proton.me"];

export function verifyRecruiter(input: { company: string; email: string; linkedin: string }): RecruiterCheck {
  const signals: RecruiterCheck["signals"] = [];
  let score = 70;

  const emailDomain = input.email.split("@")[1]?.toLowerCase() ?? "";
  const company = input.company.trim().toLowerCase();
  const linkedinOk = /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\//i.test(input.linkedin.trim());

  if (!emailDomain) {
    signals.push({ label: "Email format", ok: false, detail: "No valid email provided." });
    score -= 25;
  } else if (FREE_EMAIL_DOMAINS.includes(emailDomain)) {
    signals.push({ label: "Corporate email", ok: false, detail: `Recruiter is using a free email (${emailDomain}) instead of a company domain.` });
    score -= 30;
  } else if (company && !emailDomain.includes(company.split(" ")[0])) {
    signals.push({ label: "Domain matches company", ok: false, detail: `Email domain (${emailDomain}) does not match company name.` });
    score -= 15;
  } else {
    signals.push({ label: "Corporate email", ok: true, detail: `Uses a company domain (${emailDomain}).` });
  }

  if (/\.(xyz|top|click|work|monster|cyou)$/i.test(emailDomain)) {
    signals.push({ label: "Domain reputation", ok: false, detail: "Email uses a TLD frequently abused by scammers." });
    score -= 25;
  } else if (emailDomain) {
    signals.push({ label: "Domain reputation", ok: true, detail: "TLD is not on common abuse lists." });
  }

  signals.push(
    linkedinOk
      ? { label: "LinkedIn profile", ok: true, detail: "Valid LinkedIn URL format detected." }
      : { label: "LinkedIn profile", ok: false, detail: "LinkedIn URL is missing or malformed." }
  );
  if (!linkedinOk) score -= 15;

  if (!input.company.trim()) {
    signals.push({ label: "Company specified", ok: false, detail: "No company name provided." });
    score -= 10;
  }

  score = Math.max(0, Math.min(100, score));
  const level: ThreatLevel = score >= 70 ? "safe" : score >= 40 ? "suspicious" : "critical";
  return { trustScore: score, level, signals };
}
