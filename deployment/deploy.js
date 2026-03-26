const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const Token = await hre.ethers.getContractFactory("NelHark42");
  const token = await Token.deploy();
  await token.waitForDeployment();

  console.log("Contract:", await token.getAddress());
  console.log("Owner:", deployer.address);
  console.log(
    "Supply:",
    hre.ethers.formatEther(await token.totalSupply()),
    "NH42"
  );
}

main().catch(console.error);