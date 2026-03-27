# Deployment Guide

## Quick Deploy

```bash
npm run deploy          # Deploy to local network 
npm run deploy:sepolia  # Deploy to Ethereum Sepolia testnet
npm run deploy:bsc      # Deploy to BSC testnet
```

## Local Deployment 

```bash
npm run deploy
```

**Output:**
```
Contract: 0x5FbDB2315678afccb333f8432dbb54f9f...
Owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Supply: 1000 NH42
```

- No funds required
- Instant execution
- Perfect for testing
- Local hardhat network

## Testnet Deployment

### Prerequisites
1. Create `.env` file in deployment folder
2. Add: `PRIVATE_KEY=0xYourMetaMaskPrivateKey`
3. Get testnet coins from faucet (~0.1 coins)

### Deploy to Testnet

```bash
npm run deploy:sepolia    # Ethereum Sepolia
npm run deploy:bsc        # Binance Smart Chain
```

### Testnet Faucets

- Ethereum Sepolia: https://sepoliafaucet.com
- BSC Testnet: https://testnet.binance.org/faucet-smart

## Deployment Process

1. **Copy** - Copies contracts from code/ to deployment/
2. **Compile** - Compiles Solidity to bytecode
3. **Deploy** - Sends contract to blockchain
4. **Confirm** - Waits for transaction confirmation

## Verify on Block Explorer

After testnet deployment:

1. Get contract address from deploy output
2. Visit block explorer:
   - Sepolia: https://sepolia.etherscan.io
   - BSC: https://testnet.bscscan.com
3. Search for contract address
4. View contract code and transactions

## Networks Supported

| Network | Status | Command |
|---------|--------|---------|
| Hardhat (Local) | Recommended | `npm run deploy` |
| Localhost | Dev | `npx hardhat run deploy.js --network localhost` |
| Sepolia | Testnet | `npm run deploy:sepolia` |
| BSC Testnet | Testnet | `npm run deploy:bsc` |
| Mainnet | Production | `npm run deploy -- --network mainnet` |

## Troubleshooting

**"Insufficient funds for gas"**
- Use local deployment: `npm run deploy`
- Or get testnet coins from faucet

**"Private key not found"**
- Create `.env` file with: `PRIVATE_KEY=0x...`

**"Network connection error"**
- Check RPC URL in hardhat.config.js
- Verify internet connection
