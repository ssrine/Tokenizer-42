# Interactive Demo

## Overview

Demonstrates core token functionality: deploy, transfer, and burn operations using ethers.js.

## Run Demo

```bash
npm run interact
```

## Demo Output

Complete terminal output when running `npm run interact`:

```
➜  deployment git:(main) ✗ npm run interact

> tokenizer42@1.0.0 interact
> npm run copy && cross-env NODE_PATH=./node_modules hardhat run interact.js --network hardhat

> tokenizer42@1.0.0 copy
> node copy-contracts.js

📋 Setting up contracts and tests...

📂 Contracts:
   ✓ NelHark42.sol
   Copied 1 file(s)

📂 Tests:
   ✓ NelHark42.test.js
   Copied 1 file(s)

✅ Setup complete! Files ready for Hardhat.

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
    Total supply:  1000.0 NH42
    Owner balance: 900.0 NH42
  After burn:
    Total supply:  950.0 NH42
    Owner balance: 850.0 NH42

================== Final Summary ==================

  Token Name:         NelHark42
  Token Symbol:       NH42
  Total Supply:       950.0 NH42
  Owner Balance:      850.0 NH42
  Recipient Balance:  100.0 NH42

================================================

➜  deployment git:(main) ✗
```

## Operations Demonstrated

### Setup
- Copy script verifies contracts and tests are ready
- Files prepared for Hardhat execution

### Step 1: Deploy Contract
- Deploys fresh NelHark42 contract instance
- Contract address: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- Owner address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Initial supply: 1,000 NH42 minted to owner

### Step 2: Token Information
- Displays contract metadata:
  - Name: NelHark42
  - Symbol: NH42
  - Decimals: 18
  - Total Supply: 1,000 NH42

### Step 3: Initial Balance
- Queries owner's balance before any operations
- Shows: 1,000.0 NH42

### Step 4: Transfer Tokens
- Owner transfers 100 NH42 to recipient
- Recipient: `0x0000000000000000000000000000000000000001`
- Owner balance after: 900.0 NH42
- Recipient balance: 100.0 NH42

### Step 5: Burn Tokens
**Before Burn:**
- Total supply: 1,000.0 NH42
- Owner balance: 900.0 NH42

**Burn Action:**
- Owner burns 50.0 NH42

**After Burn:**
- Total supply: 950.0 NH42
- Owner balance: 850.0 NH42

### Final Summary
- Token Name: NelHark42
- Token Symbol: NH42
- Total Supply: 950.0 NH42 (reduced from burn)
- Owner Balance: 850.0 NH42
- Recipient Balance: 100.0 NH42 (from transfer)

## Key Concepts

**ethers.js Functions Used:**
- `parseEther()` - Convert decimals to wei (100 → 100*10^18)
- `formatEther()` - Convert wei to decimals (1000*10^18 → 1000.0)
- `getContractFactory()` - Get contract interface
- `deploy()` - Deploy new instance
- `transfer()` - Send tokens
- `burn()` - Destroy tokens
- `balanceOf()` - Get balance

## Customizing Demo

Edit `deployment/interact.js` to modify:
- Transfer amount
- Burn amount
- Additional operations
- Different recipients

## Error Handling

Script includes error catching:
```javascript
main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
```

Any error stops script and displays message.

## Use Cases

- Test contract after deployment
- Verify all functions work
- Learn ethers.js patterns
- Demo for stakeholders

