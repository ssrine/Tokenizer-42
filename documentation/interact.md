# Interactive Demo

## Overview

The `interact.js` script demonstrates the core functionality of the NelHark42 token by executing real contract operations in sequence. It shows how to deploy, transfer, and burn tokens using ethers.js.

## Running the Demo

```bash
npm run interact
```

This command:
1. Copies contract files
2. Compiles the contract
3. Runs the demo script
4. Displays step-by-step output

## Demo Flow

### Step 1: Deploy Contract
```javascript
const token = await NelHark42.deploy();
await token.waitForDeployment();
```

Deploys a fresh instance of the NelHark42 token and waits for confirmation.

**Output:**
```
Step 1: Deploy contract
  ✓ Deployed at: 0x5FbDB2315678...
```

### Step 2: Check Initial Balance
```javascript
const balance = await token.balanceOf(owner.address);
```

Retrieves the deployer's balance (should be 1,000,000 tokens).

**Output:**
```
Step 2: Check initial balance
  ✓ Owner has: 1000000.0 NH42
```

### Step 3: Transfer Tokens
```javascript
await token.transfer(
  "0x0000000000000000000000000000000000000001",
  ethers.parseEther("100")
);
```

Transfers 100 tokens to address 0x0000...0001. The balance decreases by 100.

**Output:**
```
Step 3: Transfer 100 tokens
  ✓ Transferred: 100 NH42
  ✓ Owner balance: 999900.0 NH42
```

### Step 4: Burn Tokens
```javascript
await token.burn(ethers.parseEther("50"));
```

Burns 50 tokens from the owner's balance, reducing total supply.

**Output:**
```
Step 4: Burn 50 tokens
  ✓ Burned: 50 NH42
  ✓ Owner balance: 999850.0 NH42
```

### Step 5: Display Summary
```javascript
const supply = await token.totalSupply();
```

Shows final balances and total supply.

**Output:**
```
Summary:
  • Total Supply: 999850.0 NH42
  • Owner Balance: 999850.0 NH42
```

## Key Operations

### Transfer
- Sender: owner
- Recipient: 0x0000000000000000000000000000000000000001
- Amount: 100 tokens

### Burn
- Token holder: owner
- Amount: 50 tokens
- Effect: Reduces total supply and holder's balance

## Technical Details

### ethers.js Functions Used

**parseEther(value)**
- Converts decimal string to wei (smallest unit)
- "100" → "100000000000000000000" (100 * 10^18)

**formatEther(value)**
- Converts wei to decimal string
- "999850000000000000000000" → "999850.0"

**Contract Calls**
- `token.deploy()` - Deploys new contract
- `token.transfer()` - Transfers tokens
- `token.burn()` - Burns tokens
- `token.balanceOf()` - Gets balance
- `token.totalSupply()` - Gets total supply

## Error Handling

The demo includes error catching:
```javascript
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Error:', error.message);
        process.exit(1);
    });
```

If any step fails, the error message is displayed and program exits.

## Customizing the Demo

To modify the demo (e.g., change transfer amount):

Edit `deployment/interact.js`:
```javascript
// Change this line
await token.transfer(recipient, ethers.parseEther("100"));

// To transfer different amount
await token.transfer(recipient, ethers.parseEther("250"));
```

## Network Configuration

By default, the demo uses the **hardhat** network (local, ephemeral). To use a different network:

```bash
npx hardhat run deployment/interact.js --network localhost
```

## Learning Outcomes

After running this demo, you'll understand:
- How to deploy contracts programmatically
- How to read contract state (balances, supply)
- How to execute state-changing operations (transfer, burn)
- How ethers.js communicates with smart contracts
- How to handle async/await in blockchain operations
