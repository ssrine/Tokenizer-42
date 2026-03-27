const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NelHark42", function () {
  let token, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("NelHark42");
    token = await Token.deploy();
    await token.waitForDeployment();
  });

  // 1️⃣ Deployment
  it("should deploy with correct name and supply", async () => {
    expect(await token.name()).to.equal("NelHark42");

    const supply = ethers.parseEther("1000");
    expect(await token.totalSupply()).to.equal(supply);
  });

  // 2️⃣ Transfer
  it("should transfer tokens", async () => {
    await token.transfer(addr1.address, ethers.parseEther("100"));

    expect(await token.balanceOf(addr1.address))
      .to.equal(ethers.parseEther("100"));
  });

  // 3️⃣ Burn
  it("should burn tokens", async () => {
    await token.burn(ethers.parseEther("50"));

    const supply = await token.totalSupply();
    expect(supply).to.equal(ethers.parseEther("950"));
  });

  // 4️⃣ Owner mint
  it("owner can mint", async () => {
    await token.mint(addr1.address, ethers.parseEther("100"));

    expect(await token.balanceOf(addr1.address))
      .to.equal(ethers.parseEther("100"));
  });

  // 5️⃣ Non-owner mint (fail)
  it("non-owner cannot mint", async () => {
    await expect(
      token.connect(addr1).mint(addr1.address, 100)
    ).to.be.reverted;
  });

  // 6️⃣ Transfer fail
  it("should fail if no balance", async () => {
    await expect(
      token.connect(addr1).transfer(owner.address, 100)
    ).to.be.reverted;
  });
});