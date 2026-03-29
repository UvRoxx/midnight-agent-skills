# Network Configuration

## Endpoints

| Network | Indexer | Node | Faucet |
|---------|--------|------|--------|
| Preview | `https://indexer.preview.midnight.network/api/v4/graphql` | `wss://rpc.preview.midnight.network` | [Get tNight](https://faucet.preview.midnight.network/) |
| Preprod | `https://indexer.preprod.midnight.network/api/v4/graphql` | `wss://rpc.preprod.midnight.network` | [Get tNight](https://faucet.preprod.midnight.network/) |
| Mainnet | `https://indexer.mainnet.midnight.network/api/v4/graphql` | `wss://rpc.mainnet.midnight.network` | — |

## 1AM ProofStation URLs

| Network | URL |
|---------|-----|
| Preview | `https://api-preview.1am.xyz` |
| Preprod | `https://api-preprod.1am.xyz` |
| Mainnet | `https://api.1am.xyz` |

## 1AM Explorer

All networks: `https://explorer.1am.xyz`
- Transaction: `explorer.1am.xyz/tx/{hash}?network=preview`
- Contract: `explorer.1am.xyz/contract/{address}?network=preview`

## SDK Dependencies

```json
{
  "@midnight-ntwrk/midnight-js-contracts": "^4.0.0",
  "@midnight-ntwrk/midnight-js-types": "^4.0.0",
  "@midnight-ntwrk/midnight-js-indexer-public-data-provider": "^4.0.0",
  "@midnight-ntwrk/midnight-js-fetch-zk-config-provider": "^4.0.0",
  "@midnight-ntwrk/midnight-js-network-id": "^4.0.0",
  "@midnight-ntwrk/compact-runtime": "^0.15.0",
  "@midnight-ntwrk/ledger-v8": "^8.0.0"
}
```

## Important: Use v4 API

The indexer v3 API (`/api/v3/graphql`) is deprecated on preprod. Always use `/api/v4/graphql`.

## Reference Implementation

- [ZKMint (Night-ID)](https://github.com/webisoftSoftware/zk-mint) — Full working DApp with 1AM integration
- [1AM Wallet](https://1am.xyz) — Browser extension
- [1AM Developer Docs](https://1am.xyz/developers)
- [1AM AI Builder](https://build.1am.xyz)
