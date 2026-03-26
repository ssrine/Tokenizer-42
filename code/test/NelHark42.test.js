const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NelHark42 Token Contract", function () {
    let token;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    // Deploy the contract before each test
    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        const NelHark42 = await ethers.getContractFactory("NelHark42");
        token = await NelHark42.deploy();
        await token.waitForDeployment();
    });

    // ============================================================================
    // DEPLOYMENT TESTS
    // ============================================================================

    describe("Deployment", function () {
        it("Should have the correct name", async function () {
            expect(await token.name()).to.equal("NelHark42");
        });

        it("Should have the correct symbol", async function () {
            expect(await token.symbol()).to.equal("NH42");
        });

        it("Should have 18 decimals", async function () {
            expect(await token.decimals()).to.equal(18);
        });

        it("Should mint initial supply to the owner", async function () {
            const initialSupply = ethers.parseEther("1000000");
            expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
        });

        it("Should set the owner correctly", async function () {
            expect(await token.owner()).to.equal(owner.address);
        });

        it("Should have correct total supply after deployment", async function () {
            const initialSupply = ethers.parseEther("1000000");
            expect(await token.totalSupply()).to.equal(initialSupply);
        });
    });

    // ============================================================================
    // BASIC ERC20 FUNCTIONALITY TESTS
    // ============================================================================

    describe("ERC20 Transfers", function () {
        it("Should transfer tokens between accounts", async function () {
            const amount = ethers.parseEther("100");
            
            // Transfer from owner to addr1
            await token.transfer(addr1.address, amount);
            
            expect(await token.balanceOf(addr1.address)).to.equal(amount);
            expect(await token.balanceOf(owner.address)).to.equal(
                ethers.parseEther("1000000").sub(amount)
            );
        });

        it("Should fail if sender has insufficient balance", async function () {
            const amount = ethers.parseEther("1000000000"); // More than exists
            
            await expect(
                token.connect(addr1).transfer(addr2.address, amount)
            ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
        });

        it("Should transfer tokens from another account with approval", async function () {
            const amount = ethers.parseEther("500");
            
            // Owner approves addr1 to spend 500 tokens
            await token.approve(addr1.address, amount);
            
            // addr1 transfers tokens from owner to addr2
            await token.connect(addr1).transferFrom(owner.address, addr2.address, amount);
            
            expect(await token.balanceOf(addr2.address)).to.equal(amount);
            expect(await token.balanceOf(owner.address)).to.equal(
                ethers.parseEther("1000000").sub(amount)
            );
        });

        it("Should fail transferFrom without approval", async function () {
            const amount = ethers.parseEther("100");
            
            await expect(
                token.connect(addr1).transferFrom(owner.address, addr2.address, amount)
            ).to.be.revertedWithCustomError(token, "ERC20InsufficientAllowance");
        });
    });

    // ============================================================================
    // APPROVAL AND ALLOWANCE TESTS
    // ============================================================================

    describe("Approvals and Allowance", function () {
        it("Should approve tokens for spending", async function () {
            const amount = ethers.parseEther("1000");
            
            await token.approve(addr1.address, amount);
            
            expect(await token.allowance(owner.address, addr1.address)).to.equal(amount);
        });

        it("Should increase allowance", async function () {
            const initialAmount = ethers.parseEther("1000");
            const increaseAmount = ethers.parseEther("500");
            
            await token.approve(addr1.address, initialAmount);
            await token.increaseAllowance(addr1.address, increaseAmount);
            
            expect(await token.allowance(owner.address, addr1.address)).to.equal(
                initialAmount.add(increaseAmount)
            );
        });

        it("Should decrease allowance", async function () {
            const amount = ethers.parseEther("1000");
            const decreaseAmount = ethers.parseEther("300");
            
            await token.approve(addr1.address, amount);
            await token.decreaseAllowance(addr1.address, decreaseAmount);
            
            expect(await token.allowance(owner.address, addr1.address)).to.equal(
                amount.sub(decreaseAmount)
            );
        });

        it("Should fail to decrease allowance below zero", async function () {
            const amount = ethers.parseEther("100");
            const decreaseAmount = ethers.parseEther("500");
            
            await token.approve(addr1.address, amount);
            
            await expect(
                token.decreaseAllowance(addr1.address, decreaseAmount)
            ).to.be.revertedWithCustomError(token, "ERC20FailedDecreaseAllowance");
        });
    });

    // ============================================================================
    // MINTING TESTS
    // ============================================================================

    describe("Minting", function () {
        it("Should allow owner to mint tokens", async function () {
            const mintAmount = ethers.parseEther("1000");
            const initialSupply = await token.totalSupply();
            
            await token.mint(addr1.address, mintAmount);
            
            expect(await token.totalSupply()).to.equal(initialSupply.add(mintAmount));
            expect(await token.balanceOf(addr1.address)).to.equal(mintAmount);
        });

        it("Should prevent non-owner from minting", async function () {
            const mintAmount = ethers.parseEther("1000");
            
            await expect(
                token.connect(addr1).mint(addr2.address, mintAmount)
            ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
        });

        it("Should fail to mint to zero address", async function () {
            const mintAmount = ethers.parseEther("1000");
            
            await expect(
                token.mint(ethers.ZeroAddress, mintAmount)
            ).to.be.revertedWith("NelHark42: cannot mint to zero address");
        });

        it("Should fail to mint zero amount", async function () {
            await expect(
                token.mint(addr1.address, 0)
            ).to.be.revertedWith("NelHark42: mint amount must be greater than 0");
        });

        it("Should mint multiple times to same address", async function () {
            const mint1 = ethers.parseEther("500");
            const mint2 = ethers.parseEther("300");
            
            await token.mint(addr1.address, mint1);
            await token.mint(addr1.address, mint2);
            
            expect(await token.balanceOf(addr1.address)).to.equal(mint1.add(mint2));
        });

        it("Should increase total supply correctly after multiple mints", async function () {
            const initialSupply = await token.totalSupply();
            const mint1 = ethers.parseEther("1000");
            const mint2 = ethers.parseEther("2000");
            
            await token.mint(addr1.address, mint1);
            await token.mint(addr2.address, mint2);
            
            expect(await token.totalSupply()).to.equal(
                initialSupply.add(mint1).add(mint2)
            );
        });
    });

    // ============================================================================
    // BURNING TESTS
    // ============================================================================

    describe("Burning", function () {
        it("Should allow token holder to burn tokens", async function () {
            const amount = ethers.parseEther("1000");
            const initialSupply = await token.totalSupply();
            
            await token.burn(amount);
            
            expect(await token.totalSupply()).to.equal(initialSupply.sub(amount));
            expect(await token.balanceOf(owner.address)).to.equal(
                initialSupply.sub(amount)
            );
        });

        it("Should allow burner to burn from other accounts (with approval)", async function () {
            const amount = ethers.parseEther("500");
            const initialSupply = await token.totalSupply();
            
            // Owner approves addr1 to burn tokens
            await token.approve(addr1.address, amount);
            
            // addr1 burns tokens from owner's balance
            await token.connect(addr1).burnFrom(owner.address, amount);
            
            expect(await token.totalSupply()).to.equal(initialSupply.sub(amount));
        });

        it("Should fail to burn more than balance", async function () {
            const amount = ethers.parseEther("2000000");
            
            await expect(
                token.burn(amount)
            ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
        });
    });

    // ============================================================================
    // OWNERSHIP TESTS
    // ============================================================================

    describe("Ownership", function () {
        it("Should transfer ownership to another address", async function () {
            await token.transferOwnership(addr1.address);
            
            expect(await token.owner()).to.equal(addr1.address);
        });

        it("Should prevent non-owner from transferring ownership", async function () {
            await expect(
                token.connect(addr1).transferOwnership(addr2.address)
            ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
        });

        it("Should allow new owner to mint after ownership transfer", async function () {
            await token.transferOwnership(addr1.address);
            
            const mintAmount = ethers.parseEther("1000");
            await token.connect(addr1).mint(addr2.address, mintAmount);
            
            expect(await token.balanceOf(addr2.address)).to.equal(mintAmount);
        });

        it("Should renounce ownership", async function () {
            await token.renounceOwnership();
            
            expect(await token.owner()).to.equal(ethers.ZeroAddress);
        });

        it("Should prevent minting after owner renounces", async function () {
            await token.renounceOwnership();
            
            // Try to mint using the original owner (should still revert as owner is now zero)
            await expect(
                token.mint(addr1.address, ethers.parseEther("1000"))
            ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
        });
    });

    // ============================================================================
    // EDGE CASE TESTS
    // ============================================================================

    describe("Edge Cases", function () {
        it("Should handle large token amounts", async function () {
            const largeAmount = ethers.parseEther("999999999999"); // Very large amount
            
            await token.mint(addr1.address, largeAmount);
            
            expect(await token.balanceOf(addr1.address)).to.equal(largeAmount);
        });

        it("Should handle zero transfer correctly", async function () {
            const initialBalance = await token.balanceOf(addr1.address);
            
            await token.transfer(addr1.address, 0);
            
            expect(await token.balanceOf(addr1.address)).to.equal(initialBalance);
        });

        it("Should maintain accurate balances after multiple operations", async function () {
            const amount1 = ethers.parseEther("1000");
            const amount2 = ethers.parseEther("500");
            const amount3 = ethers.parseEther("300");
            
            // Transfer to addr1
            await token.transfer(addr1.address, amount1);
            
            // Transfer from addr1 to addr2
            await token.connect(addr1).transfer(addr2.address, amount2);
            
            // Mint to addr2
            await token.mint(addr2.address, amount3);
            
            expect(await token.balanceOf(addr1.address)).to.equal(amount1.sub(amount2));
            expect(await token.balanceOf(addr2.address)).to.equal(amount2.add(amount3));
        });

        it("Should correctly track allowance after multiple operations", async function () {
            const amount = ethers.parseEther("1000");
            const spent = ethers.parseEther("300");
            
            await token.approve(addr1.address, amount);
            await token.connect(addr1).transferFrom(owner.address, addr2.address, spent);
            
            expect(await token.allowance(owner.address, addr1.address)).to.equal(
                amount.sub(spent)
            );
        });
    });

    // ============================================================================
    // DECIMAL PRECISION TESTS
    // ============================================================================

    describe("Decimal Precision", function () {
        it("Should correctly handle 18 decimal places", async function () {
            const amount = ethers.parseEther("1.5"); // 1.5 tokens with 18 decimals
            
            await token.transfer(addr1.address, amount);
            
            expect(await token.balanceOf(addr1.address)).to.equal(amount);
        });

        it("Should correctly handle small amounts", async function () {
            const amount = ethers.toBigInt("1"); // 0.000000000000000001 tokens
            
            await token.transfer(addr1.address, amount);
            
            expect(await token.balanceOf(addr1.address)).to.equal(amount);
        });
    });
});
