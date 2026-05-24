# Release 2.0.0 — Human Intelligence Detection

Date: 2026-05-24

Summary

- Version: 2.0.0
- Type: Major feature release with multi-layer scam analysis (psychology, behavior, linguistics, and scam-type classification).

What this release includes

- Psychology manipulation analyzer with 15 tactics and weighted scoring.
- Behavioral anomaly detection for channel hopping, verification avoidance, and suspicious domains.
- Linguistic analysis for tone shifts, grammar anomalies, and template indicators.
- Scam type classifier covering romance, investment, tech support, identity theft, phishing, and more.
- Enhanced analysis UI showing psychological, behavioral, linguistic, and classification panels.
- Combined scoring model that blends legacy patterns with the new analyzers.

Testing this release

1. Install dependencies:

```bash
npm install
```

2. Run checks:

```bash
npm run lint
npm run build
```

3. Start the dev server:

```bash
npm run dev
```

Suggested sample messages are in `LAUNCH_TONIGHT_v2.0.md`.

---

# Release 0.1.0-prototype — First Prototype

Date: 2026-05-24

Summary

- Version: 0.1.0-prototype
- Type: First prototype release with minimal detection logic and simple UI flow.

What this release includes

- Basic message analysis engine implemented in `src/lib/mockAnalyzer.ts`.
  - Pattern-based detection using regexes for urgency, credential requests, suspicious domains, payment demands, redirect links, and common scam phrases.
  - Scoring system that produces a `score` (0-100) and `level` (`safe`, `suspicious`, `critical`).
  - Red-flag extraction, highlights, breakdown text, manipulation tactics and safe-step suggestions.
- Frontend analysis page at `/analyze` using `analyzeMessage` and the UI components in `src/components/analyzer/`.
- Simple recruiter verifier in `verifyRecruiter()` for quick checks of recruiter emails and LinkedIn links.

Known limitations (minimal efficiency)

- Rule-based engine only — no ML models or threat intelligence integrations.
- Regex patterns are intentionally conservative and may produce false positives/negatives.
- No rate limiting, logging, telemetry, or persistence for analyses.
- No automated CI release or git tagging included — release artifacts must be created manually.

Security & Privacy notes

- The analysis is performed locally in the app; no external API calls are made by default in this prototype.
- Do not paste highly sensitive secrets; the demo stores nothing persistently but avoid sharing OTPs or passwords.

Testing this release

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
# open http://localhost:8080/analyze
```

3. Paste suspicious messages into the analyzer UI or call `analyzeMessage()` programmatically.

Suggested sample messages:

- "URGENT: Your account will be suspended today. Click https://bit.ly/fake and enter the OTP sent to reactivate."
- "You have been shortlisted! Pay a refundable registration fee of ₹500 to secure your spot."
- "Work from home, earn $500 daily, no experience required — contact +919876543210 on WhatsApp."

How to create a manual git release (local)

- Tag the commit and push the tag:

```bash
git tag -a v0.1.0-prototype -m "First prototype release"
git push origin v0.1.0-prototype
```

Next steps

- Replace rule-based detection with a lightweight ML model or augment with heuristic scoring based on real incident data.
- Add telemetry, tests, and CI/CD for automated release tagging and publishing.
- Add thorough unit tests for `analyzeMessage()` and `verifyRecruiter()`.

Contacts

- Maintainers: see `package.json` and repository owners.
