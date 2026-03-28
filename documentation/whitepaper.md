# NelHark42 Token - Whitepaper

## Introduction
NelHark42 is a simple ERC20 token built for educational purposes as part of the 42 Tokenizer project.

## Purpose
The goal of this token is to demonstrate how blockchain tokens work, including:
- Transfers between users
- Token burning (reducing supply)
- Controlled minting by the owner

## Token Utility
This token can be used as:
- A demonstration asset for blockchain learning
- A test token for smart contract interaction

## Supply Model
- Initial supply: 1000 tokens
- Minting: Only the owner can mint new tokens
- Burning: Any holder can burn tokens

## Security
- Based on OpenZeppelin audited contracts
- Ownership restrictions for sensitive operations

## Glossary of Terms

Understanding key blockchain and smart contract concepts is essential for working with NelHark42. Here's a reference guide tailored to this project:

| Concept | Meaning | NelHark42 Implementation | Notes |
|---------|---------|--------------------------|-------|
| **Blockchain** | Distributed ledger that records all transactions immutably | Ethereum Sepolia testnet | All NelHark42 transactions are public and cannot be modified |
| **Ethereum** | Blockchain platform that supports smart contracts and tokens | Deployed on Sepolia testnet (free, for testing) | Real ETH on mainnet; fake ETH on testnet |
| **Smart Contract** | Program deployed on blockchain that executes automatically | `NelHark42.sol` | Controls all token logic, immutable after deployment |
| **Solidity** | Programming language for Ethereum smart contracts | `/code/contracts/NelHark42.sol` | Defines ERC20 standard functions and features |
| **ERC20 Token** | Token standard with defined rules for transfers, burning, minting | NelHark42 token (NH42) | Ensures compatibility with wallets and exchanges |
| **Transfer** | Send tokens from one address to another | Called in `interact.js` (Step 3) | Any holder can transfer their tokens |
| **Burn** | Remove tokens from supply permanently | Called in `interact.js` (Step 4) | Any holder can burn their own tokens; reduces totalSupply |
| **Mint** | Create new tokens and add to supply | Contract function (owner-only) | Only owner can increase totalSupply |
| **Owner & Access Control** | Restrict sensitive actions to authorized accounts | Using `Ownable` from OpenZeppelin | Protects mint function from unauthorized use |
| **Testnet vs Mainnet** | Testnet: free, fake ETH for testing; Mainnet: real ETH | Sepolia (testnet) | Always test on testnet before deploying to mainnet |
| **Web3 / Ethers.js** | Library to interact with blockchain from JavaScript | `interact.js` and `deploy.js` | Sends transactions, reads balances, creates contract instances |
| **Private Keys / .env** | Secure credentials for wallet authentication | Stored in `.env` file | Never commit private keys to GitHub |
| **Hardhat** | Development framework for Solidity projects | `hardhat.config.js` | Handles compilation, deployment, and gas reporting |
| **Deployment Scripts** | Automate contract deployment and interaction | `deploy.js`, `interact.js` | Reads contract address from `deployment-info.json` |
| **npm Scripts** | Commands to execute project tasks | `npm run deploy`, `npm run interact` | Simplifies running blockchain operations |
| **Total Supply** | Total number of tokens in existence | Initially 1000 NH42 | Changes when tokens are minted or burned |
| **Decimals** | Number of decimal places for token amounts | 18 (standard) | 1000 tokens = 1000000000000000000 wei |
| **Deployment-info.json** | Stores contract address and metadata after deployment | `/deployment/deployment-info.json` | Used by interaction scripts to know which contract to use |
| **Immutable Contract** | Contract code cannot be changed after deployment | NelHark42.sol is permanent | Any bugs must be fixed by deploying a new contract |

## Conclusion
NelHark42 is a minimal, secure, and functional ERC20 token designed to showcase core blockchain concepts.
