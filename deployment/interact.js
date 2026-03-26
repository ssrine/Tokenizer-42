async function main() {
  const [owner] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("NelHark42");
  const token = await Token.deploy();
  await token.waitForDeployment();

  console.log("Step 1: Deploy ✓");

  // balance
  let balance = await token.balanceOf(owner.address);
  console.log("Step 2: Balance:", ethers.formatEther(balance));

  // transfer
  await token.transfer("0x0000000000000000000000000000000000000001", ethers.parseEther("100"));
  console.log("Step 3: Transfer 100 ✓");

  // burn
  await token.burn(ethers.parseEther("50"));
  console.log("Step 4: Burn 50 ✓");

  balance = await token.balanceOf(owner.address);
  console.log("Final Balance:", ethers.formatEther(balance));
}

main().catch(console.error);