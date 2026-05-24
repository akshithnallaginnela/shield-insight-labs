# 🚀 ScamShield AI v2.0 - LAUNCH TONIGHT PLAN
## Compressed 8-Week Plan → Tonight (6-8 Hours Sprint)

**Goal:** Deploy v2.0 Core with Human Intelligence Detection by end of night

---

## ⚡ WHAT WE'LL BUILD TONIGHT

✅ **Psychology Detection Engine** - 15 manipulation tactics  
✅ **Behavioral Anomaly Detection** - 9 red flag patterns  
✅ **Linguistic Analysis** - Grammar, tone, vocabulary issues  
✅ **Scam Type Classification** - Romance, Investment, Tech Support, Identity Theft, Phishing  
✅ **Enhanced UI** - Display all findings with human-readable explanations  
✅ **Community Integration** - Basic threat feed structure  
✅ **Testing** - Validate on real scam messages  

**NOT Tonight (Phase 2):** Full backend, ML models, real-time APIs, user accounts

---

## 📋 TIMELINE & TASK BREAKDOWN

### PHASE 1: Core Detection Engines (2-3 Hours)
**Status:** Not started  
**Tasks:**
- [ ] Create psychology analyzer (30 min)
- [ ] Create behavioral analyzer (30 min)
- [ ] Create linguistic analyzer (30 min)
- [ ] Create scam type classifier (30 min)
- [ ] Integrate with existing analyzer (30 min)

### PHASE 2: Frontend Integration (1-2 Hours)
**Status:** Not started  
**Tasks:**
- [ ] Create Psychology Breakdown component (30 min)
- [ ] Create Behavioral Analysis component (30 min)
- [ ] Create Scam Classification component (20 min)
- [ ] Update AnalyzePage to display all (10 min)
- [ ] Update ThreatBreakdown to use new data (20 min)

### PHASE 3: Testing & Refinement (1 Hour)
**Status:** Not started  
**Tasks:**
- [ ] Test with 10 scam messages (15 min)
- [ ] Test with 10 legitimate messages (15 min)
- [ ] Adjust scores & thresholds (15 min)
- [ ] Fix bugs & UI issues (15 min)

### PHASE 4: Launch Checklist (30 min)
**Status:** Not started  
**Tasks:**
- [ ] Update package.json version to v2.0.0
- [ ] Update README with new features
- [ ] Create v2.0 release notes
- [ ] Deploy to production
- [ ] Test live deployment

---

## 🎯 IMMEDIATE ACTION ITEMS (Start Now!)

### TASK 1: Create Psychological Manipulation Analyzer
**Time: 30 minutes**
**File:** `src/lib/psychology/manipulationAnalyzer.ts`

