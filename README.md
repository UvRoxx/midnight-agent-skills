# Midnight Agent Skills

> **AI Agent Skills for Building Privacy-Preserving dApps on Midnight Network**

A comprehensive collection of skills that extend AI coding agents (Claude Code, Cursor, Copilot, etc.) to build, deploy, test, and interact with Midnight Network applications.

Skills follow the [Agent Skills](https://agentskills.io/) format for seamless integration.

---

## Quick Install

**npx (Recommended):**
```bash
npx midnight-agent-skills init
```

**Add specific skill:**
```bash
npx midnight-agent-skills add midnight-compact-guide
```

**List all skills:**
```bash
npx midnight-agent-skills list
```

**Alternative - Git clone:**
```bash
git clone https://github.com/UvRoxx/midnight-agent-skills.git
```

**Add as submodule:**
```bash
git submodule add https://github.com/UvRoxx/midnight-agent-skills.git
```

Once installed, your AI agent will automatically use the skills when you ask:
- *"Write a Midnight contract for voting"*
- *"Set up local Midnight infrastructure"*
- *"Deploy my contract to testnet"*

---

## About

**Night Skills** is an open-source project by [Webisoft Development Labs](https://webisoft.com), created to help developers build privacy-preserving applications on [Midnight Network](https://midnight.network) using AI-powered development tools.

### Maintainers

- **[Utkarsh Varma (@UvRoxx)](https://github.com/UvRoxx)** - Webisoft Development Labs

---

## What is Midnight?

**Midnight** is a privacy-first blockchain platform using zero-knowledge proofs for:

- **Private Smart Contract State** - Keep sensitive data encrypted
- **Selective Disclosure** - Prove claims without revealing underlying data
- **Shielded Transactions** - Private token transfers
- **Unshielded Transactions** - Public when transparency is needed

---

## Available Skills

| Skill | Description | Triggers |
|-------|-------------|----------|
| **midnight-compact-guide** | Complete Compact language reference (v0.19+) | "write contract", "Compact syntax", "ZK proof" |
| **midnight-sdk-guide** | TypeScript SDK & wallet integration | "SDK", "wallet integration", "connect dApp" |
| **midnight-infra-setup** | Local infrastructure setup | "setup node", "start indexer", "proof server" |
| **midnight-deploy** | Contract deployment | "deploy contract", "deploy to testnet" |
| **midnight-test-runner** | Test execution & debugging | "run tests", "debug test failure" |

---

## Skill Details

### midnight-compact-guide

Comprehensive guide to writing Compact smart contracts for Midnight (v0.19+).

**Features:**
- Complete syntax reference (pragma, imports, circuits)
- Type system (Counter, Uint, Bytes, Map, Vector, Set)
- Privacy patterns (selective disclosure, commit-reveal, authentication)
- Token patterns (shielded & unshielded tokens)
- Common mistakes to avoid
- Reference to working contracts

**Rules included:**
- `privacy-selective-disclosure.md` - ZK disclosure patterns
- `tokens-shielded-unshielded.md` - Token vault patterns
- `common-errors.md` - Error messages and solutions
- `openzeppelin-patterns.md` - Security patterns

**Derived from:** [midnight-mcp](https://github.com/Olanetsoft/midnight-mcp) syntax reference

### midnight-sdk-guide

TypeScript SDK integration guide for Midnight dApps.

**Features:**
- Contract deployment and interaction
- Wallet integration (Lace)
- State management
- Error handling
- React hooks and patterns

**Rules included:**
- `wallet-integration.md` - Complete wallet integration patterns

### midnight-infra-setup

Set up and run Midnight infrastructure locally using official dev tools.

**Based on:** [midnight-infra-dev-tools](https://github.com/midnightntwrk/midnight-infra-dev-tools)

**Components:**
| Component | Repository | Default Port |
|-----------|------------|--------------|
| Node | [midnight-node](https://github.com/midnightntwrk/midnight-node) | ws://127.0.0.1:9944 |
| Indexer | [midnight-indexer](https://github.com/midnightntwrk/midnight-indexer) | http://127.0.0.1:8088 |
| Proof Server | [midnight-ledger](https://github.com/midnightntwrk/midnight-ledger) | http://127.0.0.1:6300 |

**Important:** Version synchronization is critical:
- Indexer metadata must match node version
- Proof server must use same ledger version as node (check `midnight-node/Cargo.toml` lines 63-70)

### midnight-deploy

Deploy Midnight contracts to local or preview network.

**Features:**
- Compile Compact contracts
- Deploy to local infrastructure
- Deploy to preview testnet
- Environment configuration
- Contract address management

### midnight-test-runner

Run and debug Midnight contract tests.

**Features:**
- Vitest integration
- Contract simulator pattern
- Private state testing
- Selective disclosure verification
- Coverage reports

---

## Quick Start

### 1. Install Prerequisites

```bash
# Install Compact compiler
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
compact update +0.27.0

# Verify
compact check
node -v  # v23+
docker -v
```

### 2. Install Skills

**Claude Code:**
```bash
git clone https://github.com/UvRoxx/night-skills.git
cp -r night-skills/skills/* ~/.claude/skills/
```

**claude.ai:**
Add SKILL.md contents to project knowledge.

### 3. Set Up Infrastructure

**Option A: Using Starter Template (Recommended)**
```bash
git clone https://github.com/MeshJS/midnight-starter-template.git
cd midnight-starter-template
npm install
npm run setup-standalone  # Starts node, indexer, proof server
```

**Option B: Using Dev Tools**
```bash
git clone https://github.com/midnightntwrk/midnight-infra-dev-tools.git
cd midnight-infra-dev-tools
./scripts/start-all.sh
```

### 4. Use Skills

Once installed, skills activate automatically:

```
Write a Midnight contract for a token vault with shielded transfers
```

```
Set up local Midnight infrastructure
```

```
Deploy my contract and run tests
```

---

## Project Structure

```
night-skills/
├── README.md                          # This file
├── AGENTS.md                          # Agent guidance
├── CLAUDE.md                          # Claude-specific guidance
├── CONTRIBUTING.md                    # Contribution guide
├── LICENSE                            # MIT License
├── .gitignore
│
└── skills/
    │
    ├── midnight-compact-guide/        # Compact language reference
    │   ├── SKILL.md
    │   └── rules/
    │       ├── privacy-selective-disclosure.md
    │       ├── tokens-shielded-unshielded.md
    │       ├── common-errors.md
    │       └── openzeppelin-patterns.md
    │
    ├── midnight-sdk-guide/            # TypeScript SDK guide
    │   ├── SKILL.md
    │   └── rules/
    │       └── wallet-integration.md
    │
    ├── midnight-infra-setup/          # Infrastructure setup
    │   ├── SKILL.md
    │   └── scripts/
    │       └── setup.sh
    │
    ├── midnight-deploy/               # Contract deployment
    │   ├── SKILL.md
    │   └── scripts/
    │       └── deploy.sh
    │
    └── midnight-test-runner/          # Test runner
        ├── SKILL.md
        └── scripts/
            └── test.sh
```

---

## Creating New Skills

### Skill Structure

```
skills/midnight-{name}/
├── SKILL.md           # Required: Skill definition
├── scripts/           # Optional: Bash scripts
│   └── {script}.sh
├── rules/             # Optional: Detailed rules
│   └── {rule}.md
└── references/        # Optional: Reference docs
    └── {doc}.md
```

### SKILL.md Template

```markdown
---
name: midnight-{name}
description: One sentence with trigger phrases.
license: MIT
metadata:
  author: webisoft
  version: "1.0.0"
  midnight-version: "0.27.0"
---

# Skill Title

Brief description.

## When to Use
- Scenario 1
- Scenario 2

## How It Works
1. Step 1
2. Step 2

## Usage
\`\`\`bash
bash scripts/{script}.sh [args]
\`\`\`

## Troubleshooting
Common issues and solutions.

## References
- [Link](url)
```

### Package for Distribution

```bash
cd skills
zip -r midnight-{name}.zip midnight-{name}/
```

---

## Midnight Resources

### Official Repositories

| Resource | URL |
|----------|-----|
| Dev Tools | https://github.com/midnightntwrk/midnight-infra-dev-tools |
| Node | https://github.com/midnightntwrk/midnight-node |
| Indexer | https://github.com/midnightntwrk/midnight-indexer |
| Ledger/Proof Server | https://github.com/midnightntwrk/midnight-ledger |
| Token Vault Example | https://github.com/midnightntwrk/midnight-ledger/pull/142 |
| OpenZeppelin Compact | https://github.com/OpenZeppelin/compact-contracts |

### Documentation

| Resource | URL |
|----------|-----|
| Documentation | https://docs.midnight.network |
| Compact Guide | https://docs.midnight.network/develop/reference/compact/lang-ref |
| Lace Wallet | https://www.lace.io |
| Faucet (tSTAR) | https://faucet.preview.midnight.network |
| Starter Template | https://github.com/MeshJS/midnight-starter-template |
| midnight-mcp | https://github.com/Olanetsoft/midnight-mcp |

---

## Version Compatibility

When running local infrastructure, ensure version compatibility:

```bash
# Check node's ledger dependency
grep "midnight-ledger" midnight-node/Cargo.toml

# Verify proof server matches
# midnight-node/Cargo.toml lines 63-70 specify the ledger version

# Update indexer metadata when changing node version
cd midnight-indexer
./scripts/update-metadata.sh
```

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Contribution Guide

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/my-skill`
3. **Create** skill following the structure above
4. **Test** with real Midnight projects
5. **Commit** with clear messages: `git commit -m "Add midnight-{name} skill"`
6. **Push** to your fork: `git push origin feature/my-skill`
7. **Submit** a Pull Request

### Skill Guidelines

- Prefix skill names with `midnight-`
- Include comprehensive examples
- Test scripts on macOS and Linux
- Keep SKILL.md under 500 lines
- Reference official Midnight repos
- Include correct Compact syntax (v0.19+)

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers learn
- Focus on improving the project

---

## Acknowledgments

This project builds upon work from:

- **[midnight-mcp](https://github.com/Olanetsoft/midnight-mcp)** by Olanetsoft - Comprehensive Midnight MCP server with curated syntax reference
- **[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)** - Agent skills format and structure
- **[Midnight Network](https://midnight.network)** - Privacy-first blockchain platform
- **[MeshJS](https://meshjs.dev)** - Midnight starter template

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Support

- **Issues:** [GitHub Issues](https://github.com/UvRoxx/night-skills/issues)
- **Discord:** Join Midnight developer community
- **Website:** [webisoft.com](https://webisoft.com)

---

<div align="center">

**Built for [Midnight Network](https://midnight.network)**

An open-source project by [Webisoft Development Labs](https://webisoft.com)

Maintained by [Utkarsh Varma (@UvRoxx)](https://github.com/UvRoxx)

</div>
