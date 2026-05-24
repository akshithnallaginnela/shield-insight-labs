# Public-Domain Manual Test Cases (Deployed App)

Use this checklist to validate the currently deployed ScamShield AI app from a public user perspective.

> Environment: production deployment URL
> Browser baseline: latest Chrome (repeat smoke in Edge/Firefox)

## A) Core Navigation & Access

- [ ] **Home page loads**
  - **Steps:** Open the deployed URL.
  - **Expected:** Landing page renders without errors; navbar and footer are visible.

- [ ] **Route navigation**
  - **Steps:** Click each nav link: Analyzer, Link Scanner, Recruiter, Threat Feed, Quiz, Report.
  - **Expected:** Correct page opens each time; no blank screen or JS crash.

- [ ] **404 handling**
  - **Steps:** Visit `/<random-invalid-route>`.
  - **Expected:** Friendly 404 view appears with a **Back to safety** action.

## B) Analyzer (`/analyze`)

- [ ] **Empty submit blocked**
  - **Steps:** Leave message empty and click **Analyze**.
  - **Expected:** Analysis does not start.

- [ ] **Known scam text**
  - **Steps:** Input: `Pay ₹999 registration fee… send OTP… urgent.` then analyze.
  - **Expected:** High score; verdict suspicious/critical; red flags include payment/OTP/urgency patterns.

- [ ] **Likely safe text**
  - **Steps:** Input: `Your order has shipped. Track at official domain.` then analyze.
  - **Expected:** Lower score; verdict trends safe/low suspicious.

- [ ] **Sample button flow**
  - **Steps:** Click **Try a sample**, then analyze.
  - **Expected:** Message auto-fills and analysis runs.

- [ ] **Reset flow**
  - **Steps:** After seeing a result, click **Analyze another message**.
  - **Expected:** Prior result clears and fresh input flow starts.

- [ ] **Share tools**
  - **Steps:** On result view, click **Copy text** and **Download**.
  - **Expected:** Copy confirmation is shown; PNG download succeeds.

## C) Link Scanner (`/link-scanner`)

- [ ] **Invalid URL handling**
  - **Steps:** Input `not-a-url###` and scan.
  - **Expected:** Validation error appears.

- [ ] **Suspicious link detection**
  - **Steps:** Input `hdfc-rewards.top/login` and scan.
  - **Expected:** Elevated risk score with suspicious TLD signal.

- [ ] **Shortener detection**
  - **Steps:** Input `https://bit.ly/abc123` and scan.
  - **Expected:** URL shortener warning and redirect-chain details appear.

- [ ] **Safe domain check**
  - **Steps:** Input `https://google.com` and scan.
  - **Expected:** Lower risk profile relative to suspicious examples.

## D) Recruiter Verifier (`/recruiter`)

- [ ] **Free email risk**
  - **Steps:** Company: `Microsoft`, Email: `recruit.microsoft@gmail.com`, valid LinkedIn URL.
  - **Expected:** Lower trust score with free-email/domain mismatch concerns.

- [ ] **Valid corporate profile**
  - **Steps:** Use matching company name + corporate email + proper LinkedIn URL.
  - **Expected:** Higher trust score with mostly positive signals.

- [ ] **Missing/malformed LinkedIn**
  - **Steps:** Leave LinkedIn empty or enter malformed URL.
  - **Expected:** LinkedIn signal degrades trust score.

## E) Threat Feed & Report

- [ ] **Feed search/filter**
  - **Steps:** Search by keyword and apply category filter chips.
  - **Expected:** Results narrow correctly; no unrelated entries.

- [ ] **Report submission**
  - **Steps:** Submit a report with title and description.
  - **Expected:** Success state appears.

- [ ] **Report reflected in feed**
  - **Steps:** Navigate to Threat Feed after submit.
  - **Expected:** New report appears in the feed.

- [ ] **Reload persistence**
  - **Steps:** Refresh feed page in the same browser.
  - **Expected:** Submitted report remains visible (local browser storage behavior).

## F) Quiz (`/quiz`)

- [ ] **Quiz progression**
  - **Steps:** Answer all questions.
  - **Expected:** Progress advances and final badge/result appears.

- [ ] **Answer feedback**
  - **Steps:** Select an answer per question.
  - **Expected:** Immediate correctness feedback and explanation appears.

- [ ] **Retry flow**
  - **Steps:** Click **Try again** after completion.
  - **Expected:** Quiz resets to question 1 and score resets.

## G) Cross-Browser & Mobile Sanity

- [ ] **Mobile responsiveness**
  - **Steps:** Test in a mobile viewport.
  - **Expected:** Layout remains usable; navigation and controls are accessible; no overlap/cutoff.

- [ ] **Cross-browser smoke**
  - **Steps:** Run core user flows in Chrome + Edge/Firefox.
  - **Expected:** No major UI/functionality differences.

---

## Optional Execution Log Template

| Test ID | Status (Pass/Fail/Blocked) | Evidence (URL/Screenshot) | Severity if Failed | Notes |
| ------- | -------------------------- | ------------------------- | ------------------ | ----- |
| A1      |                            |                           |                    |       |
| A2      |                            |                           |                    |       |
| ...     |                            |                           |                    |       |