```typescript
export interface PsychologicalTactic {
  tactic: string;
  score: number; // 0-100 intensity
  evidence: string[]; // phrases that triggered it
  category: 'fear' | 'greed' | 'authority' | 'trust' | 'confusion' | 'urgency';
  explanation: string;
  severity: 'low' | 'medium' | 'high';
}

export function analyzePsychology(text: string): PsychologicalTactic[] {
  const tactics: PsychologicalTactic[] = [];
  const lowerText = text.toLowerCase();

  // 1. ARTIFICIAL URGENCY
  const urgencyPatterns = /\b(urgent|immediately|act now|limited time|expires?|last chance|within \d+ (min|hour)|hurry|asap)\b/gi;
  if (urgencyPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Artificial Urgency',
      score: 22,
      evidence: text.match(urgencyPatterns) || [],
      category: 'urgency',
      explanation: 'Uses time pressure to make you act without thinking',
      severity: 'high'
    });
  }

  // 2. FEAR & THREAT
  const fearPatterns = /\b(account (will be |)blocked|suspended|frozen|kyc expired|funds frozen|legal action|police|lawsuit|permanent ban)\b/gi;
  if (fearPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Fear & Account Loss Threat',
      score: 22,
      evidence: text.match(fearPatterns) || [],
      category: 'fear',
      explanation: 'Threatens account closure to force immediate action',
      severity: 'high'
    });
  }

  // 3. GREED EXPLOITATION
  const greedPatterns = /\b(easy money|no experience|guaranteed returns?|unlimited income|daily income|passive income|work from home|earn ₹|quick cash|100% profit)\b/gi;
  if (greedPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Greed Exploitation',
      score: 18,
      evidence: text.match(greedPatterns) || [],
      category: 'greed',
      explanation: 'Promises unrealistic financial rewards with minimal effort',
      severity: 'high'
    });
  }

  // 4. FALSE AUTHORITY
  const authorityPatterns = /\b(bank official|police|government|ceo|director|manager|compliance team|security team|official|authorized)\b/gi;
  if (authorityPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'False Authority',
      score: 20,
      evidence: text.match(authorityPatterns) || [],
      category: 'authority',
      explanation: 'Impersonates legitimate authority figures',
      severity: 'high'
    });
  }

  // 5. CREDENTIAL REQUEST
  const credentialPatterns = /\b(otp|password|cvv|pin|verify|confirm|credential|secret code|one-time password|aadhar|pan|bank details|account number|card details)\b/gi;
  if (credentialPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Sensitive Credential Request',
      score: 28,
      evidence: text.match(credentialPatterns) || [],
      category: 'trust',
      explanation: 'Requests sensitive information no legitimate entity would ask for',
      severity: 'high'
    });
  }

  // 6. SOCIAL PROOF
  const socialProofPatterns = /\b(10,?000\+ |everyone|all|trusted by millions|already joined|you're the only one|most popular|best rated)\b/gi;
  if (socialProofPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'False Social Proof',
      score: 14,
      evidence: text.match(socialProofPatterns) || [],
      category: 'trust',
      explanation: 'Claims widespread adoption to seem legitimate',
      severity: 'medium'
    });
  }

  // 7. SCARCITY PRESSURE
  const scarcityPatterns = /\b(only \d+ (slots|places|seats)|limited availability|exclusive|first come first served|hurry|slots filling fast)\b/gi;
  if (scarcityPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Artificial Scarcity',
      score: 16,
      evidence: text.match(scarcityPatterns) || [],
      category: 'urgency',
      explanation: 'Creates fear of missing out by claiming limited availability',
      severity: 'medium'
    });
  }

  // 8. RECIPROCITY EXPLOITATION
  const reciprocityPatterns = /\b(we (have |)helped you|you owe us|as a favor|in return|we need your help|give back)\b/gi;
  if (reciprocityPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Reciprocity Exploitation',
      score: 14,
      evidence: text.match(reciprocityPatterns) || [],
      category: 'trust',
      explanation: 'Claims prior help to obligate you to reciprocate',
      severity: 'medium'
    });
  }

  // 9. COMMITMENT ESCALATION
  const escalationPatterns = /\b(just verify once|small fee first|test withdrawal|try it out|free trial|no risk)\b/gi;
  if (escalationPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Commitment Escalation',
      score: 18,
      evidence: text.match(escalationPatterns) || [],
      category: 'trust',
      explanation: 'Starts with small request to build trust before larger asks',
      severity: 'medium'
    });
  }

  // 10. AUTHORITY CLONING
  const cloningPatterns = /\b(official|verified|official channel|official page|official account|real account|authentic|certified|legitimate)\b/gi;
  if (cloningPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Authority Cloning',
      score: 16,
      evidence: text.match(cloningPatterns) || [],
      category: 'authority',
      explanation: 'Claims to be official/verified when they\'re not',
      severity: 'medium'
    });
  }

  // 11. CURIOSITY EXPLOITATION
  const curiosityPatterns = /\b(click here|tap here|see more|shocking|unbelievable|you won't believe|reveal|secret|discover|exclusive)\b/gi;
  if (curiosityPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Curiosity Exploitation',
      score: 12,
      evidence: text.match(curiosityPatterns) || [],
      category: 'confusion',
      explanation: 'Uses curiosity to get you to click/engage',
      severity: 'medium'
    });
  }

  // 12. ROMANCE/RELATIONSHIP BUILDING
  const romancePatterns = /\b(i love you|i miss you|let me help you|i care about you|let's be friends|marry|relationship|dating|feelings)\b/gi;
  if (romancePatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Romance/Relationship Building',
      score: 20,
      evidence: text.match(romancePatterns) || [],
      category: 'trust',
      explanation: 'Builds emotional connection before exploitation',
      severity: 'high'
    });
  }

  // 13. LOSS AVERSION
  const lossPatterns = /\b(don't miss out|you'll regret|everyone else (knows|has)|don't be left behind|act before it's gone)\b/gi;
  if (lossPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Loss Aversion',
      score: 16,
      evidence: text.match(lossPatterns) || [],
      category: 'fear',
      explanation: 'Makes you fear missing opportunity more than gaining something',
      severity: 'medium'
    });
  }

  // 14. TECHNICAL CONFUSION
  const technicalPatterns = /\b(update required|security alert|system maintenance|verify account|unusual activity detected|confirm identity)\b/gi;
  if (technicalPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Technical Confusion',
      score: 18,
      evidence: text.match(technicalPatterns) || [],
      category: 'confusion',
      explanation: 'Uses technical language to confuse and manipulate',
      severity: 'high'
    });
  }

  // 15. UPFRONT PAYMENT
  const paymentPatterns = /\b(registration fee|processing fee|security deposit|pay ₹|pay usd|payment required|send money|transfer funds)\b/gi;
  if (paymentPatterns.test(lowerText)) {
    tactics.push({
      tactic: 'Upfront Payment Request',
      score: 26,
      evidence: text.match(paymentPatterns) || [],
      category: 'greed',
      explanation: 'Requests payment upfront - red flag for scams',
      severity: 'high'
    });
  }

  return tactics;
}

export function calculatePsychologyScore(tactics: PsychologicalTactic[]): number {
  let score = 0;
  const highSeverity = tactics.filter(t => t.severity === 'high').length;
  const mediumSeverity = tactics.filter(t => t.severity === 'medium').length;

  // Base scores
  tactics.forEach(t => {
    score += t.score;
  });

  // Multipliers for multiple high-severity tactics
  if (highSeverity >= 3) score *= 1.3;
  if (highSeverity >= 5) score *= 1.5;

  return Math.min(score, 100);
}
```

