async function main() {
  const [owner] = await ethers.getSigners();

  console.log("\n================== NelHark42 Token Demo ==================\n");

  // Step 1: Deploy
  console.log("Step 1: Deploy Contract");
  console.log("------------------------");
  const Token = await ethers.getContractFactory("NelHark42");
  const token = await Token.deploy();
  await token.waitForDeployment();
  const contractAddress = await token.getAddress();
  console.log("  Contract deployed at:", contractAddress);
  console.log("  Owner address:       ", owner.address);

  // Token Info
  console.log("\nStep 2: Token Information");
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
  console.log("\nStep 3: Initial Balance");
  console.log("------------------------");
  let balance = await token.balanceOf(owner.address);
  console.log("  Owner balance: ", ethers.formatEther(balance), symbol);

  // Transfer
  console.log("\nStep 4: Transfer Tokens");
  console.log("------------------------");
  const transferAmount = ethers.parseEther("100");
  const recipient = "0x0000000000000000000000000000000000000001";
  console.log("  From:          ", owner.address);
  console.log("  To:            ", recipient);
  console.log("  Amount:        ", ethers.formatEther(transferAmount), symbol);
  
  await token.transfer(recipient, transferAmount);
  
  const ownerBalanceAfterTransfer = await token.balanceOf(owner.address);
  const recipientBalance = await token.balanceOf(recipient);
  console.log("  Owner balance after:    ", ethers.formatEther(ownerBalanceAfterTransfer), symbol);
  console.log("  Recipient balance:      ", ethers.formatEther(recipientBalance), symbol);

  // Burn
  console.log("\nStep 5: Burn Tokens");
  console.log("------------------------");
  const burnAmount = ethers.parseEther("50");
  console.log("  Burn amount:   ", ethers.formatEther(burnAmount), symbol);
  console.log("  Before burn:");
  const supplyBefore = await token.totalSupply();
  const balanceBefore = await token.balanceOf(owner.address);
  console.log("    Total supply: ", ethers.formatEther(supplyBefore), symbol);
  console.log("    Owner balance:", ethers.formatEther(balanceBefore), symbol);
  
  await token.burn(burnAmount);
  
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
  console.log("  Total Supply:      ", ethers.formatEther(finalSupply), symbol);
  console.log("  Owner Balance:     ", ethers.formatEther(finalBalance), symbol);
  console.log("  Recipient Balance: ", ethers.formatEther(recipientFinalBalance), symbol);
  console.log("\n================================================\n");
}

main().catch(console.error);