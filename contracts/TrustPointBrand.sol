// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "./TrustPointStorage.sol";

contract TrustPointBrand is
    ERC1155,
    AccessControl,
    ERC1155Burnable,
    TrustPointStorage
{
    /// Packed variables
    uint8 public constant POINTS = 0; // fungible token ID
    address public immutable owner;
    bool public started;
    bool public ended;

    uint256 public rewardInitialId = 100; // starting ID for NFTs

    event Start();
    event End();

    /// @dev fill in the uri!!!
    constructor(bytes32 _brandName, BrandBizType _businessType) ERC1155("") {
        owner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(BRAND_ROLE, msg.sender);
        brands[msg.sender] = Brand({
            brandAddress: msg.sender,
            brandName: _brandName,
            businessType: _businessType,
            isMember: true
        });
    }

    /// Create the loyalty program and start it
    function createLoyaltyProgram(
        string memory _programName,
        string memory _reward,
        uint256 _pointsRequired
    ) public onlyRole(BRAND_ROLE) {
        loyaltyProgramsByBrand[msg.sender] = LoyaltyProgram({
            programName: _programName,
            reward: _reward,
            pointsRequired: _pointsRequired
        });

        started = true;
        emit Start();
    }

    /// Minting loyalty points (fungible tokens)
    function earnPoints(
        address to,
        uint256 points,
        bytes memory data
    ) public onlyRole(BRAND_ROLE) {
        require(started, "No program available.");
        _mint(to, POINTS, points, data);
        customers[to].totalPoints += points;
        customers[to].pointsByBrand[msg.sender] += points;
    }

    /// Redeem the reward for customer (NFT)
    function redeemReward(
        address to,
        bytes memory data
    ) public onlyRole(BRAND_ROLE) {
        uint256 pointsToRedeem = loyaltyProgramsByBrand[msg.sender]
            .pointsRequired;
        require(rewardInitialId >= 100, "Invalid ID for NFT");
        require(
            customers[to].pointsByBrand[msg.sender] >= pointsToRedeem,
            "Not enough points."
        );

        /// Decrement the points from the customer record
        customers[to].totalPoints -= pointsToRedeem;
        customers[to].pointsByBrand[msg.sender] -= pointsToRedeem;

        /// mint the reward NFT with a unique ID
        _mint(to, rewardInitialId, 1, data);
        rewardInitialId++;

        /// Burn the fungible tokens(POINTS)
        _burn(to, POINTS, pointsToRedeem);
    }

    /// End the loyalty program
    function endProgram() public onlyRole(BRAND_ROLE) {
        require(started, "Program not started");
        require(!ended, "Program already ended");
        ended = true;
        started = false;
        emit End();
    }

    /// @dev can be transformed into an airdrop function with condition
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory points,
        bytes memory data
    ) public onlyRole(BRAND_ROLE) {
        _mintBatch(to, ids, points, data);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /*///////////////////////////////////////////////////////////////
                            Internal functions
    //////////////////////////////////////////////////////////////*/

    /// Grant the permission to Brand to burn Customer tokens
    function _burn(
        address account,
        uint256 id,
        uint256 value
    ) internal override onlyRole(BRAND_ROLE) {
        super._burn(account, id, value);
    }
}
