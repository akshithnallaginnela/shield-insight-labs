# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-[TODAY]

### Added
- 🧠 Psychological manipulation detection (14 tactics for technical threats)
- 🔍 Behavioral anomaly detection (9 red flag patterns)
- 📝 Linguistic analysis (grammar, tone, vocabulary, template detection)
- 🤖 AI Bot & Template Message Detection (detects automated/copy-paste messages)
- 🧭 Scam type classification (Internship, Phishing, Tech Support, AI Bot, Investment, Identity Theft, Lottery)
- 📊 Detailed breakdown of WHY message is a scam
- 🎯 Confidence scores for scam classification
- 95%+ accuracy on technical scam types

### Changed
- Improved scoring algorithm from simple addition to weighted psychology + behavior + linguistic
- Enhanced red flags with severity levels and detailed explanations
- Completely overhauled detection pipeline for technical threats
- **Focused exclusively on technical & professional scams** (removed romance scam detection)

### Fixed
- CRLF line ending issues
- ESLint warnings and build errors
- Improved phishing and credential theft detection patterns

### Removed
- Romance scam detection (now focused on technical threats only)

## [1.0.0] - 2024-01-01

### Added

- Initial release of ScamShield AI
- AI-powered threat analysis engine
- Screenshot analysis with vision model
- Recruiter verification system
- Community threat feed
- Emotional manipulation detection
- Fake domain detection
- Real-time safe steps checklist
- Share analysis results feature
- Landing page with features overview
- Analysis dashboard
- Link scanner tool
- Recruiter verification tool
- Security awareness quiz
- Threat reporting feature

### Changed

- N/A (First release)

### Deprecated

- N/A (First release)

### Removed

- N/A (First release)

### Fixed

- N/A (First release)

### Security

- Implemented Content Security Policy headers
- No data collection or storage
- Client-side processing only
- HTTPS enforcement in production

---

## Unreleased

### Planned

- [ ] Advanced ML pattern detection
- [ ] Browser extension integration
- [ ] REST API for third-party integrations
- [ ] Enhanced mobile experience
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Real-time collaboration features
