# Deployment Guide

Deploy NelHark42 ERC20 token to Ethereum Sepolia testnet.

---

## Token Specifications

| Property | Value |
|----------|-------|
| **Name** | NelHark42 |
| **Symbol** | NH42 |
| **Standard** | ERC20 (Burnable, Mintable, Ownable) |
| **Decimals** | 18 |
| **Initial Supply** | 1,000 tokens |
| **Network** | Sepolia Testnet (Chain ID: 11155111) |

---

## Prerequisites

### 1. Get Test ETH (Required)
Choose one of these faucets:
- **Sepolia Faucet:** https://sepoliafaucet.com
- **Google Cloud Faucet:** https://cloud.google.com/application/web3/faucet/ethereum/sepolia

Steps:
- Paste your wallet address
- Claim ~0.5 ETH (free, instant)

### 2. Setup Configuration File
Create `deployment/.env`:
```
PRIVATE_KEY=0xYourMetaMaskPrivateKey
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YourInfuraKey
RECIPIENT=0x0000000000000000000000000000000000000001
```

**Get Private Key from MetaMask:**
- Click 3-dot menu → Account Details → Export Private Key

**Get RPC URL:**
- Option A (Infura): https://infura.io (free registration)
- Option B (Public): `https://sepolia-rpc.publicnode.com`

---


## Quick Start

### Step 1: Deploy (ONE TIME)
```bash
npm run deploy
```
- Copies contracts from `code/contracts/`
- Compiles Solidity to bytecode
- Deploys to Sepolia testnet
- Saves address to `deployment-info.json`

### Step 2: Interact (REUSABLE)
```bash
npm run interact
```
- Reads saved contract address
- Performs transfers & burns
- Creates new transactions each run



## Other Commands

| Command | Purpose |
|---------|---------|
| `npm run compile` | Compile without deploying |
| `npm run clean` | Remove build artifacts |

---

## Output Example

After `npm run deploy`:
```
Contract Address: 0x8525F73547378e21F2356247b87D8aEcd9dAd213
Owner Address:    0x09f963232EEF8b4a25752AeF491d695d287ff6F3
Total Supply:     1000.0 NH42
Status:           ✅ Live on Sepolia
```

View on etherscan: https://sepolia.etherscan.io/address/0x8525F73547378e21F2356247b87D8aEcd9dAd213

---

## deployment-info.json

Auto-generated after deploy:
```json
{
  "contractAddress": "0x8525F73547378e21F2356247b87D8aEcd9dAd213",
  "ownerAddress": "0x09f963232EEF8b4a25752AeF491d695d287ff6F3",
  "totalSupply": "1000.0 NH42",
  "chainId": 11155111,
  "network": "sepolia"
}
```

---

## Flow

```
1. npm run deploy    → Deploy once → Save address
2. npm run interact  → Use saved address → Create transactions
3. Run again anytime → Same contract, new transactions
```

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| "Insufficient funds for gas" | Get test ETH: https://sepoliafaucet.com |
| "Private key not found" | Verify `.env` file in `deployment/` folder |
| "Network connection error" | Check RPC URL or try different endpoint |
| "deployment-info.json not found" | Run `npm run deploy` first |
| Dependency conflict (ERESOLVE) | Use `npm install --legacy-peer-deps` |

---

## Tools Used

| Tool | Purpose |
|------|---------|
| **Hardhat** | Smart contract development & deployment |
| **ethers.js** | Blockchain interaction |
| **OpenZeppelin** | Secure ERC20 contracts |
| **Sepolia** | Ethereum test network |
| **Infura/PublicNode** | RPC endpoints |

