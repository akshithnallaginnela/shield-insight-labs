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
    setSelected(null);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
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
      )}
    </div>
  );
}
