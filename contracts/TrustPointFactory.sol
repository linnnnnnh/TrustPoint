// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./TrustPointBrand.sol";
import "./TrustPointStorage.sol";

contract TrustPointFactory {

   TrustPointBrand[] public programsList;

   function createNewProgram(address _brandAddress, bytes32 _brandName, TrustPointStorage.BrandBizType _businessType) public returns (uint256) {
     TrustPointBrand newProgram = new TrustPointBrand(_brandAddress, _brandName, _businessType);
     programsList.push(newProgram);

     return programsList.length - 1;
   }

    function getProgramFromIndex(uint256 _index) public view returns (TrustPointBrand) {
        return programsList[_index];
    }

    function getLastIndex() public view returns (uint256) {
        return programsList.length - 1;
    }
}
