// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

/// @dev This contract saves the state variables for all TrustPoint members

contract TrustPointStorage {
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

    /// Customer memeber
    struct Customer {
        address customerAddress;
        uint256 age;
        bytes32 gender;
        bytes32 country;
        uint256 totalPoints;
        bool isMember;
        /// Mapping from brand => points
        mapping(address => uint) pointsByBrand;
    }

    /// Mapping from address => member
    mapping(address => Brand) public brands;
    mapping(address => Customer) public customers;

    /// ???Mapping from brand => (registered customers => isMember)
    mapping(address => mapping(address => bool)) public customerBrands;

    /// LoyaltyProgram
    struct LoyaltyProgram {
        string programName;
        string reward;
        uint256 pointsRequired;
    }
    // Mapping from brand => LoyaltyProgram
    mapping(address => LoyaltyProgram) public loyaltyProgramsByBrand;
}
