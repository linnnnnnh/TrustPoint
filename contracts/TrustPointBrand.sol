// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "./SignProtocolForLoyalty.sol";

contract TrustPointBrand is
    ERC1155,
    AccessControl,
    ERC1155Burnable,
    SignProtocolForLoyalty
{
    /// Packed variables
    uint8 public constant ID_POINTS = 0; // fungible token ID
    address public brandAddress;

    uint256 public rewardID; // starting ID for NFT rewards

    event RewardCreated(uint256 indexed rewardID);

    // event PointsEarned(address indexed customer, uint256 indexed amount);
    // event RewardChosen(address indexed customer, uint256 indexed rewardID);
    // event RewardUsed(address indexed customer, uint256 indexed rewardID);
    // event End();

    /// @dev fill in the uri!!!
    constructor(
        address _brandAddress,
        bytes32 _brandName,
        BrandBizType _businessType,
        address _signProtocolAddress,
        address _customerAddress
    )
        ERC1155("")
        SignProtocolForLoyalty(_signProtocolAddress, _customerAddress)
    {
        brandAddress = _brandAddress;
        _grantRole(BRAND_ROLE, _brandAddress);
        _grantRole(BURNER_ROLE, _brandAddress);

        rewardID = 1;

        brands[_brandAddress] = Brand({
            brandAddress: _brandAddress,
            brandName: _brandName,
            businessType: _businessType,
            isMember: true
        });
    }

    /// Create the loyalty program and start it
    function createNewReward(
        string memory _name,
        string memory _description,
        uint256 _pointsRequired
    ) public onlyRole(BRAND_ROLE) {
        rewards[rewardID] = Reward({
            id: rewardID,
            name: _name,
            description: _description,
            pointsRequired: _pointsRequired,
            activated: true
        });

        emit RewardCreated(rewardID);

        rewardID++;
    }

    // function activateReward(uint256 _rewardID) public onlyRole(BRAND_ROLE) {
    //     require(rewards[_rewardID].id != 0, "Not yet created");

    //     rewards[_rewardID].activated = true;
    // }

    // function deactivateReward(uint256 _rewardID) public onlyRole(BRAND_ROLE) {
    //     rewards[_rewardID].activated = false;
    // }

    /// Minting loyalty points (fungible tokens)
    function earnPoints(
        address _customer,
        uint256 _points,
        bytes memory _data
    ) public onlyRole(BRAND_ROLE) {
        _mint(_customer, ID_POINTS, _points, _data);

        customerContract.addCustomerPoints(_customer, brandAddress, _points);

        // emit PointsEarned(_customer, _points);
    }

    /// Choose the reward for customer (NFT)
    function chooseReward(
        address _customer,
        uint256 _rewardID,
        bytes memory _data
    ) public onlyRole(BRAND_ROLE) {
        require(rewards[_rewardID].activated == true, "Reward not activated");

        uint256 rewardThreshold = rewards[_rewardID].pointsRequired;

        require(
            customerContract.getCustomerPoints(_customer, brandAddress) >=
                rewardThreshold,
            "Not enough points"
        );

        /// mint the reward NFT
        _mint(_customer, _rewardID, 1, _data);

        /// Decrement the points from the customer record
        customerContract.removeCustomerPoints(
            _customer,
            brandAddress,
            rewardThreshold
        );

        /// Burn the fungible tokens (points)
        _burnTokens(_customer, ID_POINTS, rewardThreshold);

        // emit RewardChosen(_customer, _rewardID);
    }

    function customerUsedReward(
        address _customer,
        uint256 _rewardID
    ) public onlyRole(BRAND_ROLE) {
        require(balanceOf(_customer, _rewardID) >= 1, "Don't have reward");

        _burnTokens(_customer, _rewardID, 1);

        // emit RewardUsed(_customer, _rewardID);
    }

    /// Airdrop to potential customer, returned by targetPotentialCustomers()
    function airdrop(
        address[] calldata _wAddresses,
        uint256 _rewardID,
        bytes memory _data
    ) public onlyRole(BRAND_ROLE) {
        require(_wAddresses.length > 0, "No target");
        for (uint i; i < _wAddresses.length; i++) {
            _mint(_wAddresses[i], _rewardID, 1, _data);
        }
    }

    // function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
    //     _setURI(newuri);
    // }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function getRewardFromID(
        uint256 _rewardID
    ) public view returns (Reward memory) {
        return rewards[_rewardID];
    }

    // function getCustomerPoints(
    //     address _customer
    // ) public view returns (uint256) {
    //     return customerContract.getCustomerPoints(_customer, brandAddress);
    // }

    /*///////////////////////////////////////////////////////////////
                            Internal functions
    //////////////////////////////////////////////////////////////*/

    /// Grant the permission to Brand to burn Customer tokens
    function _burnTokens(
        address _account,
        uint256 _id,
        uint256 _value
    ) internal onlyRole(BURNER_ROLE) {
        _burn(_account, _id, _value);
    }
}
