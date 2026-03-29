# 1AM Wallet Integration

Build DApps on Midnight Network with the 1AM Wallet browser extension.

## Overview

The 1AM Wallet provides a DApp Connector API at `window.midnight['1AM']` for:
- Wallet connection and address discovery
- ZK proof generation via 1AM ProofStation (no local server needed)
- Dust sponsorship (users don't pay gas fees)
- Transaction balancing, signing, and submission
- Multi-network support (Preview, Preprod, Mainnet)

## Key Principle

**Route everything through the wallet.** Never call the proof server directly from your DApp — you'll get CORS errors and 401s. The wallet handles proving, balancing, and submission internally.

## Quick Start

```bash
npm install @midnight-ntwrk/midnight-js-contracts @midnight-ntwrk/midnight-js-types @midnight-ntwrk/compact-runtime @midnight-ntwrk/ledger-v8
```

Install the [1AM Wallet](https://chromewebstore.google.com/detail/1am/bphnkdkcnfhompoegfpgnkidcjfbojjp) from the Chrome Web Store. For beta builds, see [1am.xyz/install-beta](https://1am.xyz/install-beta).

## Rules

- `wallet-connection.md` — Detect, connect, and manage wallet state
- `provider-setup.md` — Bridge ConnectedAPI to MidnightProviders
- `transaction-flow.md` — Submit transactions through the wallet
- `proof-server.md` — 1AM ProofStation integration
- `common-mistakes.md` — Avoid CORS, v3 deprecation, WASM issues
- `network-config.md` — Network URLs and configuration
