# Contributing to ScamShield AI

Thank you for your interest in contributing to ScamShield AI! We appreciate your enthusiasm and effort to make this project better.

## 🤝 Ways to Contribute

- **Report Bugs**: Submit issues for bugs you find
- **Suggest Features**: Share ideas for new capabilities
- **Improve Documentation**: Fix typos, add examples, clarify instructions
- **Submit Code**: Fix bugs or implement new features
- **Improve Tests**: Add or improve test coverage

## 📋 Code of Conduct

By participating in this project, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful, inclusive, and considerate in all interactions.

## 🚀 Getting Started

### Fork and Clone
```bash
git clone https://github.com/yourusername/shield-insight-labs.git
cd shield-insight-labs
npm install
```

### Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

## 💻 Development Workflow

1. **Make your changes** following our coding standards
2. **Test your changes** thoroughly
3. **Lint and format** your code
4. **Write clear commit messages**
5. **Push to your fork**
6. **Open a Pull Request**

### Running Development Server
```bash
npm run dev
```

### Testing & Linting
```bash
npm run lint          # Run ESLint
npm run format        # Format with Prettier
npm run build         # Build for production
```

## 📝 Coding Standards

### TypeScript
- Use TypeScript for type safety
- Avoid `any` types when possible
- Export types that might be reused

### Components
- Use functional components with hooks
- Keep components focused and reusable
- Add JSDoc comments for complex logic
- Use descriptive prop names

### Naming Conventions
```typescript
// Components (PascalCase)
const MyComponent = () => { };

// Functions (camelCase)
const analyzeMessage = () => { };

// Constants (UPPER_SNAKE_CASE)
const MAX_RETRIES = 3;

// Types (PascalCase)
type AnalysisResult = { };
interface UserData { }
```

### File Organization
```
src/
├── components/        # React components
├── routes/           # Page components
├── stores/           # State management
├── lib/              # Utilities & helpers
├── types/            # Type definitions
└── hooks/            # Custom hooks
```

## 🔄 Pull Request Process

1. **Update** the README.md if you change functionality
2. **Add tests** for new features
3. **Ensure** all tests pass: `npm run build`
4. **Update** documentation as needed
5. **Write a clear PR description** including:
   - What problem does this solve?
   - How does it solve the problem?
   - Are there any breaking changes?
   - Screenshots/demos (if applicable)

### PR Title Format
```
feat: Add new feature description
fix: Fix bug description
docs: Update documentation
refactor: Reorganize code
test: Add test cases
chore: Update dependencies
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Problem Solved
What issue does this address?

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes?

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Tests added/updated
```

## 🧪 Testing

- Write tests for new features
- Ensure all existing tests pass
- Aim for meaningful test coverage
- Test edge cases

## 📚 Documentation

- Update README for user-facing changes
- Add comments for complex logic
- Keep documentation up-to-date
- Include examples where helpful

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear, descriptive title
- Detailed description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/videos (if applicable)
- Environment details (OS, browser, Node version)

## 💡 Feature Requests

When suggesting features, include:
- Clear description of the feature
- Use case and why it's needed
- Possible implementation approaches
- Any concerns or limitations

## 📞 Getting Help

- Open an issue for questions
- Check existing issues/discussions
- Review project documentation
- Ask in pull request comments

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Happy Contributing! 🎉**

We look forward to your contributions and appreciate your help in making ScamShield AI even better!