---

### TASK 2: Create Behavioral Analyzer
**Time: 30 minutes**
**File:** `src/lib/psychology/behavioralAnalyzer.ts`

```typescript
export interface BehavioralAnomaly {
  anomaly: string;
  severity: 'low' | 'medium' | 'high';
  explanation: string;
  evidence: string;
}

export function analyzeBehavior(text: string): BehavioralAnomaly[] {
  const anomalies: BehavioralAnomaly[] = [];
  const lowerText = text.toLowerCase();

  // 1. GENERIC/IMPERSONAL ADDRESSING
  if (/\b(dear sir|dear madam|dear customer|valued customer|hello there|hi there|dear user)\b/i.test(text)) {
    anomalies.push({
      anomaly: 'Generic/Impersonal Addressing',
      severity: 'medium',
      explanation: 'Uses generic greetings indicating mass targeting, not personalized communication',
      evidence: text.match(/dear sir|dear madam|valued customer/i)?.[0] || ''
    });
  }

  // 2. CHANNEL HOPPING
  if (/\b(whatsapp|telegram|t\.me|wa\.me|dm me|contact me on)\b/i.test(text)) {
    anomalies.push({
      anomaly: 'Channel Switching/Hopping',
      severity: 'high',
      explanation: 'Moves conversation to encrypted channels to avoid audit trails',
      evidence: text.match(/whatsapp|telegram|contact me/i)?.[0] || ''
    });
  }

  // 3. GRAMMAR & TYPOS (Non-native language indicator)
  const typoCount = (text.match(/\b(ur|u r|dont|wanna|gonna|thier|recieve|occured)\b/gi) || []).length;
  if (typoCount >= 2 || /\b[a-z]\b/.test(text)) { // Single letter words often typos
    anomalies.push({
      anomaly: 'Grammar Issues/Typos',
      severity: 'low',
      explanation: 'Multiple typos suggest non-native speaker or mass template',
      evidence: `Found ${typoCount} suspicious patterns`
    });
  }

  // 4. EXCESSIVE CAPS/EXCITEMENT
  const capsCount = (text.match(/[A-Z]{4,}/g) || []).length;
  const exclamationCount = (text.match(/!!+/g) || []).length;
  if (capsCount >= 2 || exclamationCount >= 2) {
    anomalies.push({
      anomaly: 'Excessive Excitement/Emphasis',
      severity: 'low',
      explanation: 'Overuse of caps and exclamation marks suggests manipulation',
      evidence: `${capsCount} caps sequences, ${exclamationCount} multiple exclamations`
    });
  }

  // 5. REQUEST ESCALATION (if message is long, check for progression)
  if (text.length > 200) {
    const hasInitialRequest = /\b(click|verify|confirm|check|look at)\b/i.test(text);
    const hasPaymentRequest = /\b(pay|send|transfer|deposit|fee)\b/i.test(text);
    const hasCredentialRequest = /\b(otp|password|account|details|number)\b/i.test(text);
    
    if (hasInitialRequest && hasPaymentRequest && hasCredentialRequest) {
      anomalies.push({
        anomaly: 'Request Escalation Pattern',
        severity: 'high',
        explanation: 'Combines multiple types of requests suggesting gradual trust-building for exploitation',
        evidence: 'Multiple request types detected'
      });
    }
  }

  // 6. INCONSISTENT INFORMATION
  const claimsBank = /\b(bank|official|rbi|reserve bank)\b/i.test(text);
  const requestsWhatsapp = /\b(whatsapp|telegram)\b/i.test(text);
  if (claimsBank && requestsWhatsapp) {
    anomalies.push({
      anomaly: 'Inconsistent Information',
      severity: 'high',
      explanation: 'Claims to be from bank but asks to contact via WhatsApp - banks don\'t work this way',
      evidence: 'Bank claims + WhatsApp request'
    });
  }

  // 7. TIMEFRAME INCONSISTENCIES
  if (/\b(just now|5 mins ago|recently|just saw)\b/i.test(text) && /\b(long time|for years|since|always|never)\b/i.test(text)) {
    anomalies.push({
      anomaly: 'Timeframe Inconsistency',
      severity: 'medium',
      explanation: 'Message contains contradictory timeframe references',
      evidence: 'Conflicting time references detected'
    });
  }

  // 8. VERIFICATION AVOIDANCE
  if (/\b(don't ask|no questions|don't worry|don't check|don't verify|just do it|trust me)\b/i.test(text)) {
    anomalies.push({
      anomaly: 'Verification Avoidance',
      severity: 'high',
      explanation: 'Discourages verification or questions - classic scam tactic',
      evidence: text.match(/don't ask|no questions|just do it/i)?.[0] || ''
    });
  }

  // 9. SUSPICIOUS DOMAIN
  const suspiciousTLDs = /\b(xyz|top|click|work|monster|cyou|loan|zip|tk|ml|ga)\b/i.test(text);
  if (suspiciousTLDs) {
    anomalies.push({
      anomaly: 'Suspicious Domain TLD',
      severity: 'high',
      explanation: 'Uses known abuse-prone domain extensions',
      evidence: text.match(/\b(xyz|top|click|work|monster|tk|ml)\b/i)?.[0] || ''
    });
  }

  return anomalies;
}

export function calculateBehaviorScore(anomalies: BehavioralAnomaly[]): number {
  let score = 0;
  const highCount = anomalies.filter(a => a.severity === 'high').length;
  const mediumCount = anomalies.filter(a => a.severity === 'medium').length;

  score += highCount * 15;
  score += mediumCount * 8;

  return Math.min(score, 100);
}
```

