# 1AM ProofStation

ZK proof generation requires compute. 1AM ProofStation handles this so DApps don't need to run a proof server.

## How It Works

When a user approves a transaction in the 1AM wallet, the proof is generated automatically via ProofStation. DApps never call ProofStation directly.

## Endpoints

| Network | URL |
|---------|-----|
| Preview | `https://api-preview.1am.xyz` |
| Preprod | `https://api-preprod.1am.xyz` |
| Mainnet | `https://api.1am.xyz` |

## API Documentation

`https://api.1am.xyz/docs` — Swagger UI with full API spec.

## Dust Sponsorship

1AM ProofStation includes dust sponsorship — users don't need dust tokens to transact. The server pays transaction fees on behalf of the user.

## For Advanced Users (Local Proof Server)

If you want to run your own proof server:

1. Set proof server mode to "Local" in 1AM wallet settings
2. Run: `docker pull midnightntwrk/proof-server:8.0.3`
3. Start: `docker run -p 6300:6300 midnightntwrk/proof-server:8.0.3`
4. URL: `http://localhost:6300`

Note: On Apple Silicon, the proof server runs via Rosetta (x86 emulation) — ZK proofs will be slow (~30-60s instead of <1s on the remote server).

## DO NOT Call ProofStation Directly

```
WRONG:  DApp → api-preprod.1am.xyz/prove → CORS error / 401
RIGHT:  DApp → 1AM Wallet → ProofStation → works
```

The wallet has the API key and runs in an extension context (no CORS).
