# Common Mistakes

## 1. Calling the Proof Server Directly

**Symptom:** CORS errors, 401 Unauthorized
**Cause:** DApp creates `httpClientProofProvider('https://api-preprod.1am.xyz')`
**Fix:** Use `connectedAPI.proveTransaction()` instead

## 2. Using Indexer v3 URLs

**Symptom:** Sync failures, stale data on preprod
**Cause:** `/api/v3/graphql` is deprecated
**Fix:** Use `/api/v4/graphql` for all networks

## 3. WebSocket Import Failure

**Symptom:** `The export WebSocket was not found in module isomorphic-ws`
**Cause:** SDK does `import { WebSocket } from 'isomorphic-ws'` but browser build only has default export
**Fix:** Create a shim:
```javascript
// lib/isomorphic-ws-shim.js
const WS = typeof WebSocket !== 'undefined' ? WebSocket : globalThis.WebSocket;
export { WS as WebSocket };
export default WS;
```
Alias in next.config or vite config.

## 4. Missing Node.js Polyfills (Next.js)

**Symptom:** `Module not found: Can't resolve 'buffer'`
**Fix:** Webpack fallbacks:
```javascript
config.resolve.fallback = {
  buffer: require.resolve('buffer/'),
  crypto: require.resolve('crypto-browserify'),
  stream: require.resolve('stream-browserify'),
  fs: false, path: false, os: false, net: false, tls: false,
};
```

## 5. LevelDB Native Build Error

**Symptom:** `No native build was found for platform=darwin arch=arm64`
**Cause:** `@midnight-ntwrk/midnight-js-level-private-state-provider` uses native LevelDB
**Fix:** Use an in-memory provider instead (see reference implementation in ZKMint)

## 6. Transaction Hash vs Identifier

**Symptom:** Explorer says "Transaction not found"
**Cause:** SDK returns a 33-byte identifier, explorer expects a 32-byte hash
**Fix:** Query indexer: `transactions(offset: { identifier: $id }) { hash }`
