// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "./TrustPointStorage.sol";

contract TrustPointBrand is
    ERC1155,
    AccessControl,
    ERC1155Burnable,
    TrustPointStorage
{
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant BRAND_ROLE = keccak256("BRAND_ROLE");
    bytes32 public constant CUSTOMER_ROLE = keccak256("CUSTOMER_ROLE");

    address public immutable owner;

    uint256 public endAt;
    bool public started;
    bool public ended;

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
        uint256 id,
        uint256 points,
        bytes memory data
    ) public onlyRole(BRAND_ROLE) {
        require(started, "No program available.");
        _mint(to, id, points, data);
        customers[to].totalPoints += points;
        customers[to].pointsByBrand[msg.sender] += points;
    }

    /// Redeem the reward for customer (NFT)
    function redeemReward(
        address to,
        uint256 id,
        bytes memory data
    ) public onlyRole(BRAND_ROLE) {
        uint256 pointsToRedeem = loyaltyProgramsByBrand[msg.sender]
            .pointsRequired;
        require(
            customers[to].pointsByBrand[msg.sender] >= pointsToRedeem,
            "Not enough points."
        );

        /// mint the NFT
        _mint(to, id, 1, data);

        /// Burn the fungible tokens(points)
        _burn(to, id, pointsToRedeem);

        customers[to].totalPoints -= pointsToRedeem;
        customers[to].pointsByBrand[msg.sender] -= pointsToRedeem;
    }

    /// End the loyalty program
    function endProgram() public onlyRole(BRAND_ROLE) {
        require(started, "not started");
        require(!ended, "ended");
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
}
