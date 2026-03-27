# NelHark42 Smart Contract

## Overview

ERC20 token implementation with minting, burning, and ownership control. Built on Solidity 0.8.20 using OpenZeppelin libraries.

## Contract Specifications

| Property | Value |
|----------|-------|
| Name | NelHark42 |
| Symbol | NH42 |
| Decimals | 18 |
| Initial Supply | 1,000 tokens |
| Standard | ERC20 |

## Core Functionality

### Token Features
- **Transfer:** Standard ERC20 token transfers between accounts
- **Burn:** Holders can destroy tokens, reducing total supply permanently
- **Mint:** Owner can create new tokens (owner-only operation)
- **Ownership:** Transfer ownership rights to another address

### Contract Functions

**Constructor**
```solidity
constructor() ERC20("NelHark42", "NH42") Ownable(msg.sender)
```
- Initializes token with name and symbol
- Mints 1,000 tokens to deployer
- Sets deployer as initial owner

**Public Functions**
```solidity
function mint(address to, uint256 amount) external onlyOwner
```
- Creates new tokens
- Restricted to contract owner
- Validates non-zero address and amount

**Inherited ERC20 Functions**
- `transfer(address, uint256)` - Send tokens
- `approve(address, uint256)` - Grant token allowance
- `transferFrom(address, address, uint256)` - Transfer on behalf
- `burn(uint256)` - Destroy tokens from balance
- `balanceOf(address)` - Get account balance
- `totalSupply()` - Get total token supply

## Security Implementation

- OpenZeppelin audited libraries
- Input validation (non-zero checks)
- Access control via Ownable for privileged functions
- Solidity 0.8.20+ safeguards (overflow protection)

## Code Statistics

- Language: Solidity 0.8.20
- Lines: ~40 (minimal, clean)
- Gas Optimized: Yes
- Audited Library: Yes (OpenZeppelin)
- Production Ready: Yes

