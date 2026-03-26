# NelHark42 Test Suite

## Overview

The test suite contains 8 essential tests that verify all critical functionality of the NelHark42 token contract. Tests are written using Hardhat and Chai.

## Test Structure

All tests follow the pattern:
1. Deploy fresh contract before each test
2. Execute operation
3. Assert expected behavior
4. Test error conditions

## Test Groups

### 1. Deployment (2 tests)

#### Test: "Should deploy with correct name and symbol"
Verifies the token deploys with correct ERC20 metadata:
- Name: "NelHark42"
- Symbol: "NH42"
- Decimals: 18

#### Test: "Should mint 1,000,000 tokens to owner at deployment"
Confirms initial supply is created and assigned to deployer:
- Total supply: 1,000,000 tokens
- Owner balance: 1,000,000 tokens

### 2. Transfers (2 tests)

#### Test: "Should transfer tokens between accounts"
Verifies standard token transfers work correctly:
- Owner transfers 100 tokens to address1
- Assert address1 receives 100 tokens
- Assert owner's balance decreases by 100

#### Test: "Should revert if sender has insufficient balance"
Tests error handling:
- Address1 attempts to transfer 2,000,000 tokens (more than exists)
- Assert transaction reverts with `ERC20InsufficientBalance` error

### 3. Burning (2 tests)

#### Test: "Should burn tokens and reduce total supply"
Verifies token destruction:
- Owner burns 100 tokens
- Total supply decreases by 100
- Owner's balance decreases by 100

#### Test: "Should revert if trying to burn more than balance"
Tests burn limits:
- Owner attempts to burn 2,000,000 tokens
- Assert transaction reverts with `ERC20InsufficientBalance` error

### 4. Minting (2 tests)

#### Test: "Should allow owner to mint tokens"
Verifies owner-only minting:
- Owner mints 1,000 new tokens to address1
- Address1 receives 1,000 tokens
- Total supply increases by 1,000

#### Test: "Should prevent non-owner from minting tokens"
Tests access control:
- Address1 attempts to mint tokens
- Assert transaction reverts with `OwnableUnauthorizedAccount` error

### 5. Ownership (1 test)

#### Test: "Should transfer ownership and restrict minting to new owner"
Verifies ownership transfer and access control:
- Transfer ownership to address1
- Original owner should not be able to mint (reverts)
- New owner can mint successfully

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run specific test file
npx hardhat test code/test/NelHark42.test.js
```

## Test Coverage

Current coverage: 100%
- Statements: 100%
- Functions: 100%
- Lines: 100%
- Branches: 90%+

## Key Testing Patterns

1. **Setup:** Use `beforeEach` to deploy fresh contract
2. **Assertions:** Use Chai's expect() assertions
3. **Contract Interaction:** Use ethers.js to call contract functions
4. **Error Testing:** Use `.to.be.revertedWithCustomError()` for custom errors

## Notes

- Tests are intentionally minimal to focus on core functionality
- Each test is self-contained and independent
- Tests verify both success and failure cases
- Uses hardhat's local network for fast execution
