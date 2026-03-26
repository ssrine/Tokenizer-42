const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

/**
 * Deployment script for NelHark42 token
 * 
 * This script deploys the NelHark42 ERC20 token contract to the configured network.
 * It performs the following steps:
 * 1. Retrieves the deployer's account
 * 2. Deploys the NelHark42 contract
 * 3. Displays deployment information
 * 4. Saves deployment details to a file for reference
 * 
 * Usage: npx hardhat run deployment/deploy.js --network <network_name>
 * 
 * Networks available:
 * - hardhat (local, default)
 * - localhost (local node)
 * - sepolia (testnet)
 * - bsc-testnet (BSC testnet)
 */

async function main() {
    console.log("════════════════════════════════════════════════════════════════");
    console.log("                   NelHark42 Token Deployment                     ");
    console.log("════════════════════════════════════════════════════════════════");
    console.log();

    try {
        // Get the deployer account
        const [deployer] = await hre.ethers.getSigners();
        console.log("📝 Deploying contracts with account:", deployer.address);
        
        // Get account balance
        const balance = await hre.ethers.provider.getBalance(deployer.address);
        console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH");
        console.log();

        // Deploy the NelHark42 token
        console.log("🚀 Deploying NelHark42 token...");
        const NelHark42 = await hre.ethers.getContractFactory("NelHark42");
        const nelhark42 = await NelHark42.deploy();
        
        // Wait for deployment to complete
        const deploymentTransactionReceipt = await nelhark42.deploymentTransaction().wait(1);
        await nelhark42.waitForDeployment();
        
        console.log("✅ NelHark42 token deployed successfully!");
        console.log();

        // Get deployed contract information
        const tokenAddress = await nelhark42.getAddress();
        const tokenName = await nelhark42.name();
        const tokenSymbol = await nelhark42.symbol();
        const tokenDecimals = await nelhark42.decimals();
        const totalSupply = await nelhark42.totalSupply();
        const owner = await nelhark42.owner();

        // Display contract information
        console.log("📋 Contract Information:");
        console.log("  ├─ Name:", tokenName);
        console.log("  ├─ Symbol:", tokenSymbol);
        console.log("  ├─ Decimals:", tokenDecimals);
        console.log("  ├─ Total Supply:", hre.ethers.formatUnits(totalSupply, tokenDecimals), tokenSymbol);
        console.log("  ├─ Contract Address:", tokenAddress);
        console.log("  └─ Owner Address:", owner);
        console.log();

        // Display deployment transaction information
        console.log("🔗 Deployment Transaction:");
        console.log("  ├─ Transaction Hash:", deploymentTransactionReceipt.hash);
        console.log("  ├─ Block Number:", deploymentTransactionReceipt.blockNumber);
        console.log("  ├─ Gas Used:", deploymentTransactionReceipt.gasUsed.toString());
        console.log("  └─ Network:", hre.network.name);
        console.log();

        // Save deployment information to file
        const deploymentInfo = {
            timestamp: new Date().toISOString(),
            network: hre.network.name,
            deployer: deployer.address,
            contractAddress: tokenAddress,
            contractName: tokenName,
            contractSymbol: tokenSymbol,
            decimals: tokenDecimals,
            totalSupply: totalSupply.toString(),
            owner: owner,
            transactionHash: deploymentTransactionReceipt.hash,
            blockNumber: deploymentTransactionReceipt.blockNumber,
            deploymentVersion: "1.0.0"
        };

        // Create deployments directory if it doesn't exist
        const deploymentsDir = path.join(__dirname, "deployments");
        if (!fs.existsSync(deploymentsDir)) {
            fs.mkdirSync(deploymentsDir, { recursive: true });
        }

        // Save to JSON file
        const filename = path.join(deploymentsDir, `${hre.network.name}_deployment.json`);
        fs.writeFileSync(filename, JSON.stringify(deploymentInfo, null, 2));
        console.log("💾 Deployment information saved to:", filename);
        console.log();

        console.log("════════════════════════════════════════════════════════════════");
        console.log("              ✨ Deployment Complete! ✨                        ");
        console.log("════════════════════════════════════════════════════════════════");
        console.log();
        console.log("Next steps:");
        console.log("  1. Verify the contract address:", tokenAddress);
        console.log("  2. Interact with the contract using:");
        console.log("     - npx hardhat console --network", hre.network.name);
        console.log("  3. Run tests with: npm test");
        console.log();

        process.exit(0);
    } catch (error) {
        console.error("❌ Deployment failed!");
        console.error("Error:", error.message);
        console.error();
        
        if (error.code === "INSUFFICIENT_FUNDS") {
            console.error("💡 Hint: You don't have enough funds to deploy.");
            console.error("   For local testing, use 'hardhat' or 'localhost' network.");
        }
        
        process.exit(1);
    }
}

// Execute the deployment function
main();
