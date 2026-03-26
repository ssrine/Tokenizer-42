// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NelHark42 Token Contract
 * @dev A professional ERC20 token implementation for the 42 Tokenizer project.
 * 
 * Features:
 * - Standard ERC20 functionality (transfer, approve, allowance)
 * - Burning capability for token holders
 * - Owner-restricted minting for supply control
 * - Clean architecture following OpenZeppelin best practices
 * 
 * The token is designed to be deployed on any EVM-compatible network
 * and can be used as a prototype for educational or production purposes.
 */
contract NelHark42 is ERC20, ERC20Burnable, Ownable {
    
    /**
     * @dev Initializes the NelHark42 token with:
     * - Name: "NelHark42"
     * - Symbol: "NH42"
     * - Initial supply: 1,000,000 tokens (with 18 decimals)
     * - Owner: the deployer's address
     * 
     * The initial supply is minted to the contract owner at deployment.
     */
    constructor() ERC20("NelHark42", "NH42") {
        // Mint 1,000,000 tokens to the owner
        // ERC20 tokens use 18 decimals by default
        uint256 initialSupply = 1_000_000 * 10 ** decimals();
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Mints new tokens and assigns them to the specified address.
     * 
     * @param to The address that will receive the minted tokens
     * @param amount The amount of tokens to mint (in smallest unit, wei/wei-equivalent)
     * 
     * Requirements:
     * - Only the contract owner can call this function
     * 
     * This function allows the owner to increase the total supply.
     * It is restricted to prevent unauthorized token creation.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "NelHark42: cannot mint to zero address");
        require(amount > 0, "NelHark42: mint amount must be greater than 0");
        
        _mint(to, amount);
    }

    /**
     * @dev Returns the number of decimals used by this token.
     * This is a standard ERC20 extension.
     * 
     * @return The number of decimals (18 for this token)
     */
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    /**
     * @dev Allows the owner to renounce ownership.
     * This makes the contract truly decentralized.
     * 
     * ⚠️ WARNING: After calling this function, no one will be able to mint new tokens.
     * This action is irreversible.
     */
    function renounceOwnership() public virtual override onlyOwner {
        super.renounceOwnership();
    }

    /**
     * @dev Allows the current owner to transfer ownership to a new account.
     * This enables succession of owner rights.
     * 
     * @param newOwner The address of the new owner
     * 
     * ⚠️ WARNING: Ensure the new owner address is correct, as ownership transfer is immediate.
     */
    function transferOwnership(address newOwner) public virtual override onlyOwner {
        super.transferOwnership(newOwner);
    }
}
