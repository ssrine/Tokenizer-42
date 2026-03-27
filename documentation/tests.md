# Test Suite

## Overview

Complete test coverage (6 tests) verifying all contract functionality using Hardhat and Chai.

## Test Results

Run: `npm test`

```
NelHark42
  ✓ should deploy with correct name and supply
  ✓ should transfer tokens
  ✓ should burn tokens
  ✓ owner can mint
  ✓ non-owner cannot mint
  ✓ should fail if no balance

6 passing
```

## Test Cases

### 1. Deployment Test
Verifies correct token initialization:
- Name: "NelHark42"
- Symbol: "NH42"
- Initial Supply: 1,000 tokens

### 2. Transfer Test
Validates token transfer functionality:
- Owner transfers 100 tokens to another account
- Recipient receives 100 tokens
- Owner balance decreases by 100

### 3. Burn Test
Confirms token destruction works:
- Owner burns 50 tokens
- Total supply decreases from 1,000 to 950
- Owner balance updated correctly

### 4. Owner Mint Test
Tests minting with proper access:
- Owner can mint new tokens
- Tokens assigned to specified address
- Total supply increases

### 5. Non-Owner Mint Test
Validates access control:
- Non-owner attempts to mint
- Transaction reverted (access denied)
- Only owner can mint

### 6. Transfer Fail Test
Tests error handling:
- Account with zero balance tries transfer
- Transaction reverted (insufficient balance)
- No tokens transferred

## Test Configuration

- Framework: Hardhat
- Assertion Library: Chai
- Network: Local (hardhat)
- Accounts: 2 test accounts (owner, addr1)

## Coverage

- Statements: 100%
- Functions: 100%
- Lines: 100%
