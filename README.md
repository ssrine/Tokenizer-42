# NelHark42 Token - ERC20 Smart Contract

Professional ERC20 token deployed on Ethereum Sepolia testnet.

---

## Quick Start

```bash
npm install         # Install dependencies
npm run deploy      # Deploy contract (ONE TIME)
npm run interact    # Run demo (REUSABLE)
```

---

## Project Setup

### Deployed Contract (Sepolia Testnet)

| Property | Value |
|----------|-------|
| **Contract Address** | `0x8525F73547378e21F2356247b87D8aEcd9dAd213` |
| **Owner Address** | `0x09f963232EEF8b4a25752AeF491d695d287ff6F3` |
| **Network** | Ethereum Sepolia (Chain ID: 11155111) |
| **Status** | ✅ Live & Verified |

### Project Structure

```
Tokenizer/
├── code/
│   └── contracts/
│       └── NelHark42.sol          (ERC20 token contract)
├── deployment/
│   ├── .env                        (Private key & RPC URL)
│   ├── package.json                (npm scripts & dependencies)
│   ├── hardhat.config.js           (Sepolia network config)
│   ├── deploy.js                   (Deployment script)
│   ├── interact.js                 (Demo script)
│   ├── copy-contracts.js           (Copy contracts for compilation)
│   └── deployment-info.json        (Auto-generated after deploy)
├── documentation/
│   ├── deployment.md               (Deployment guide)
│   ├── interact.md                 (Demo walkthrough)
│   ├── contract.md                 (Contract details)
|   └── whitepaper.md               (whitepaper)
└── README.md                       (This file)
```

### How It Works

1. **Contract Code** → `/code/contracts/NelHark42.sol`
2. **Deployment Scripts** → `/deployment/` (deploy.js, interact.js)
3. **Configuration** → `.env` file with private key & RPC endpoint
4. **Network** → Sepolia testnet (free test ETH blockchain)
5. **Contract Address** → Saved in `deployment-info.json` after deploy

---

## Token Specifications

| Property | Value |
|----------|-------|
| **Name** | NelHark42 |
| **Symbol** | NH42 |
| **Decimals** | 18 |
| **Supply** | 1,000 tokens |
| **Standards** | ERC20 (Burnable, Mintable, Ownable) |

---

## Design Choices

### Blockchain Selection
Ethereum Sepolia testnet was chosen as the network. Ethereum is the most widely used blockchain for smart contracts with a robust and well-documented ecosystem. Sepolia was selected instead of mainnet to avoid real transaction costs and safely test the contract.

### Token Standard
The ERC20 standard ensures compatibility with wallets, exchanges, and blockchain tools. It is the most common and widely supported token standard in the Ethereum ecosystem.

### Libraries
OpenZeppelin contracts provide audited and community-tested implementations of ERC20, Ownable, and other critical components. This reduces the risk of vulnerabilities and avoids reimplementing proven security patterns.

### Development Tools
Hardhat simplifies compilation, testing, and deployment. ethers.js provides a clean interface for interacting with the blockchain and managing wallet operations.

---

## Deployment Information

- **Network:** Ethereum Sepolia Testnet
- **Chain ID:** 11155111
- **Contract Address:** `0x8525F73547378e21F2356247b87D8aEcd9dAd213`
- **Block Explorer:** https://sepolia.etherscan.io/address/0x8525F73547378e21F2356247b87D8aEcd9dAd213
- **Owner Address:** `0x09f963232EEF8b4a25752AeF491d695d287ff6F3`
- **Initial Supply:** 1000 NH42
- **Deployment Date:** 2026-03-27

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Solidity | 0.8.20 | Smart contract language |
| Hardhat | 2.17.0 | Development framework |
| OpenZeppelin | 5.0.0 | Secure libraries |
| ethers.js | v6 | Blockchain interaction |

---

## Deployment

### Setup

Create `.env` file in `deployment/` folder:

```
PRIVATE_KEY=0xYourMetaMaskPrivateKey
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YourInfuraKey
RECIPIENT=0x0000000000000000000000000000000000000001
```

**Get free test ETH:** https://sepoliafaucet.com

**Get free test ETH:** https://sepoliafaucet.com

### Deploy & Run

```bash
npm run deploy      # Deploy once
npm run interact    # Run demo 
```

---

## Contract Functions

| Function | Access | Purpose |
|----------|--------|---------|
| `transfer(to, amount)` | Anyone | Send tokens |
| `burn(amount)` | Anyone | Destroy tokens |
| `mint(to, amount)` | Owner | Create tokens |
| `balanceOf(address)` | Public | Check balance |
| `totalSupply()` | Public | Get total supply |



## Commands

| Command | Purpose |
|---------|---------|
| `npm run deploy` | Deploy to Sepolia |
| `npm run interact` | Run demo |
| `npm run compile` | Compile contracts |
| `npm run clean` | Clean build |

---

## Documentation

- [Deployment Guide](documentation/deployment.md)
- [Interactive Demo](documentation/interact.md)
- [Contract Details](documentation/contract.md)

---

## Security Considerations

- **Owner Control:** Only the owner can mint new tokens
- **User Autonomy:** Users can burn their own tokens
- **Input Validation:** Non-zero address and positive amount checks
- **Audited Code:** Built using OpenZeppelin audited contracts

These measures ensure safe and controlled token behavior.

---
