// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @dev This contract saves the state variables for all TrustPoint members

abstract contract TrustPointStorage is AccessControl {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant BRAND_ROLE = keccak256("BRAND_ROLE");
    bytes32 public constant CUSTOMER_ROLE = keccak256("CUSTOMER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    /// Brand business type
    enum BrandBizType {
        Fashion,
        LuxuryAccessory,
        Sportwear,
        Beauty,
        Electronics,
        Home
    }

    /// Brand member
    struct Brand {
        bytes32 brandName;
        address brandAddress;
        BrandBizType businessType;
        bool isMember;
    }

    /// Customer member
    struct Customer {
        address customerAddress;
        uint256 age;
        bytes32 gender;
        bytes32 country;
        uint256 totalPoints;
        bool isMember;
        /// Mapping from brand => points
        mapping(address => uint256) pointsByBrand;
    }

    /// Mapping from address => member
    mapping(address => Brand) public brands;
    mapping(address => Customer) public customers;

    /// Array to store all Customer struct of the plateform 
    address[] public allCustomers;

    /// ???Mapping from brand => (registered customers => isMember)
    mapping(address => mapping(address => bool)) public customerBrands;

    /// Loyalty Rewards
    struct Reward {
        uint256 id;
        string name;
        string description;
        uint256 pointsRequired;
        bool activated;
    }
    // Mapping from id => Reward
    mapping(uint256 => Reward) public rewards;
}
