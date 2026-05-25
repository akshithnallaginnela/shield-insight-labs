import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Sparkles, Check, X, Award, RotateCcw, Download, ShieldCheck } from "lucide-react";


export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Scam Awareness Quiz — ScamShield AI" },
      {
        name: "description",
        content: "Test your scam-spotting skills with real-world examples and earn a safety badge.",
      },
      { property: "og:title", content: "Scam Awareness Quiz — ScamShield AI" },
      {
        property: "og:description",
        content: "Test your scam-spotting skills with real-world examples and earn a safety badge.",
      },
    ],
  }),
  component: QuizPage,
});

interface Q {
  message: string;
  isScam: boolean;
  reason: string;
  source: string;
}

const QUESTIONS: Q[] = [
  {
    message:
      "Dear Customer, your HDFC account will be blocked today. Update KYC immediately at hdfc-verify.top/login",
    isScam: true,
    source: "SMS",
    reason:
      "Fear-based pressure, suspicious .top TLD, fake KYC pretext. Banks never ask for KYC via SMS links.",
  },
  {
    message:
      "Hi Anita, your Flipkart order #FK28291 has shipped. Track at flipkart.com/track/FK28291",
    isScam: false,
    source: "SMS",
    reason:
      "Uses real flipkart.com domain, no credential or payment request, personalised order ID.",
  },
  {
    message:
      "Congratulations! You are shortlisted for Amazon WFH role at ₹4,500/day. Pay ₹999 refundable registration fee to confirm.",
    isScam: true,
    source: "WhatsApp",
    reason: "Upfront payment for a job is the #1 recruitment scam signal. Real employers pay you.",
  },
  {
    message: "Your Google verification code is 458-129. Don't share this code with anyone.",
    isScam: false,
    source: "SMS",
    reason:
      "Legit Google security code with explicit warning. The code is FOR you, not for someone else to ask.",
  },
  {
    message:
      "Hello, I'm a recruiter from Microsoft. Please share your CV and Aadhaar at recruit.microsoft@gmail.com",
    isScam: true,
    source: "LinkedIn",
    reason:
      "Real Microsoft recruiters never use @gmail.com. Aadhaar should never be sent during initial screening.",
  },
  {
    message:
      "Reminder: Your electricity bill of ₹2,180 is due tomorrow. Pay via the official BESCOM app.",
    isScam: false,
    source: "SMS",
    reason:
      "Generic reminder pointing to official app. No urgent threat, no APK link, no payment request to a personal number.",
  },
  {
    message:
      "URGENT! Your parcel is held at FedEx customs. Call +91 8888XXXXX within 1 hour or it will be destroyed.",
    isScam: true,
    source: "SMS",
    reason:
      "Manufactured urgency, calls to a personal number, and customs scams typically end in UPI transfers.",
  },
  {
    message: "Your IRCTC ticket PNR 2854198321 is confirmed. Coach S5, Berth 42.",
    isScam: false,
    source: "SMS",
    reason: "Plain informational message with no link or action required.",
  },
];

