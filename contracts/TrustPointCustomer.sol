// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./TrustPointStorage.sol";

contract TrustPointCustomer is TrustPointStorage {
    address public immutable owner; // owner: TrustPoint

    constructor() {
        owner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /// Customer registers themselves on TrustPoint
    function registerCustomer(
        address _addr,
        uint256 _age,
        bytes32 _gender,
        bytes32 _country
    ) public {
        require(!customers[_addr].isMember, "Already customer.");
        require(brands[_addr].isMember, "Brands cannot register as customer.");
        Customer storage customer = customers[_addr];
        customer.age = _age;
        customer.gender = _gender;
        customer.country = _country;
        customer.isMember = true;
        customer.totalPoints = 10;
    }

    /// Update customer details
    function updateCustomer(
        address _addr,
        uint256 _age,
        bytes32 _gender,
        bytes32 _country
    ) public {
        require(customers[_addr].isMember, "Not a member");
        require(msg.sender == _addr, "Permission denied");
        Customer storage customer = customers[_addr];
        customer.age = _age;
        customer.gender = _gender;
        customer.country = _country;
    }
}