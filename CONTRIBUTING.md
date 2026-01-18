# Contributing to Night Skills

Thank you for your interest in contributing to Night Skills! This guide will help you get started.

## About Night Skills

Night Skills is an open-source project by [Webisoft Development Labs](https://webisoft.com) that provides AI agent skills for building privacy-preserving dApps on [Midnight Network](https://midnight.network).

## Ways to Contribute

### 1. Create New Skills

The most valuable contribution is creating new skills that help developers build on Midnight.

**Skill Ideas:**
- `midnight-audit` - Security audit patterns
- `midnight-gas-optimizer` - Optimize proof generation costs
- `midnight-upgrade` - Contract upgrade patterns
- `midnight-bridge` - Cross-chain integration
- `midnight-identity` - DID and credential patterns

### 2. Improve Existing Skills

- Add more examples
- Fix syntax errors
- Update for new Compact versions
- Improve documentation

### 3. Report Issues

- Syntax errors in examples
- Outdated patterns
- Missing features
- Documentation improvements

### 4. Documentation

- Tutorials
- Use case examples
- Integration guides

---

## Development Setup

### Prerequisites

```bash
# Install Compact compiler
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh

# Required
node -v  # v18+
git --version

# Optional (for testing contracts)
docker -v
```

### Clone Repository

```bash
git clone https://github.com/UvRoxx/night-skills.git
cd night-skills
```

### Test a Skill

```bash
# Navigate to a skill
cd skills/midnight-compact-guide

# Read SKILL.md
cat SKILL.md

# Test any scripts
bash scripts/*.sh
```

---

## Creating a New Skill

### 1. Create Directory Structure

```bash
mkdir -p skills/midnight-{name}/rules
mkdir -p skills/midnight-{name}/scripts
```

### 2. Create SKILL.md

Use this template:

```markdown
---
name: midnight-{name}
description: One sentence describing what this skill does. Include trigger phrases like "deploy contract", "test pattern", etc.
license: MIT
metadata:
  author: your-name
  version: "1.0.0"
  midnight-version: "0.27.0"
  compact-version: "0.16 - 0.18"
---

# Skill Title

Brief description of what this skill helps with.

## When to Use

Reference this skill when:
- Scenario 1
- Scenario 2
- Scenario 3

## Quick Reference

Include the most important information here.

### Key Pattern

\`\`\`compact
// Example Compact code
pragma language_version >= 0.16 && <= 0.18;

import CompactStandardLibrary;

export ledger example: Counter;

export circuit doSomething(): [] {
  example.increment(1);
}
\`\`\`

## Detailed Sections

### Section 1

Content...

### Section 2

Content...

## Rules

See `/rules/` directory for detailed documentation:
- `rule-name.md` - Description

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Problem 1 | Fix 1 |
| Problem 2 | Fix 2 |

## References

- [Link 1](url)
- [Link 2](url)
```

### 3. Add Rules (Optional)

Create detailed rule files in `rules/`:

```markdown
# Rule Title

Detailed explanation of a specific pattern or concept.

## Overview

What this rule covers.

## Pattern

\`\`\`compact
// Compact example
\`\`\`

## TypeScript Implementation

\`\`\`typescript
// TypeScript example
\`\`\`

## Common Mistakes

| Mistake | Correct |
|---------|---------|
| Wrong | Right |

## References

- [Link](url)
```

### 4. Add Scripts (Optional)

Create executable scripts in `scripts/`:

```bash
#!/bin/bash
set -e  # Exit on error

# Description: What this script does

ACTION="${1:-help}"

case "$ACTION" in
  start)
    echo "Starting..." >&2
    # Commands
    ;;
  stop)
    echo "Stopping..." >&2
    # Commands
    ;;
  help|*)
    echo "Usage: $0 {start|stop|help}" >&2
    ;;
esac
```

### 5. Test Your Skill

- Read through SKILL.md as if you were an AI agent
- Verify all Compact code compiles
- Test all scripts on macOS and Linux
- Check that links work

### 6. Package for Distribution

```bash
cd skills
zip -r midnight-{name}.zip midnight-{name}/
```

---

## Compact Syntax Guidelines

When writing Compact examples, use these verified patterns:

### Correct Patterns

```compact
// Pragma - bounded range, no patch version
pragma language_version >= 0.16 && <= 0.18;

// Imports
import CompactStandardLibrary;

// Ledger - individual declarations (NOT block)
export ledger counter: Counter;
export ledger owner: Bytes<32>;

// Witness - declaration only, NO body
witness local_secret_key(): Bytes<32>;

// Circuit - returns [] (NOT Void)
export circuit increment(): [] {
  counter.increment(1);
}

// Pure circuit (NOT pure function)
pure circuit helper(): Field {
  return 42;
}

// Enum access - dot notation (NOT ::)
if (choice == Choice.rock) { }
```

### Common Mistakes to Avoid

| Wrong | Correct |
|-------|---------|
| `ledger { }` block | `export ledger field: Type;` |
| `Void` return type | `[]` (empty tuple) |
| `pure function` | `pure circuit` |
| `Choice::rock` | `Choice.rock` |
| `counter.value()` | `counter.read()` |

---

## Code Style

### Markdown

- Use ATX headers (`#`, `##`, `###`)
- Use fenced code blocks with language
- Use tables for structured data
- Keep lines under 100 characters

### Compact

- 2-space indentation
- Spaces around operators
- Descriptive variable names
- Comments for complex logic

### Bash Scripts

- `set -e` at top
- Descriptive comments
- Use `>&2` for status messages
- Exit codes for errors

---

## Pull Request Process

### 1. Fork and Clone

```bash
git fork https://github.com/UvRoxx/night-skills.git
git clone https://github.com/YOUR-USERNAME/night-skills.git
cd night-skills
```

### 2. Create Branch

```bash
git checkout -b feature/midnight-{skill-name}
# or
git checkout -b fix/skill-name-issue
```

### 3. Make Changes

- Follow the skill structure
- Test thoroughly
- Update README if needed

### 4. Commit

```bash
git add .
git commit -m "Add midnight-{name} skill

- Feature 1
- Feature 2

Co-Authored-By: Your Name <email@example.com>"
```

### 5. Push and PR

```bash
git push origin feature/midnight-{skill-name}
```

Open a Pull Request on GitHub with:
- Clear title
- Description of changes
- Screenshots if relevant
- Link to any related issues

---

## Review Criteria

PRs will be reviewed for:

1. **Correctness** - Compact syntax compiles
2. **Completeness** - All required files present
3. **Quality** - Clear documentation and examples
4. **Testing** - Scripts work on macOS/Linux
5. **Style** - Follows contribution guidelines

---

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers learn
- Focus on improving the project
- Credit others' work

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or personal attacks
- Publishing others' private information
- Unprofessional conduct

### Enforcement

Maintainers may remove, edit, or reject contributions that don't align with this Code of Conduct.

---

## Questions?

- **GitHub Issues:** Report bugs or request features
- **Discussions:** Ask questions
- **Email:** contact@webisoft.com

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Thank you for contributing to Night Skills!**

[Webisoft Development Labs](https://webisoft.com) | [Midnight Network](https://midnight.network)

</div>