---

### TASK 3: Create Linguistic Analyzer
**Time: 30 minutes**
**File:** `src/lib/psychology/linguisticAnalyzer.ts`

```typescript
export interface LinguisticMarker {
  marker: string;
  type: 'grammar' | 'tone' | 'vocabulary' | 'structure';
  riskScore: number;
  explanation: string;
}

export function analyzeLinguistics(text: string): LinguisticMarker[] {
  const markers: LinguisticMarker[] = [];

  // 1. ARCHAIC LANGUAGE
  if (/\b(kindly|oblige|forthwith|hereby|thereupon|henceforth)\b/i.test(text)) {
    markers.push({
      marker: 'Archaic Language',
      type: 'vocabulary',
      riskScore: 8,
      explanation: 'Uses formal/archaic words to appear legitimate'
    });
  }

  // 2. MIXED TONE (formal + casual)
  const formalWords = (text.match(/\b(hereby|therefore|thus|furthermore|moreover|notwithstanding)\b/gi) || []).length;
  const casualWords = (text.match(/\b(hey|lol|u|ur|gonna|wanna|btw|asap)\b/gi) || []).length;
  
  if (formalWords > 0 && casualWords > 0) {
    markers.push({
      marker: 'Tone Inconsistency',
      type: 'tone',
      riskScore: 12,
      explanation: 'Mixes formal and casual language suggesting template or multiple authors'
    });
  }

  // 3. COPY-PASTE INDICATORS
  if (/\b(copy of|below is|attached is|as follows|the following|see below)\b/i.test(text)) {
    markers.push({
      marker: 'Copy-Paste Template Indicator',
      type: 'structure',
      riskScore: 10,
      explanation: 'Language suggests message is copied from template'
    });
  }

  // 4. FINANCIAL JARGON OVERUSE
  const financeWords = (text.match(/\b(crypto|blockchain|bitcoin|ethereum|margin|leverage|forex|commodity|derivative|arbitrage)\b/gi) || []).length;
  if (financeWords >= 3) {
    markers.push({
      marker: 'Financial Jargon Overuse',
      type: 'vocabulary',
      riskScore: 14,
      explanation: 'Uses complex financial terminology to appear authoritative'
    });
  }

  // 5. SUBJECT-VERB DISAGREEMENT
  const svPatterns = /(he|she|it|the company|the bank)\s+\w+\s+(are|were)/gi;
  if (svPatterns.test(text)) {
    markers.push({
      marker: 'Grammar Error: Subject-Verb Disagreement',
      type: 'grammar',
      riskScore: 6,
      explanation: 'Non-native speaker or automated message'
    });
  }

  // 6. VERB TENSE INCONSISTENCY
  if (/\b(is going|has went|have go|were going|was go)\b/i.test(text)) {
    markers.push({
      marker: 'Verb Tense Inconsistency',
      type: 'grammar',
      riskScore: 6,
      explanation: 'Incorrect verb conjugation indicates non-native speaker'
    });
  }

  // 7. MISSING ARTICLES (a, an, the)
  const missingArticles = text.match(/\b(by \w+|in \w+|to \w+)\b/g) || [];
  if (missingArticles.length >= 3) {
    markers.push({
      marker: 'Missing Articles',
      type: 'grammar',
      riskScore: 5,
      explanation: 'Non-native English speaker'
    });
  }

  // 8. ABRUPT TOPIC CHANGES
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  if (sentences.length >= 3) {
    const topicWords = sentences.map(s => s.split(' ')[0]);
    const uniqueTopics = new Set(topicWords).size;
    
    if (uniqueTopics >= sentences.length * 0.7) { // 70% of sentences start differently
      markers.push({
        marker: 'Abrupt Topic Changes',
        type: 'structure',
        riskScore: 8,
        explanation: 'Random topic switching suggests multiple unrelated templates combined'
      });
    }
  }

  // 9. LANGUAGE ORIGIN DETECTION (English as second language)
  const eslIndicators = /(your|you\'re|there|their|they\'re)\s+\w+\s+(are|is|was)/gi;
  if ((text.match(eslIndicators) || []).length >= 2) {
    markers.push({
      marker: 'Non-Native English',
      type: 'grammar',
      riskScore: 7,
      explanation: 'Language patterns suggest English as second language'
    });
  }

  // 10. EXCLAMATION OVERUSE & EMOTICONS
  const exclamations = (text.match(/!{2,}/g) || []).length;
  const emojis = (text.match(/[😀-🙏🌀-🗿]/g) || []).length;
  
  if (exclamations >= 3 || emojis >= 3) {
    markers.push({
      marker: 'Emotional Manipulation Language',
      type: 'tone',
      riskScore: 9,
      explanation: 'Excessive exclamation marks and emojis used to manipulate emotions'
    });
  }

  return markers;
}

export function calculateLinguisticScore(markers: LinguisticMarker[]): number {
  return markers.reduce((score, marker) => score + marker.riskScore, 0);
}
```

