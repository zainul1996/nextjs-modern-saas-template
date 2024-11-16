# Contributing to Next.js Modern SaaS Template

🎉 First off, thanks for taking the time to contribute! 🎉

This document provides guidelines and steps for contributing to this project. Following these guidelines helps us maintain code quality and streamlines the review process.

## 🚀 Getting Started

1. **Fork the Repository**
   - Click the 'Fork' button at the top right of this repository
   - Clone your fork locally:
     ```bash
     git clone https://github.com/zainul1996/nextjs-modern-saas-template.git
     cd nextjs-modern-saas-template
     ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

## 💻 Development Process

1. **Make Your Changes**
   - Write clean, maintainable code
   - Follow existing code style and conventions
   - Keep commits atomic (one feature/fix per commit)

2. **Test Your Changes**
   ```bash
   # Run tests
   pnpm test
   
   # Run linting
   pnpm lint
   
   # Run type checking
   pnpm type-check
   ```

3. **Commit Your Changes**
   We use conventional commits to maintain a readable git history.
   ```bash
   git commit -m "feat: add new authentication feature"
   # or
   git commit -m "fix: resolve routing issue"
   ```

   Commit types:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, etc.)
   - `refactor`: Code refactoring
   - `test`: Adding or modifying tests
   - `chore`: Maintenance tasks

4. **Update Your Fork**
   ```bash
   git remote add upstream https://github.com/zainul1996/nextjs-modern-saas-template.git
   git fetch upstream
   git merge upstream/main
   ```

5. **Push Your Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click 'New Pull Request'
   - Ensure the base repository and branch are correct
   - Provide a clear title and description
   - Link any related issues

## 📝 Pull Request Guidelines

- **Title Format:** `type: short description`
  - Example: `feat: add dark mode support`
- **Description:**
  - Explain the purpose of the changes
  - List any breaking changes
  - Include screenshots for UI changes
  - Reference related issues

## 🐛 Bug Reports

Open an issue using the bug report template. Include:
- Clear bug description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

## ✨ Feature Requests

Open an issue using the feature request template. Include:
- Clear feature description
- Use case and benefits
- Proposed implementation (optional)
- Mock-ups or examples (if applicable)

## 📚 Documentation

- Update documentation for any code changes
- Use clear, concise language
- Include code examples when helpful
- Check for spelling and grammar

## 💅 Style Guide

- Follow existing code formatting
- Use TypeScript for all new code
- Write self-documenting code
- Include JSDoc comments for public APIs
- Follow React best practices

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## ❓ Questions?

Don't hesitate to open an issue for questions or join our [Telegram community](https://t.me/modernUI).

---

Thank you for contributing to Next.js Modern SaaS Template! 🎉