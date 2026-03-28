const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const Token = await hre.ethers.getContractFactory("NelHark42");
  const token = await Token.deploy();
  await token.waitForDeployment();

  const contractAddress = await token.getAddress();
  const ownerAddress = deployer.address;
  const totalSupply = hre.ethers.formatEther(await token.totalSupply());
  const chainId = 11155111; // Sepolia
  const blockExplorerUrl = `https://sepolia.etherscan.io/address/${contractAddress}`;

  // Save deployment info to file
  const deploymentInfo = {
    contractAddress,
    ownerAddress,
    totalSupply: totalSupply + " NH42",
    chainId,
    blockExplorerUrl,
    deployedAt: new Date().toISOString(),
    network: "sepolia"
  };

  const infoPath = path.join(__dirname, "deployment-info.json");
  fs.writeFileSync(infoPath, JSON.stringify(deploymentInfo, null, 2));

  console.log("\n================== Deployment Successful ==================\n");
  console.log("Contract Address:", contractAddress);
  console.log("Owner Address:   ", ownerAddress);
  console.log("Total Supply:    ", totalSupply, "NH42");
  console.log("Network:         ", "Sepolia Testnet");
  console.log("Chain ID:        ", chainId);
  console.log("Deployment info saved to: deployment-info.json");
  console.log("View on Block Explorer: " + blockExplorerUrl);
  console.log("\n========================================================\n");
}

main().catch(console.error);