---

### TASK 4: Create Scam Type Classifier
**Time: 30 minutes**
**File:** `src/lib/scamTypes/scamClassifier.ts`

```typescript
export type ScamType = 
  | 'job_recruiter' 
  | 'romance' 
  | 'investment_crypto' 
  | 'tech_support' 
  | 'identity_theft'
  | 'phishing'
  | 'money_transfer'
  | 'lottery_prize'
  | 'unknown';

export interface ScamClassification {
  primaryType: ScamType;
  confidence: number; // 0-100
  explanation: string;
  indicators: string[];
}

export function classifyScamType(text: string): ScamClassification {
  const lowerText = text.toLowerCase();
  let scores: Record<ScamType, number> = {
    job_recruiter: 0,
    romance: 0,
    investment_crypto: 0,
    tech_support: 0,
    identity_theft: 0,
    phishing: 0,
    money_transfer: 0,
    lottery_prize: 0,
    unknown: 0
  };
  let indicators: string[] = [];

  // JOB/RECRUITER SCAM
  if (/\b(job|position|recruiter|hiring|interview|salary|hr|recruitment|apply|role|vacancy)\b/i.test(text)) {
    scores.job_recruiter += 30;
    indicators.push('Job/recruitment keywords');
  }
  if (/\b(work from home|part time|flexible|registration fee|upfront payment)\b/i.test(text)) {
    scores.job_recruiter += 20;
    indicators.push('WFH/payment for job indicators');
  }
  if (/\b(linkedin|indeed|naukri|glassdoor)\b/i.test(text)) {
    scores.job_recruiter += 15;
    indicators.push('Job platform references');
  }

  // ROMANCE SCAM
  if (/\b(love|miss|heart|dear|sweetheart|darling|marry|relationship|dating|feelings)\b/i.test(text)) {
    scores.romance += 30;
    indicators.push('Romantic/emotional language');
  }
  if (/\b(i care about you|let me help|i need your help|trust me|believe me)\b/i.test(text)) {
    scores.romance += 25;
    indicators.push('Emotional manipulation tactics');
  }
  if (/\b(emergency|sick|accident|hospital|visa|travel|business problem)\b/i.test(text)) {
    scores.romance += 20;
    indicators.push('Emergency money request indicators');
  }

  // INVESTMENT/CRYPTO SCAM
  if (/\b(crypto|bitcoin|ethereum|blockchain|forex|stock|investment|roi|returns|profit)\b/i.test(text)) {
    scores.investment_crypto += 35;
    indicators.push('Crypto/investment keywords');
  }
  if (/\b(guaranteed returns|unlimited income|quick money|passive income|no risk)\b/i.test(text)) {
    scores.investment_crypto += 25;
    indicators.push('Unrealistic return promises');
  }
  if (/\b(pump|dump|insider tip|hot tip|exclusive opportunity)\b/i.test(text)) {
    scores.investment_crypto += 20;
    indicators.push('Investment scam indicators');
  }

  // TECH SUPPORT SCAM
  if (/\b(malware|virus|infected|antivirus|security alert|update|download|install)\b/i.test(text)) {
    scores.tech_support += 30;
    indicators.push('Tech/malware keywords');
  }
  if (/\b(your computer|system|device|immediate action required)\b/i.test(text)) {
    scores.tech_support += 20;
    indicators.push('Tech support urgency indicators');
  }
  if (/\b(remote access|teamviewer|anydesk|click link)\b/i.test(text)) {
    scores.tech_support += 25;
    indicators.push('Remote access request');
  }

  // IDENTITY THEFT/KYC FRAUD
  if (/\b(kyc|aadhar|pan|bank details|account number|otp|verify|confirm identity)\b/i.test(text)) {
    scores.identity_theft += 35;
    indicators.push('KYC/identity verification requests');
  }
  if (/\b(update required|verification link|click here|confirm)\b/i.test(text)) {
    scores.identity_theft += 20;
    indicators.push('Phishing-style verification');
  }

  // PHISHING
  if (/\b(click here|tap here|verify account|unusual activity|suspicious|confirm)\b/i.test(text)) {
    scores.phishing += 25;
    indicators.push('Phishing call-to-action');
  }
  if (/\b(bit\.ly|tinyurl|short\.link|re\.direct)\b/i.test(text)) {
    scores.phishing += 20;
    indicators.push('Shortened URL in message');
  }
  if (/\b(password|credentials|login|username)\b/i.test(text)) {
    scores.phishing += 25;
    indicators.push('Credential theft indicators');
  }

  // MONEY TRANSFER SCAM
  if (/\b(upi|paytm|phone pe|google pay|bank transfer|western union|money gram|send money)\b/i.test(text)) {
    scores.money_transfer += 30;
    indicators.push('Money transfer method');
  }
  if (/\b(transfer|send|pay|deposit|amount|rupees|rs)\b/i.test(text)) {
    scores.money_transfer += 15;
    indicators.push('Payment request language');
  }

  // LOTTERY/PRIZE SCAM
  if (/\b(congratulations|you won|selected|lucky|jackpot|prize|lottery|claim)\b/i.test(text)) {
    scores.lottery_prize += 35;
    indicators.push('Lottery/prize keywords');
  }
  if (/\b(processing fee|claim fee|tax)\b/i.test(text)) {
    scores.lottery_prize += 25;
    indicators.push('Upfront payment for prize');
  }

  // Find the highest score
  const sortedTypes = Object.entries(scores)
    .filter(([key]) => key !== 'unknown')
    .sort(([, a], [, b]) => b - a);

  const [primaryType, score] = sortedTypes[0] || ['unknown', 0];
  const confidence = Math.min(score, 100);

  let explanation = `This appears to be a ${primaryType.replace(/_/g, ' ')} scam.`;
  if (confidence < 30) {
    explanation = 'Unable to confidently classify scam type. Review indicators below.';
  } else if (confidence < 60) {
    explanation = `Likely a ${primaryType.replace(/_/g, ' ')} scam, but moderate confidence.`;
  }

  return {
    primaryType: primaryType as ScamType,
    confidence,
    explanation,
    indicators
  };
}
```

