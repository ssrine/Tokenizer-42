require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

/**
 * Hardhat Configuration File
 * 
 * This configuration file sets up the Hardhat development environment for the NelHark42 token.
 * It includes:
 * - Solidity compiler settings (version ^0.8.19)
 * - Network configurations (hardhat, localhost, testnets)
 * - Gas reporting settings
 * - Code coverage settings
 * 
 * The configuration supports:
 * 1. Local testing with Hardhat's built-in network
 * 2. Local node for manual testing
 * 3. Testnet deployments (Sepolia, BSC Testnet)
 * 4. Production networks
 * 
 * Note: This configuration does NOT require real private keys for local development.
 * Private keys are only needed for testnet/mainnet deployments.
 */

module.exports = {
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },

    networks: {
        // Hardhat built-in local network (fastest for testing)
        hardhat: {
            chainId: 31337,
            initialBaseFeePerGas: 0,
            allowUnlimitedContractSize: false,
        },

        // Local Hardhat node (must be run separately with: npx hardhat node)
        localhost: {
            url: "http://127.0.0.1:8545",
            timeout: 60000,
        },

        // Sepolia Testnet (Ethereum)
        // Note: Requires testnet ETH from faucet
        sepolia: {
            url: process.env.SEPOLIA_RPC_URL || "",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 11155111,
        },

        // BSC Testnet (Binance Smart Chain)
        // Note: Requires testnet BNB from faucet
        bscTestnet: {
            url: process.env.BSC_TESTNET_RPC_URL || "https://data-seed-prebsc-1-b.binance.org:8545",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 97,
        },

        // Ethereum Mainnet (for production)
        // ⚠️ NEVER use this for testing - requires real ETH
        mainnet: {
            url: process.env.MAINNET_RPC_URL || "",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 1,
        },

        // BSC Mainnet (for production)
        // ⚠️ NEVER use this for testing - requires real BNB
        bscMainnet: {
            url: process.env.BSC_MAINNET_RPC_URL || "",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 56,
        },
    },

    // Configuration for gas reporting (optional)
    gasReporter: {
        enabled: process.env.REPORT_GAS === "true",
        currency: "USD",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        outputFile: "gas-report.txt",
        noColors: true,
    },

    // Configuration for code coverage (solidity-coverage)
    coverage: {
        provider: "hardhat",
        reports: ["text", "text-summary", "html"],
        exclude: ["node_modules/", "test/"],
    },

    // Paths for contract locations
    paths: {
        sources: "../code/contracts",
        tests: "../code/test",
        cache: "./cache",
        artifacts: "./artifacts",
    },

    // Mocha testing framework settings
    mocha: {
        timeout: 40000,
    },
};
