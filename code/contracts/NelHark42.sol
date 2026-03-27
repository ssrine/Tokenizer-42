// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NelHark42
 * @dev Simple ERC20 Token:
 * - Transfer tokens
 * - Burn tokens
 * - Owner can mint new tokens
 */
contract NelHark42 is ERC20, ERC20Burnable, Ownable {

    constructor() ERC20("NelHark42", "NH42") Ownable(msg.sender) {
        // Mint initial supply to owner
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    /**
     * @dev Mint new tokens (only owner)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Amount must be > 0");

        _mint(to, amount);
    }
}