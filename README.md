# NelHark42 Token

An ERC20 token with minting, burning, and ownership control. Includes smart contract, tests, and deployment scripts.

## Quick Start

```bash
npm install      # Install dependencies
npm test         # Run tests
npm run deploy   # Deploy contract
npm run interact # Interactive demo
```

## Project Structure

```
code/           → Smart contract + tests
deployment/     → Hardhat setup + scripts
docs/           → Documentation (4 files)
```

## Technology Stack

| Tech | Version | Purpose |
|------|---------|---------|
| Solidity | 0.8.20 | Smart contract language |
| Hardhat | 2.17.0 | Blockchain development |
| OpenZeppelin | 5.0.0 | ERC20 standard library |
| ethers.js | v6 | Blockchain interaction |
| Chai | Latest | Test assertions |

## Token Details

- **Name:** NelHark42
- **Symbol:** NEL
- **Decimals:** 18
- **Supply:** 1,000,000 initial
- **Type:** ERC20 standard
- **Features:** Burnable, Mintable, Ownable

## Commands

```bash
npm test              # Compile and run all tests
npm run compile       # Compile contracts only
npm run deploy        # Deploy to local network
npm run interact      # Run demo script
npm run clean         # Remove compiled files
```

## Test Suite (6 Tests)

- Deployment: correct name, symbol, initial supply
- Transfers: between accounts, revert on insufficient funds
- Burning: reduces supply, prevents over-burn
- Minting: owner can mint, non-owner blocked
- Ownership: transfer ownership works

Run: `npm test` → ✓ 6 passing (2.5s)

## Contract Functions

| Function | Purpose |
|----------|---------|
| constructor() | Initialize token (1M supply) |
| mint(address, amount) | Create tokens (owner only) |
| burn(amount) | Destroy tokens (anyone) |
| transfer(address, amount) | Send tokens |
| balanceOf(address) | Check balance |
| totalSupply() | Total tokens |
| owner() / transferOwnership() | Ownership control |

## Deployment

**Local (Hardhat - no funds required):**
```bash
npm run deploy
```

**Testnet (with test funds):**
```bash
npm run deploy -- --network sepolia
npm run deploy -- --network bsc-testnet
```

## Documentation

- [Contract Details](docs/contract.md)
- [Test Breakdown](docs/tests.md)
- [Deployment Guide](docs/deployment.md)
- [Demo Walkthrough](docs/interact.md)

## ⚠️ Testnet Note

Sepolia and BSC testnet faucets require mainnet balance. Use **hardhat** network for free local development.

## License

MIT