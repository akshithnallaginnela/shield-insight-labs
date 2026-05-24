# ScamShield AI 🛡️

**Stop Phishing. Verify Before You Trust.**

AI-powered scam detection for fake recruiters, phishing attacks, suspicious messages, and online fraud — built for the messaging-first generation.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Status](https://img.shields.io/badge/status-live-success)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

ScamShield AI is a comprehensive threat detection platform that analyzes suspicious messages in real-time. With advanced AI patterns, psychology + behavioral detection, linguistic markers, and scam-type classification, it helps users identify and avoid online scams before they become victims.

- **10,000+** scams analyzed
- **Real-time** threat detection
- **AI-powered** analysis engine

## 🚀 Features

### 📸 Screenshot Analysis
Upload a screenshot of any message — our vision model extracts and analyzes the text for scam patterns.

### 👔 Recruiter Verification
Validate recruiters against suspicious domains and known fake-HR patterns before you reply.

### 👥 Community Threat Feed
A live feed of reported scams from real users so you can spot active campaigns instantly.

### 🧠 Psychology + Behavioral Detection
Identifies urgency, fear, authority, and behavioral anomalies scammers use to bypass rational thinking.

### 📝 Linguistic Anomaly Detection
Flags language patterns, tone shifts, and grammar issues commonly seen in scam templates.

### 🧭 Scam Type Classification
Classifies messages as romance, investment, tech support, phishing, identity theft, and more.

### 🌐 Fake Domain Detection
Flags lookalike domains, suspicious TLDs, and shortened links that hide phishing pages.

### ✅ Real-time Safe Steps
Get an actionable checklist tailored to the exact threat in front of you.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Routing**: TanStack Router
- **Meta-Framework**: TanStack Start
- **Styling**: Tailwind CSS v4 + Class Variance Authority
- **UI Components**: Radix UI + Custom Components
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Form Handling**: React Hook Form + Zod
- **Charts**: Recharts
- **Build Tool**: Vite 7
- **Linting**: ESLint + Prettier
- **Deployment**: Cloudflare

## 📋 Prerequisites

- **Node.js**: v18+ (recommended v20+)
- **npm**: v9+ or **pnpm**
- **Git**: For version control

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shield-insight-labs.git
   cd shield-insight-labs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup** (if required)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

## 🚀 Getting Started

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Linting
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

## 📁 Project Structure

```
shield-insight-labs/
├── src/
│   ├── components/
│   │   ├── analyzer/           # Analysis UI components
│   │   │   ├── MessageInput.tsx
│   │   │   ├── ProbabilityGauge.tsx
│   │   │   ├── RedFlagsList.tsx
│   │   │   ├── SafeStepsChecklist.tsx
│   │   │   ├── ScanningOverlay.tsx
│   │   │   └── ThreatBreakdown.tsx
│   │   ├── layout/             # Layout components
│   │   ├── ui/                 # Reusable UI primitives
│   │   └── ...
│   ├── routes/                 # Page components & routing
│   │   ├── index.tsx           # Landing page
│   │   ├── analyze.tsx         # Analysis dashboard
│   │   ├── feed.tsx            # Threat feed
│   │   ├── recruiter.tsx       # Recruiter verification
│   │   └── ...
│   ├── stores/                 # Zustand state management
│   ├── lib/                    # Utilities & helpers
│   ├── router.tsx              # Router configuration
│   └── start.ts                # App entry point
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies & scripts
```

## 📍 Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page with feature overview |
| `/analyze` | Main threat analysis dashboard |
| `/feed` | Community threat feed |
| `/link-scanner` | Dedicated link/domain analysis |
| `/recruiter` | Recruiter verification tool |
| `/quiz` | Security awareness quiz |
| `/report` | Report suspicious content |

## 🎨 Design System

The project uses a modern dark-themed UI with:

- **Color Scheme**: Cyber theme with neon accents
- **Typography**: System fonts with consistent scale
- **Components**: Radix UI primitive components with custom styling
- **Animations**: Smooth transitions and entrance animations
- **Responsiveness**: Mobile-first, fully responsive design

## 🔄 State Management

**Zustand Store** (`src/stores/analysisStore.ts`):
- `pendingMessage` - Message awaiting analysis
- `result` - Analysis results & threat details
- `setResult()` - Update analysis results
- `setPending()` - Queue a message for analysis

## 🧪 Testing

The application includes mock analysis functionality for development:
- `src/lib/mockAnalyzer.ts` - Mock threat detection engine
- Test cases available in project documentation

## 🚀 Deployment

The project is configured for **Cloudflare deployment**:

```bash
# Build and deploy to Cloudflare
npm run build
wrangler deploy
```

## 🔐 Security & Privacy

- **No Login Required**: Instant scanning
- **No Data Storage**: Analyses are not persisted
- **Client-Side Processing**: Analysis runs on-device
- **No Cookies**: User-privacy focused

## 📊 Performance

- **Analysis Speed**: <3 seconds
- **Lightweight**: Optimized bundle size
- **Mobile Optimized**: Responsive on all devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint rules
- Format with Prettier
- Write descriptive commit messages

## 📝 Scripts Reference

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Build Issues
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Type Errors
```bash
npm run build        # Verify TypeScript compilation
npx tsc --noEmit     # Check for type issues
```

## 📚 Resources

- [TanStack Router Docs](https://tanstack.com/router)
- [TanStack Start Docs](https://tanstack.com/start)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Radix UI Components](https://www.radix-ui.com)
- [React 19 Docs](https://react.dev)
- [Zod Documentation](https://zod.dev)

## 📄 License

MIT License - see LICENSE file for details

## 👥 Support

For issues, questions, or feature requests:
- Open an [issue on GitHub](https://github.com/yourusername/shield-insight-labs/issues)
- Check existing documentation
- Review project wiki

## 🎯 Roadmap

- [ ] Advanced ML-based pattern detection
- [ ] Browser extension integration
- [ ] API for third-party integrations
- [ ] Enhanced mobile experience
- [ ] Multi-language support
- [ ] Offline mode

---

**ScamShield AI** — Built to protect, powered by intelligence.

*Stop guessing. Verify. Trust with confidence.*
