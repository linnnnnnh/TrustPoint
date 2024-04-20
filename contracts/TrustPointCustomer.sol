// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./TrustPointStorage.sol";

contract TrustPointCustomer {
    address public immutable owner; // owner: TrustPoint

    /// Array to store all Customer struct of the plateform 
    address[] public allCustomers;

    /// ???Mapping from brand => (registered customers => isMember)
    mapping(address => Customer) public customers;
    mapping(address => mapping(address => bool)) public customerBrands;

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

    constructor() {
        owner = msg.sender;
    }

    /// Customer registers themselves on TrustPoint
    function registerCustomer(
        address _addr,
        uint256 _age,
        bytes32 _gender,
        bytes32 _country
    ) public {
        require(!customers[_addr].isMember, "Already customer.");
        // require(!brands[_addr].isMember, "Brands cannot register as customer.");
        Customer storage customer = customers[_addr];
        customer.age = _age;
        customer.gender = _gender;
        customer.country = _country;
        customer.isMember = true;
        customer.totalPoints = 10;

        allCustomers.push(_addr);
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

    /// Get list of customers holding x points of a specific brand
    function getCustomersPerBrand(
        address _brand,
        uint256 _pointsEarned
    ) public view returns (address[] memory) {
        uint256 count = countCustomersPerBrand(_brand, _pointsEarned);

        address[] memory potentialCustomers = new address[](count);

        uint256 index = 0;
        for (uint256 i; i < allCustomers.length && index < count; ) {
            address c = allCustomers[i];

            if (customers[c].pointsByBrand[_brand] >= _pointsEarned) {
                potentialCustomers[index] = allCustomers[i];
                index++;
            }

            unchecked {
                ++i;
            }
        }
        return potentialCustomers;
    }

    /// Function called by getCustomersPerBrand
    function countCustomersPerBrand(
        address _brand,
        uint256 _pointsEarned
    ) internal view returns (uint256) {
        uint256 count = 0;
        for (uint256 i; i < allCustomers.length; ) {
            address c = allCustomers[i];

            if (customers[c].pointsByBrand[_brand] >= _pointsEarned) {
                ++count;
            }
        }
        return count;
    }

    function getCustomerPoints(address _customer, address _brand) public view returns (uint256) {
        return customers[_customer].pointsByBrand[_brand];
    }

    function addCustomerPoints(address _customer, address _brand, uint256 _points) public {
        customers[_customer].totalPoints += _points;
        customers[_customer].pointsByBrand[_brand] += _points;
    }

    function removeCustomerPoints(address _customer, address _brand, uint256 _points) public {
        customers[_customer].totalPoints -= _points;
        customers[_customer].pointsByBrand[_brand] -= _points;
    }
}