---

### TASK 5: Integrate with Existing Analyzer
**Time: 30 minutes**
**File:** `src/lib/mockAnalyzer.ts` (UPDATE)

Add this to the top:

```typescript
import { analyzePsychology, calculatePsychologyScore, type PsychologicalTactic } from './psychology/manipulationAnalyzer';
import { analyzeBehavior, calculateBehaviorScore, type BehavioralAnomaly } from './psychology/behavioralAnalyzer';
import { analyzeLinguistics, calculateLinguisticScore, type LinguisticMarker } from './psychology/linguisticAnalyzer';
import { classifyScamType, type ScamClassification } from './scamTypes/scamClassifier';
```

Modify the `AnalysisResult` interface:

```typescript
export interface AnalysisResult {
  // ... existing fields ...
  psychologyTactics: PsychologicalTactic[];
  behavioralAnomalies: BehavioralAnomaly[];
  linguisticMarkers: LinguisticMarker[];
  scamClassification: ScamClassification;
  psychologyScore: number;
  behaviorScore: number;
  linguisticScore: number;
}
```

Replace the `analyzeMessage` function:

```typescript
export function analyzeMessage(message: string): AnalysisResult {
  // Get all analysis layers
  const psychologyTactics = analyzePsychology(message);
  const behavioralAnomalies = analyzeBehavior(message);
  const linguisticMarkers = analyzeLinguistics(message);
  const scamClassification = classifyScamType(message);

  // Calculate scores
  const psychologyScore = calculatePsychologyScore(psychologyTactics);
  const behaviorScore = calculateBehaviorScore(behavioralAnomalies);
  const linguisticScore = calculateLinguisticScore(linguisticMarkers);

  // Weighted combined score (Psychology 50%, Behavior 30%, Linguistic 10%, Original 10%)
  const combinedScore = Math.min(
    (psychologyScore * 0.5 +
      behaviorScore * 0.3 +
      linguisticScore * 0.1 +
      (analyzeMessageOriginal(message) * 0.1)),
    100
  );

  const level: ThreatLevel =
    combinedScore >= 70 ? 'critical' : combinedScore >= 40 ? 'suspicious' : 'safe';

  // Generate red flags from all sources
  const redFlags: RedFlag[] = [
    ...psychologyTactics.map(t => ({
      id: t.tactic,
      label: t.tactic,
      description: t.explanation,
      severity: t.severity as ThreatLevelMap
    })),
    ...behavioralAnomalies.map(a => ({
      id: a.anomaly,
      label: a.anomaly,
      description: a.explanation,
      severity: a.severity as ThreatLevelMap
    }))
  ];

  // Generate breakdown text
  const breakdown = [
    `Psychological Analysis: Detected ${psychologyTactics.length} manipulation tactics (score: ${psychologyScore}/100). ${psychologyTactics.map(t => t.tactic).join(', ')}.`,
    `Behavioral Analysis: ${behavioralAnomalies.length} anomalies detected (score: ${behaviorScore}/100). ${behavioralAnomalies.map(a => a.anomaly).join(', ')}.`,
    `Classification: ${scamClassification.explanation} (Confidence: ${scamClassification.confidence}%) - Indicators: ${scamClassification.indicators.join(', ')}.`
  ];

  return {
    score: combinedScore,
    level,
    redFlags,
    highlights: generateHighlights(message, psychologyTactics, behavioralAnomalies),
    breakdown,
    manipulationTactics: psychologyTactics.map(t => ({
      name: t.tactic,
      explanation: t.explanation
    })),
    safeSteps: generateSafeSteps(level, scamClassification.primaryType),
    originalText: message,
    psychologyTactics,
    behavioralAnomalies,
    linguisticMarkers,
    scamClassification,
    psychologyScore,
    behaviorScore,
    linguisticScore
  };
}
```

