# NelHark42 Token - ERC20 Smart Contract

Professional ERC20 token implementation with minting, burning, and ownership control.

> **Note:** No real money required. All testing uses free test networks or local simulation.

---

## Quick Start

```bash
npm install         # Install dependencies
npm test            # Run test suite (6 tests)
npm run deploy      # Deploy to local network
npm run interact    # Interactive demo
```

---

## Token Specifications

| Property | Value |
|----------|-------|
| **Name** | NelHark42 |
| **Symbol** | NH42 |
| **Decimals** | 18 |
| **Initial Supply** | 1,000 tokens |
| **Type** | ERC20 Standard |
| **Features** | Burnable, Mintable, Ownable |

---

## Technical Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| Solidity | 0.8.20 | Smart contract language |
| Hardhat | 2.17.0 | Development & testing environment |
| OpenZeppelin | 5.0.0 | Secure token libraries |
| ethers.js | v6 | Blockchain interaction |
| Chai | Latest | Testing & assertions |

---

## Project Structure

```
code/
├── contracts/      → NelHark42.sol
└── test/           → NelHark42.test.js

deployment/        → Hardhat configuration & scripts
documentation/     → Detailed guides
```

---

## Contract Functions

| Function | Access | Purpose |
|----------|--------|---------|
| `constructor()` | Deployment | Initialize 1,000 tokens |
| `mint(address, amount)` | Owner only | Create new tokens |
| `burn(amount)` | Anyone | Destroy tokens |
| `transfer(address, amount)` | Anyone | Send tokens |
| `balanceOf(address)` | Public | Check balance |
| `totalSupply()` | Public | Get total supply |

---

## Test Suite (6 Tests - All Passing)

```
✓ Deployment: Correct name, symbol, supply
✓ Transfer: Send tokens between accounts
✓ Burn: Reduce supply correctly
✓ Owner Mint: Only owner can create tokens
✓ Non-owner Mint: Non-owners blocked
✓ Transfer Fail: Revert on insufficient balance
```

Run: `npm test`

---

## Demo Results (Local Network)

When you run `npm run interact`, here's the output you'll see:

```
================== NelHark42 Token Demo ==================

Step 1: Deploy Contract
------------------------
  Contract deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
  Owner address:        0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

Step 2: Token Information
------------------------
  Token name:     NelHark42
  Symbol:         NH42
  Decimals:       18
  Total Supply:   1000.0 NH42

Step 3: Initial Balance
------------------------
  Owner balance:  1000.0 NH42

Step 4: Transfer Tokens
------------------------
  From:           0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  To:             0x0000000000000000000000000000000000000001
  Amount:         100.0 NH42
  Owner balance after:     900.0 NH42
  Recipient balance:       100.0 NH42

Step 5: Burn Tokens
------------------------
  Burn amount:    50.0 NH42
  Before burn:
    Total supply: 1000.0 NH42
    Owner balance: 900.0 NH42
  After burn:
    Total supply: 950.0 NH42
    Owner balance: 850.0 NH42

================== Final Summary ==================

  Token Name:        NelHark42
  Token Symbol:      NH42
  Total Supply:      950.0 NH42
  Owner Balance:     850.0 NH42
  Recipient Balance: 100.0 NH42

================================================
```

**✅ All functions verified locally**

Note: This demo uses Hardhat local blockchain. No real funds are needed.

---

## Deployment Options

### Local Development (Recommended)
```bash
npm run deploy
```
- Instant deployment
- Free (no funds needed)
- Perfect for testing
- Full functionality

### Testnet Deployment
```bash
npm run deploy:sepolia    # Ethereum Sepolia
npm run deploy:bsc        # Binance Smart Chain
```
**Requirements:** `.env` with MetaMask private key + ~0.1 testnet coins (free from faucets)

**Faucets:**
- Ethereum: https://sepoliafaucet.com
- BSC: https://testnet.binance.org/faucet-smart

---

## Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run all 6 tests |
| `npm run deploy` | Deploy to local network |
| `npm run deploy:sepolia` | Deploy to Ethereum Sepolia |
| `npm run deploy:bsc` | Deploy to BSC Testnet |
| `npm run interact` | Interactive demo |
| `npm run compile` | Compile contracts |

---

## Security & Best Practices

- OpenZeppelin audited libraries
- Input validation on all functions
- Ownership controls (only owner can mint)
- Solidity 0.8.20+ automatic overflow protection
- Full test coverage (6/6 tests passing)

---

## Documentation

- `documentation/contract.md` - Contract details
- `documentation/tests.md` - Test breakdown
- `documentation/deployment.md` - Deployment guide
- `documentation/interact.md` - Usage examples

---

## Key Implementation Details

- **Built on OpenZeppelin ERC20 standard** for reliability
- **Full test coverage** with comprehensive test suite
- **Ownership pattern** for secure privileged operations
- **Burnable tokens** allow permanent supply reduction
- **Input validation** prevents invalid operations

---
