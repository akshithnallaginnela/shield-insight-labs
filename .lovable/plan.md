# ScamShield AI — Build Plan

A premium dark-mode cybersecurity SaaS with mock AI handlers, glassmorphism UI, and four core surfaces.

## Design System (src/styles.css)
- Dark-only theme. Tokens in `oklch`:
  - `--background` deep slate (#0B0F19), `--foreground` near-white
  - `--primary` electric cyber blue, `--accent` neon purple
  - `--danger/--warning/--safe` for threat levels
  - Gradients: `--gradient-glow`, `--gradient-hero`; shadows: `--shadow-glow-blue`, `--shadow-glow-purple`
- Utility classes: `.glass-card` (backdrop-blur + border + subtle gradient), `.animated-border` (conic-gradient glow), `.grid-bg` (SVG grid), `.pulse-ring`, `.scan-line`
- Keyframes: `scan`, `pulse-glow`, `float`, `shimmer`, `fade-in-up`
- Font: Inter (already standard) with tighter tracking on headings

## Routes (TanStack Start, file-based)
```
src/routes/
  __root.tsx           (shared shell + nav + ambient bg)
  index.tsx            (Landing + inline analyzer CTA)
  analyze.tsx          (Analysis Dashboard — receives message via route search param or store)
  recruiter.tsx        (Recruiter Verifier)
  feed.tsx             (Community Threat Feed)
```
Each route gets unique `head()` meta (title, description, og:*).

## Shared Components
- `components/layout/Navbar.tsx` — logo, links, glow CTA
- `components/layout/AmbientBackground.tsx` — grid + floating particles + radial glows
- `components/ui/GlassCard.tsx` — reusable glass surface
- `components/ui/GlowButton.tsx` — animated primary button
- `components/ui/ThreatBadge.tsx` — severity pill (safe/suspicious/critical)
- `components/analyzer/MessageInput.tsx` — large textarea + upload + Analyze
- `components/analyzer/ScanningOverlay.tsx` — animated scan-line + staged status lines
- `components/analyzer/ProbabilityGauge.tsx` — SVG arc gauge, animated 0→score
- `components/analyzer/RedFlagsList.tsx`
- `components/analyzer/ThreatBreakdown.tsx` — highlights suspicious phrases in original text
- `components/analyzer/SafeStepsChecklist.tsx`
- `components/recruiter/VerifierForm.tsx` + `TrustScoreCard.tsx`
- `components/feed/ThreatFeedItem.tsx` + `FeedFilters.tsx`

## Mock AI Logic (`src/lib/mockAnalyzer.ts`)
Pure function `analyzeMessage(text: string)` returning:
- `score` 0–100, `level` safe|suspicious|critical
- `redFlags[]` keyed by keyword heuristics (urgency, OTP, payment, telegram/whatsapp links, suspicious TLDs, emotional triggers)
- `highlights[]` (substring ranges) for in-text underline
- `breakdown` paragraphs, `manipulationTactics[]`, `safeSteps[]`
Plus `verifyRecruiter({company,email,linkedin})` and a `seedFeed.ts` with ~20 community scam entries.

## Landing Page (index.tsx)
- Hero: headline, subheadline, integrated `MessageInput` card (textarea, upload screenshot stub, Analyze button)
- Trust strip: "10,000+ scams analyzed · Real-time detection · AI-powered"
- Features grid: 5 glass cards (Screenshot Analysis, Recruiter Verification, Community Feed, Emotional Manipulation Detection, Fake Domain Detection) — Lucide icons, hover glow
- Footer with brand + links

## Analyze Page
- On submit from landing, navigate to `/analyze` with text passed via Zustand store (`src/stores/analysisStore.ts`) to avoid huge URLs
- Two-column responsive (stack on mobile):
  - Left: `ProbabilityGauge`, `ThreatBadge`, `RedFlagsList` with animated badge entry
  - Right: `ThreatBreakdown` (original text with highlighted suspicious phrases), manipulation psychology section, `SafeStepsChecklist`
- `ScanningOverlay` plays for ~2s with staged messages before results

## Recruiter Page
- Form (company, recruiter email, LinkedIn URL) → mock trust score 0–100 with reasons (domain checks, pattern matches, name mismatches)
- Result card with gauge + signal list

## Community Feed Page
- Search input + category filter chips (WhatsApp, Telegram, Recruiter, Banking, Internship)
- Scrollable list of glass cards with severity dot, category badge, relative timestamp, description
- Seeded from `seedFeed.ts`

## State & Misc
- Zustand for `analysisStore` (message + result), tiny `feedFilters` state local
- Mobile-first: single-column stacks under `md`, sticky bottom Analyze on mobile landing
- Loading skeletons for gauge and breakdown; empty states for feed search
- No backend needed — all mock; no Lovable Cloud

## Out of Scope (this pass)
- Real AI / Cloud / auth
- Real screenshot OCR (button is a styled stub with toast)
- Persistence of user reports

Ready to build on approval.