---

## 🎨 PHASE 2: FRONTEND (1-2 Hours)

### TASK 6: Create Psychology Component
**Time: 30 min**
**File:** `src/components/analyzer/PsychologyBreakdown.tsx`

```tsx
import { PsychologicalTactic } from "@/lib/psychology/manipulationAnalyzer";
import { Card } from "@/components/ui/card";
import { AlertCircle, Flame, Info } from "lucide-react";

interface Props {
  tactics: PsychologicalTactic[];
  score: number;
}

export function PsychologyBreakdown({ tactics, score }: Props) {
  if (tactics.length === 0) return null;

  return (
    <Card className="p-5 border-cyber/20 bg-gradient-to-br from-cyber/5 to-neon/5">
      <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 text-cyber">
        🧠 Psychological Tactics Detected
      </h3>
      
      <div className="space-y-3">
        {tactics.map((tactic, idx) => (
          <div key={idx} className="flex gap-3 text-xs">
            <div className="flex-shrink-0 mt-0.5">
              {tactic.severity === 'high' && <Flame className="h-4 w-4 text-red-500" />}
              {tactic.severity === 'medium' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
              {tactic.severity === 'low' && <Info className="h-4 w-4 text-blue-500" />}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{tactic.tactic}</p>
              <p className="text-muted-foreground">{tactic.explanation}</p>
              <div className="flex gap-1 flex-wrap mt-1">
                {tactic.evidence.slice(0, 2).map((e, i) => (
                  <span key={i} className="px-2 py-0.5 bg-background/60 rounded text-[10px] text-muted-foreground">
                    "{e}"
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 font-semibold text-cyber">+{tactic.score}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Psychology Score</p>
        <p className="text-lg font-bold text-cyber">{Math.round(score)}/100</p>
      </div>
    </Card>
  );
}
```

