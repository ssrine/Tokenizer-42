# Deployment Guide

## Overview

The deployment process copies the contract files from the `code/` directory to the `deployment/` directory, then uses Hardhat to compile and deploy the token to a blockchain network.

## Why Copy Files?

Hardhat requires source files to be inside its project directory. The project structure keeps contracts in `code/` for organizational reasons, so we use a copy script as a bridge.

## Deployment Process

### Step 1: Copy Contracts
```bash
npm run copy
```
This copies:
- `../code/contracts/*.sol` → `./contracts/`
- `../code/test/*.js` → `./test/`

### Step 2: Compile
```bash
npm run compile
```
Compiles Solidity contracts using configured Solidity version (0.8.20).

### Step 3: Deploy
```bash
npm run deploy
```

Runs the deployment script which:
1. Gets the deployer's account
2. Creates an instance of NelHark42 contract
3. Deploys contract to the network
4. Waits for confirmation
5. Retrieves contract details (address, owner, supply)
6. Saves deployment info to `deployments/{network}_deployment.json`

## Deployment Output

```
Deploying NelHark42 token...

✅ Deployment successful!

Contract Address: 0x5FbDB2315678afccb333f8a9c08e...
Owner:           0xf39Fd6e51aad88F6F4ce6aB8827...
Total Supply:    1000000.0 NH42

� Deployment info saved to: deployment/deployments/hardhat_deployment.json
```

## Deployment Info File

After deployment, a JSON file is saved with:
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "network": "hardhat",
  "contractAddress": "0x5FbDB2315678...",
  "owner": "0xf39Fd6e51aad...",
  "totalSupply": "1000000000000000000000000",
  "decimals": 18
}
```

## Networks

Available networks in `hardhat.config.js`:

### Local Networks
- **hardhat** (default) - Ephemeral local network, resets each run
- **localhost** - Long-running local Hardhat node

### Testnets
- **sepolia** - Ethereum testnet
- **bsc-testnet** - Binance Smart Chain testnet

### Mainnet
- **mainnet** - Ethereum mainnet (⚠️ Use with real funds)

## Deploying to Different Networks

```bash
# Deploy to Sepolia testnet
npm run deploy -- --network sepolia

# Deploy to BSC testnet
npm run deploy -- --network bscTestnet

# Deploy to mainnet (requires funded account)
npm run deploy -- --network mainnet
```

## Configuration

Hardhat configuration (`hardhat.config.js`):
```javascript
solidity: "0.8.20",
paths: {
  sources: "./contracts",
  tests: "./test"
},
networks: {
  hardhat: {},
  localhost: {},
  sepolia: { url: process.env.SEPOLIA_RPC_URL, ... },
  // ... other networks
}
```

## Verifying on Explorers

After deploying to a testnet, verify the contract on blockchain explorers:

1. Go to explorer (etherscan.io for Ethereum, bscscan.com for BSC)
2. Search for your contract address
3. Click "Verify Contract" button
4. Upload NelHark42.sol source
5. Select compiler version: 0.8.20
6. Select "Yes" for optimizations (200 runs)

## Troubleshooting

**"Insufficient funds" error:**
- Use hardhat network (free) or localhost
- Or fund account for testnet faucet

**"Network connection failed":**
- Check RPC URL in hardhat.config.js
- Verify internet connection

**"Contract verification failed":**
- Ensure compiler version matches (0.8.20)
- Use same constructor parameters
- Check for modified source code

## Next Steps

After deployment:
1. Note the contract address
2. Share deployment JSON for team reference
3. Run interact script to test functionality
4. Write frontend integration code
