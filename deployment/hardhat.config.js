require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

// Hardhat configuration for NelHark42 ERC20 token
module.exports = {
    // Solidity compiler settings
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: { enabled: true, runs: 200 }, // Optimize for deployment size
        },
    },

    networks: {
        // Local testing (fastest, no funds needed)
        hardhat: {
            chainId: 31337,
            initialBaseFeePerGas: 0,
            allowUnlimitedContractSize: false,
        },

        // Local node: run 'npx hardhat node' separately
        localhost: {
            url: "http://127.0.0.1:8545",
            timeout: 60000,
        },

        // Ethereum Sepolia testnet (requires testnet ETH)
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL || "",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 11155111,
        },

        // BSC testnet (requires testnet BNB)
        bscTestnet: {
            url: process.env.BSC_TESTNET_RPC_URL || "https://data-seed-prebsc-1-b.binance.org:8545",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 97,
        },

        // Ethereum mainnet (production)
        mainnet: {
            url: process.env.MAINNET_RPC_URL || "",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 1,
        },

        // BSC mainnet (production)
        bscMainnet: {
            url: process.env.BSC_MAINNET_RPC_URL || "",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 56,
        },
    },

    // Gas cost reporting (set REPORT_GAS=true in .env to enable)
    gasReporter: {
        enabled: process.env.REPORT_GAS === "true",
        currency: "USD",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        outputFile: "gas-report.txt",
        noColors: true,
    },

    // Code coverage analysis
    coverage: {
        provider: "hardhat",
        reports: ["text", "text-summary", "html"],
        exclude: ["node_modules/", "test/"],
    },

    // File paths (contracts copied from ../code/ by copy-contracts.js)
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
        deployments: "./deployments",
    },

    // Test runner settings
    mocha: {
        timeout: 40000,
    },
};