function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]); // correct?
  const [picks, setPicks] = useState<boolean[]>([]); // what user picked
  const [selected, setSelected] = useState<null | boolean>(null);
  const [recipientName, setRecipientName] = useState("");
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef<SVGSVGElement>(null);


  const done = step >= QUESTIONS.length;
  const score = answers.filter(Boolean).length;
  const current = !done ? QUESTIONS[step] : null;

  const badge = useMemo(() => {
    const pct = (score / QUESTIONS.length) * 100;
    if (pct >= 90) return { label: "Cyber Sentinel", tone: "text-primary" };
    if (pct >= 70) return { label: "Threat Hunter", tone: "text-accent" };
    if (pct >= 50) return { label: "Vigilant Citizen", tone: "text-safe" };
    return { label: "Apprentice — keep learning!", tone: "text-warning" };
  }, [score]);

  const choose = (guess: boolean) => {
    if (!current || selected !== null) return;
    setSelected(guess);
  };

  const next = () => {
    if (!current || selected === null) return;
    setAnswers((a) => [...a, selected === current.isScam]);
    setPicks((p) => [...p, selected]);
    setSelected(null);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setPicks([]);
    setSelected(null);
  };

  const issuedOn = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [done],
  );
  const certId = useMemo(
    () => `SSAI-${Math.random().toString(36).slice(2, 8).toUpperCase()}-${score}${QUESTIONS.length}`,
    [done],
  );
  const displayName = recipientName.trim() || "Cybersecurity Trainee";

  const downloadCertificate = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const svg = certRef.current;
      const xml = new XMLSerializer().serializeToString(svg);
      const svg64 = btoa(unescape(encodeURIComponent(xml)));
      const dataUrl = `data:image/svg+xml;base64,${svg64}`;
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("img load"));
        img.src = dataUrl;
      });
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = 1100;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas ctx");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const link = document.createElement("a");
      link.download = `scamshield-certificate-${certId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  };


  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 md:px-6 md:pt-14">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
          <Sparkles className="h-3 w-3" /> Scam Awareness Quiz
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
          Real or <span className="text-gradient">Scam?</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          8 real-world messages. Spot the scams. Earn your safety badge.
        </p>
      </div>

      {/* Progress */}
      <div className="mt-8">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground">
          <span>{done ? "Complete" : `Question ${step + 1} of ${QUESTIONS.length}`}</span>
          <span>Score: {score}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-brand transition-all duration-500"
            style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      {current && (
        <div className="glass-card animated-border mt-6 rounded-2xl p-6 md:p-8 animate-fade-up">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Source · {current.source}
          </p>
          <blockquote className="mt-3 rounded-xl border border-border bg-white/70 p-4 text-sm leading-relaxed text-foreground md:text-base">
            "{current.message}"
          </blockquote>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={() => choose(false)}
              disabled={selected !== null}
              className={`rounded-xl border-2 px-4 py-4 text-sm font-semibold transition ${
                selected === null
                  ? "border-safe/30 bg-safe/5 text-safe hover:border-safe hover:bg-safe/10"
                  : selected === false
                    ? current.isScam
                      ? "border-danger bg-danger/10 text-danger"
                      : "border-safe bg-safe/10 text-safe"
                    : "border-border bg-white/40 text-muted-foreground opacity-60"
              }`}
            >
              <Check className="mx-auto mb-1 h-5 w-5" />
              Looks Safe
            </button>
            <button
              onClick={() => choose(true)}
              disabled={selected !== null}
              className={`rounded-xl border-2 px-4 py-4 text-sm font-semibold transition ${
                selected === null
                  ? "border-danger/30 bg-danger/5 text-danger hover:border-danger hover:bg-danger/10"
                  : selected === true
                    ? current.isScam
                      ? "border-safe bg-safe/10 text-safe"
                      : "border-danger bg-danger/10 text-danger"
                    : "border-border bg-white/40 text-muted-foreground opacity-60"
              }`}
            >
              <X className="mx-auto mb-1 h-5 w-5" />
              It's a Scam
            </button>
          </div>

          {selected !== null && (
            <div
              className={`mt-5 rounded-xl border p-4 animate-fade-up ${selected === current.isScam ? "border-safe/40 bg-safe/10" : "border-danger/40 bg-danger/10"}`}
            >
              <p
                className={`text-sm font-semibold ${selected === current.isScam ? "text-safe" : "text-danger"}`}
              >
                {selected === current.isScam ? "Correct!" : "Not quite."}{" "}
                {current.isScam ? "This is a scam." : "This one is legitimate."}
              </p>
              <p className="mt-1 text-sm text-foreground/80">{current.reason}</p>
              <button
                onClick={next}
                className="mt-3 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white"
              >
                {step + 1 < QUESTIONS.length ? "Next question →" : "See my result"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Result */}
      {done && (
        <>
          <div className="glass-card animated-border mt-8 rounded-2xl p-8 text-center animate-fade-up">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.6)]">
              <Award className="h-7 w-7" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Your badge
            </p>
            <h2 className={`mt-1 font-display text-3xl font-bold ${badge.tone}`}>{badge.label}</h2>
            <p className="mt-3 font-mono text-5xl font-semibold tabular-nums text-foreground">
              {score}
              <span className="text-xl text-muted-foreground">/{QUESTIONS.length}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              You spotted {score} of {QUESTIONS.length} threats correctly.
            </p>
            <button
              onClick={reset}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-white/70 px-4 py-2 text-sm font-medium hover:bg-white"
            >
              <RotateCcw className="h-4 w-4" /> Try again
            </button>
          </div>

          {/* Answers summary */}
          <div className="glass-card mt-6 rounded-2xl p-6 animate-fade-up md:p-8">
            <h3 className="font-display text-xl font-semibold text-foreground">Your answers</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Review every question, your pick, and the correct call.
            </p>
            <ol className="mt-5 space-y-3">
              {QUESTIONS.map((q, i) => {
                const pick = picks[i];
                const correct = answers[i];
                return (
                  <li
                    key={i}
                    className={`rounded-xl border p-4 ${
                      correct ? "border-safe/30 bg-safe/5" : "border-danger/30 bg-danger/5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        <span className="font-mono">Q{i + 1}</span>
                        <span>·</span>
                        <span>{q.source}</span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          correct ? "bg-safe/15 text-safe" : "bg-danger/15 text-danger"
                        }`}
                      >
                        {correct ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        {correct ? "Correct" : "Missed"}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-foreground/90">"{q.message}"</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-lg border border-border bg-white/60 px-3 py-2">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">You picked</p>
                        <p className="mt-0.5 font-semibold text-foreground">
                          {pick ? "It's a Scam" : "Looks Safe"}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border bg-white/60 px-3 py-2">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Correct</p>
                        <p className="mt-0.5 font-semibold text-foreground">
                          {q.isScam ? "It's a Scam" : "Looks Safe"}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{q.reason}</p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Certificate */}
          <div className="glass-card mt-6 rounded-2xl p-6 animate-fade-up md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Your certificate
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add your name and download a shareable image.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value.slice(0, 40))}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-border bg-white/80 px-3 py-2 text-sm outline-none focus:border-primary sm:w-56"
                />
                <button
                  onClick={downloadCertificate}
                  disabled={downloading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  {downloading ? "Preparing…" : "Download PNG"}
                </button>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-border bg-white">
              <svg
                ref={certRef}
                viewBox="0 0 1600 1100"
                xmlns="http://www.w3.org/2000/svg"
                className="block h-auto w-full"
              >
                <defs>
                  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="100%" stopColor="#eef2ff" />
                  </linearGradient>
                  <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <rect width="1600" height="1100" fill="url(#bg)" />
                <rect x="40" y="40" width="1520" height="1020" rx="28" fill="white" stroke="#e2e8f0" strokeWidth="2" />
                <rect x="40" y="40" width="1520" height="10" fill="url(#brand)" />
                <rect x="40" y="1050" width="1520" height="10" fill="url(#brand)" />

                <g transform="translate(800,170)">
                  <circle r="48" fill="url(#brand)" />
                  <path d="M -18 -4 L -4 12 L 22 -14" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                <text x="800" y="270" textAnchor="middle" fontFamily="Sora, system-ui, sans-serif" fontSize="22" fill="#64748b" letterSpacing="6">
                  SCAMSHIELD AI
                </text>
                <text x="800" y="340" textAnchor="middle" fontFamily="Sora, system-ui, sans-serif" fontSize="56" fontWeight="700" fill="#0f172a">
                  Certificate of Achievement
                </text>
                <text x="800" y="395" textAnchor="middle" fontFamily="Manrope, system-ui, sans-serif" fontSize="20" fill="#64748b">
                  Scam Awareness Quiz · Issued {issuedOn}
                </text>

                <text x="800" y="475" textAnchor="middle" fontFamily="Manrope, system-ui, sans-serif" fontSize="22" fill="#475569">
                  This certifies that
                </text>
                <text x="800" y="555" textAnchor="middle" fontFamily="Sora, system-ui, sans-serif" fontSize="68" fontWeight="700" fill="#1e293b">
                  {displayName}
                </text>
                <line x1="500" y1="585" x2="1100" y2="585" stroke="#cbd5e1" strokeWidth="2" />

                <text x="800" y="650" textAnchor="middle" fontFamily="Manrope, system-ui, sans-serif" fontSize="22" fill="#475569">
                  has successfully completed the ScamShield AI awareness assessment,
                </text>
                <text x="800" y="685" textAnchor="middle" fontFamily="Manrope, system-ui, sans-serif" fontSize="22" fill="#475569">
                  identifying phishing, recruiter fraud, and social engineering threats.
                </text>

                <g transform="translate(800,820)">
                  <rect x="-280" y="-70" width="260" height="140" rx="16" fill="#f1f5f9" />
                  <text x="-150" y="-30" textAnchor="middle" fontFamily="Manrope" fontSize="16" fill="#64748b" letterSpacing="3">SCORE</text>
                  <text x="-150" y="30" textAnchor="middle" fontFamily="Sora" fontSize="56" fontWeight="700" fill="#0f172a">
                    {score}/{QUESTIONS.length}
                  </text>

                  <rect x="20" y="-70" width="260" height="140" rx="16" fill="url(#brand)" />
                  <text x="150" y="-30" textAnchor="middle" fontFamily="Manrope" fontSize="16" fill="#e0e7ff" letterSpacing="3">BADGE</text>
                  <text x="150" y="20" textAnchor="middle" fontFamily="Sora" fontSize="26" fontWeight="700" fill="white">
                    {badge.label.replace(" — keep learning!", "")}
                  </text>
                  <text x="150" y="50" textAnchor="middle" fontFamily="Manrope" fontSize="14" fill="#e0e7ff">
                    {Math.round((score / QUESTIONS.length) * 100)}% accuracy
                  </text>
                </g>

                <text x="80" y="1010" fontFamily="Manrope" fontSize="14" fill="#64748b">
                  Certificate ID · {certId}
                </text>
                <text x="1520" y="1010" textAnchor="end" fontFamily="Manrope" fontSize="14" fill="#64748b">
                  scamshield.ai · Verify integrity, not identity
                </text>
              </svg>
            </div>

            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              The certificate is generated locally on your device — your name is never sent anywhere.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