### TASK 7: Update AnalyzePage to show new data
**Time: 20 min**
**File:** `src/routes/analyze.tsx` (MODIFY)

In the render section after `<ThreatBreakdown>`, add:

```tsx
{result && !scanning && (
  <>
    <div className="space-y-5">
      <PsychologyBreakdown 
        tactics={result.psychologyTactics} 
        score={result.psychologyScore}
      />
      
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Scam Type</h3>
        <Card className="p-4 border-neon/20 bg-neon/5">
          <p className="font-semibold text-foreground">
            {result.scamClassification.primaryType.replace(/_/g, ' ').toUpperCase()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {result.scamClassification.explanation}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 bg-background/40 rounded-full h-2">
              <div 
                className="bg-neon h-2 rounded-full transition-all"
                style={{width: `${result.scamClassification.confidence}%`}}
              />
            </div>
            <span className="text-xs font-semibold text-neon">
              {result.scamClassification.confidence}%
            </span>
          </div>
        </Card>
      </div>
    </div>
  </>
)}
```

---

## 🧪 PHASE 3: TESTING (30 min - 1 Hour)

### Test Cases to Run:

**Test 1: Romance Scam**
```
"Hi dear, I really like you. I just need your help with something important. 
I'm stuck abroad and need money for my visa. Can you send me $500 via Western Union? 
Trust me, I'll pay you back double once I reach there. I love you so much."
```
Expected: Romance scam, 80+ score, psychology tactics: Romance, false trust, greed

**Test 2: Crypto Scam**
```
"URGENT!!! You've been selected for our exclusive cryptocurrency investment opportunity. 
Guaranteed 50% daily returns! Only 5 slots left! Join 10,000+ members already earning.
Send 0.5 BTC to claim your spot. Limited time offer!!!"
```
Expected: Investment scam, 85+ score, psychology: Urgency, greed, scarcity, social proof

**Test 3: Tech Support Scam**
```
"WARNING: Your device has been infected with malware! 
System security alert! Click here immediately to remove virus. 
Do not restart your computer. Download antivirus now or you'll lose all files!"
```
Expected: Tech support scam, 75+ score, psychology: Fear, technical confusion, urgency

**Test 4: Legitimate Message**
```
"Hi, I'm interested in the job posting on LinkedIn. 
I have 5 years of experience in software development. 
Could you send me the job description and next steps? Thanks!"
```
Expected: Safe message, 15-25 score, minimal red flags

---

## ✅ FINAL LAUNCH CHECKLIST (30 min)

- [ ] All 4 analyzers created and tested
- [ ] integrated into mockAnalyzer.ts
- [ ] Frontend components display new data
- [ ] Test with 5-10 scam messages
- [ ] Test with 5-10 legitimate messages
- [ ] Update README with v2.0 features
- [ ] Create git commit "feat: add v2.0 psychology & behavioral detection"
- [ ] Deploy to production
- [ ] Test live deployment works
- [ ] Update GitHub releases

---

## ⏰ TIME ALLOCATION

| Task | Time | Status |
|------|------|--------|
| Psychology Analyzer | 30 min | ⏳ Start here |
| Behavioral Analyzer | 30 min | Next |
| Linguistic Analyzer | 30 min | Then |
| Scam Classifier | 30 min | Then |
| Frontend Components | 1 hour | Parallel possible |
| Testing | 45 min | Validation |
| Deploy & Launch | 30 min | Final |
| **TOTAL** | **~5 hours** | **Can do tonight** |

---

## 🚀 START NOW!

1. Create the 4 analyzer files above
2. Update mockAnalyzer.ts to use them
3. Create the frontend components
4. Test with scam messages
5. Deploy and celebrate! 🎉

**You've got this! Let's make v2.0 live tonight!** 💪
