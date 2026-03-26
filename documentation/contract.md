# NelHark42 Token Contract

## Overview

NelHark42 is a simple ERC20 token contract built with Solidity 0.8.20 using OpenZeppelin contracts. It implements the standard token functionality with additional burn and mint capabilities.

## Key Features

### 1. **ERC20 Standard**
- Transfer tokens between accounts
- Approve and transfer on behalf of users
- Check balances and allowances
- Standard 18 decimals for precision

### 2. **Burnable**
- Token holders can burn (destroy) their tokens
- Burning reduces the total supply permanently
- Useful for deflationary mechanisms

### 3. **Ownership**
- Contract owner can mint new tokens
- Ownership can be transferred to another account
- Owner can renounce ownership permanently (makes minting impossible)

## Constructor

```solidity
constructor() ERC20("NelHark42", "NH42") Ownable(msg.sender)
```

- **Name:** NelHark42
- **Symbol:** NH42
- **Decimals:** 18
- **Initial Supply:** 1,000,000 tokens (minted to deployer)

## Core Functions

### `transfer(address to, uint256 amount)`
Transfers tokens from sender to recipient.

### `approve(address spender, uint256 amount)`
Allows spender to transfer tokens on behalf of owner.

### `transferFrom(address from, address to, uint256 amount)`
Transfers tokens from one account to another (requires prior approval).

### `burn(uint256 amount)`
Burns tokens from caller's balance, reducing total supply.

### `mint(address to, uint256 amount)` ⚠️ Owner Only
Creates new tokens and sends them to specified address. Can only be called by the contract owner.

### `balanceOf(address account)`
Returns the token balance of an account.

### `totalSupply()`
Returns the total number of tokens in circulation.

## Security Features

- Uses OpenZeppelin's audited ERC20 implementation
- Input validation in mint function (no zero address, no zero amount)
- Access control via Ownable for sensitive functions

## Use Cases

- Testing ERC20 functionality on test networks
- Educational purposes for learning Solidity
- Starting point for custom token implementations
- 42 School Tokenizer project

## Contract Statistics

- **Lines of Code:** ~40 (minimal and readable)
- **Gas Optimization:** Uses OpenZeppelin's optimized implementation
- **Mainnet Ready:** Yes (but test first on testnet)
