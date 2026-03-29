# 1AM Wallet Connection

## Detection

```typescript
async function detectWallet(timeoutMs = 5000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (window.midnight?.['1AM']) return true;
    await new Promise(r => setTimeout(r, 200));
  }
  return false;
}
```

## Connection

```typescript
const api = window.midnight['1AM'];
const connectedAPI = await api.enable();

// Get wallet configuration (network, indexer URL, prover URL)
const config = await connectedAPI.getConfiguration();

// Get user addresses
const shieldedAddresses = await connectedAPI.getShieldedAddresses();
const unshieldedAddress = await connectedAPI.getUnshieldedAddress();
```

## Network Auto-Detection

The wallet reports its active network. Try networks in order:

```typescript
async function connectToNetwork(targetNetwork: string) {
  const connectedAPI = await window.midnight['1AM'].enable();
  const config = await connectedAPI.getConfiguration();

  if (config.networkId !== targetNetwork) {
    throw new Error(`Wallet is on ${config.networkId}, expected ${targetNetwork}`);
  }

  return connectedAPI;
}
```

## Install Link

If wallet not detected, direct users to: `https://1am.xyz/install-beta`
