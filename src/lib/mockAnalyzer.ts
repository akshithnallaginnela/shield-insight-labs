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

const PATTERNS: {
  regex: RegExp;
  flag: Omit<RedFlag, "id">;
  weight: number;
  tactic?: { name: string; explanation: string };
}[] = [
  {
    regex: /\b(urgent|immediately|expires? (in|today)|last chance|act now|within \d+ ?(min|hour|hr))/gi,
    flag: { label: "Urgency Tactics", description: "Creates artificial time pressure to bypass rational thinking.", severity: "high" },
    weight: 22,
    tactic: { name: "Scarcity & Urgency", explanation: "Scammers create false deadlines so victims act before verifying." },
  },
  {
    regex: /\b(otp|one[- ]time password|verification code|cvv|pin)\b/gi,
    flag: { label: "Credential Request", description: "Asks for OTP, PIN or verification codes — legitimate companies never do this.", severity: "high" },
    weight: 28,
    tactic: { name: "Authority Impersonation", explanation: "Pretends to be a bank/recruiter to extract sensitive credentials." },
  },
  {
    regex: /\b(registration fee|processing fee|security deposit|refundable|pay (₹|rs\.?|inr|\$)\s?\d+)/gi,
    flag: { label: "Upfront Payment Demand", description: "Real employers and banks do not ask for upfront payments.", severity: "high" },
    weight: 26,
  },
  {
    regex: /(t\.me\/|telegram|wa\.me\/|whatsapp(\.com)?\/|\+\d{10,})/gi,
    flag: { label: "Telegram/WhatsApp Redirect", description: "Moves conversation to encrypted apps to avoid moderation.", severity: "medium" },
    weight: 14,
  },
  {
    regex: /https?:\/\/[^\s]*\.(xyz|top|click|work|monster|cyou|loan|zip|tk|ml)\b/gi,
    flag: { label: "Suspicious Domain", description: "Link uses a TLD frequently abused by phishing kits.", severity: "high" },
    weight: 20,
  },
  {
    regex: /\b(bit\.ly|tinyurl|cutt\.ly|rb\.gy|shorturl|t\.co)\b/gi,
    flag: { label: "Shortened Link", description: "Shortened URLs hide the real destination from victims.", severity: "medium" },
    weight: 12,
  },
  {
    regex: /\b(work from home|part[- ]time job|daily (income|earning)|earn (₹|rs\.?|\$)\s?\d{2,}|easy money|no experience)/gi,
    flag: { label: "Too-Good-To-Be-True Offer", description: "Unrealistic compensation is a hallmark of task & job scams.", severity: "medium" },
    weight: 16,
    tactic: { name: "Greed Exploitation", explanation: "Promises outsized rewards to override critical thinking." },
  },
  {
    regex: /\b(congratulations|you (have )?won|selected|shortlisted|lucky winner|lottery)\b/gi,
    flag: { label: "Fake Verification Request", description: "False selection notices used to harvest data.", severity: "medium" },
    weight: 14,
  },
  {
    regex: /\b(dear (sir|madam|customer|user)|valued customer)\b/gi,
    flag: { label: "Generic Greeting", description: "Legitimate companies address you by name.", severity: "low" },
    weight: 6,
  },
  {
    regex: /\b(account (will be )?(blocked|suspended)|kyc (update|expired)|frozen)\b/gi,
    flag: { label: "Fear-Based Pressure", description: "Threatens account loss to force a click.", severity: "high" },
    weight: 22,
    tactic: { name: "Loss Aversion", explanation: "Threatens loss of access so the victim acts to 'protect' themselves." },
  },
];

export function analyzeMessage(text: string): AnalysisResult {
  const trimmed = text.trim();
  const highlights: Highlight[] = [];
  const redFlagsMap = new Map<string, RedFlag>();
  const tactics = new Map<string, { name: string; explanation: string }>();
  let score = 0;

  for (const p of PATTERNS) {
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
      score += p.weight;
      if (p.tactic) tactics.set(p.tactic.name, p.tactic);
    }
  }

  // Length / link density boost
  const linkCount = (trimmed.match(/https?:\/\//g) || []).length;
  if (linkCount >= 2) score += 6;
  if (/[!]{2,}/.test(trimmed) || /[A-Z]{6,}/.test(trimmed)) score += 4;

  score = Math.max(0, Math.min(100, score));
  if (!trimmed) score = 0;

  const level: ThreatLevel = score >= 65 ? "critical" : score >= 30 ? "suspicious" : "safe";

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
      "Our models did not detect strong scam indicators in this message.",
      "Stay cautious — context matters. Verify the sender independently before acting on any request.",
    ];
  }
  const intro =
    level === "critical"
      ? "This message exhibits multiple high-risk patterns consistent with active phishing and fraud campaigns."
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
