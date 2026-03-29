# Provider Setup

Bridge the 1AM wallet's ConnectedAPI into the MidnightProviders stack that the SDK expects.

## Architecture

```
Your DApp
  │
  ├─ walletProvider.balanceTx()  →  1AM Wallet popup  →  user approves
  ├─ proofProvider.proveTx()     →  1AM ProofStation   →  ZK proof generated
  ├─ walletProvider.submitTx()   →  1AM Wallet popup   →  tx submitted to chain
  │
  ├─ publicDataProvider          →  Midnight Indexer    →  read contract state
  └─ zkConfigProvider            →  Midnight Indexer    →  fetch circuit keys
```

## Building Providers

```typescript
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';

function buildProviders(connectedAPI, config) {
  return {
    walletProvider: {
      balanceTx: (tx) => connectedAPI.balanceUnsealedTransaction(tx),
      submitTx: (tx) => connectedAPI.submitTransaction(tx),
    },
    proofProvider: {
      proveTx: (tx) => connectedAPI.proveTransaction(tx),
    },
    publicDataProvider: indexerPublicDataProvider(config.indexerUrl),
    zkConfigProvider: new FetchZkConfigProvider(config.indexerUrl),
  };
}
```

## Key Point

The wallet handles proving and fee payment. Your DApp never touches the proof server directly.
