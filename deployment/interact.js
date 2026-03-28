const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");
require("dotenv/config");

async function main() {
  // Connect to Sepolia RPC
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const owner = wallet;

  // Read deployment info from file
  const infoPath = path.join(__dirname, "deployment-info.json");
  if (!fs.existsSync(infoPath)) {
    console.error("❌ Error: deployment-info.json not found!");
    console.error("Please run 'npm run deploy' first to deploy the contract.");
    process.exit(1);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(infoPath, "utf8"));
  const contractAddress = deploymentInfo.contractAddress;

  // Read ABI from artifacts
  const abiPath = path.join(__dirname, "artifacts/contracts/NelHark42.sol/NelHark42.json");
  if (!fs.existsSync(abiPath)) {
    console.error("❌ Error: Contract ABI not found! Please run 'npm run compile' first.");
    process.exit(1);
  }

  const artifact = JSON.parse(fs.readFileSync(abiPath, "utf8"));
  const contractABI = artifact.abi;

  // Create contract instance
  const token = new ethers.Contract(contractAddress, contractABI, wallet);

  console.log("\n================== NelHark42 Token Demo ==================\n");
  console.log("Using deployed contract at:", contractAddress);
  console.log("Block Explorer:", deploymentInfo.blockExplorerUrl);

  // Token Info
  console.log("\nStep 1: Token Information");
  console.log("------------------------");
  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const totalSupply = await token.totalSupply();
  console.log("  Token name:    ", name);
  console.log("  Symbol:        ", symbol);
  console.log("  Decimals:      ", decimals.toString());
  console.log("  Total Supply:  ", ethers.formatEther(totalSupply), symbol);

  // Initial Balance
  console.log("\nStep 2: Initial Balance");
  console.log("------------------------");
  let balance = await token.balanceOf(owner.address);
  console.log("  Owner balance: ", ethers.formatEther(balance), symbol);

  // Transfer
  console.log("\nStep 3: Transfer Tokens");
  console.log("------------------------");
  const transferAmount = ethers.parseEther("100");
  const recipient = process.env.RECIPIENT || owner.address;
  console.log("  From:          ", owner.address);
  console.log("  To:            ", recipient);
  console.log("  Amount:        ", ethers.formatEther(transferAmount), symbol);
  
  const transferTx = await token.transfer(recipient, transferAmount);
  await transferTx.wait();
  console.log("  Transaction:   ", `https://sepolia.etherscan.io/tx/${transferTx.hash}`);
  
  const ownerBalanceAfterTransfer = await token.balanceOf(owner.address);
  const recipientBalance = await token.balanceOf(recipient);
  console.log("  Owner balance after:    ", ethers.formatEther(ownerBalanceAfterTransfer), symbol);
  console.log("  Recipient balance:      ", ethers.formatEther(recipientBalance), symbol);

  // Burn
  console.log("\nStep 4: Burn Tokens");
  console.log("------------------------");
  const burnAmount = ethers.parseEther("50");
  console.log("  Burn amount:   ", ethers.formatEther(burnAmount), symbol);
  console.log("  Before burn:");
  const supplyBefore = await token.totalSupply();
  const balanceBefore = await token.balanceOf(owner.address);
  console.log("    Total supply: ", ethers.formatEther(supplyBefore), symbol);
  console.log("    Owner balance:", ethers.formatEther(balanceBefore), symbol);
  
  const burnTx = await token.burn(burnAmount);
  await burnTx.wait();
  console.log("  Transaction:   ", `https://sepolia.etherscan.io/tx/${burnTx.hash}`);
  
  console.log("  After burn:");
  const supplyAfter = await token.totalSupply();
  const balanceAfter = await token.balanceOf(owner.address);
  console.log("    Total supply: ", ethers.formatEther(supplyAfter), symbol);
  console.log("    Owner balance:", ethers.formatEther(balanceAfter), symbol);

  // Final Summary
  console.log("\n================== Final Summary ==================\n");
  const finalBalance = await token.balanceOf(owner.address);
  const finalSupply = await token.totalSupply();
  const recipientFinalBalance = await token.balanceOf(recipient);
  
  console.log("  Token Name:        ", name);
  console.log("  Token Symbol:      ", symbol);
  console.log("  Contract Address:  ", contractAddress);
  console.log("  Total Supply:      ", ethers.formatEther(finalSupply), symbol);
  console.log("  Owner Balance:     ", ethers.formatEther(finalBalance), symbol);
  console.log("  Recipient Balance: ", ethers.formatEther(recipientFinalBalance), symbol);
  console.log("\n  🔍 View Contract: ", deploymentInfo.blockExplorerUrl);
  console.log("  📊 View Transactions: https://sepolia.etherscan.io/address/" + owner.address);
  console.log("\n================================================\n");
}

main().catch(console.error);