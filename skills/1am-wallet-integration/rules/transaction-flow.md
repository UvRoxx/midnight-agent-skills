# Transaction Flow

## Deploy a Contract

```typescript
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';

const deployed = await deployContract(providers, {
  contract: CompiledContract,
  initialState: { /* your initial state */ },
});

const contractAddress = deployed.deployTxData.public.contractAddress;
```

## Call a Contract Circuit

```typescript
import { findDeployedContract, submitCallTx } from '@midnight-ntwrk/midnight-js-contracts';

const contract = await findDeployedContract(providers, {
  contractAddress: '09dbe05f...',
  contract: CompiledContract,
});

const result = await contract.callTx.myCircuit(arg1, arg2);
```

## What Happens Under the Hood

```
1. Your DApp calls contract.callTx.myCircuit(args)
2. SDK builds an unproven transaction
3. 1AM Wallet popup: "Approve this transaction?"
4. User clicks Approve
5. 1AM ProofStation generates ZK proof (~1 second)
6. 1AM Wallet balances the tx with dust (user pays nothing)
7. 1AM Wallet submits to Midnight Network
8. Your DApp gets the result back
```

## Transaction Hash

The SDK returns a transaction identifier from `submitTransaction()`. To get the actual indexer hash for explorer links, query:

```graphql
query { transactions(offset: { identifier: $id }) { hash } }
```

The identifier has a `00` prefix byte (33 bytes). The indexer hash is 32 bytes.
