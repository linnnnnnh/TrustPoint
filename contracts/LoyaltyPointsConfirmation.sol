// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";
import "./TrustPointStorage.sol";

contract LoyaltyPointsConfirmation is Ownable, TrustPointStorage {
    ISP public spInstance;
    uint64 public schemaId;

    error ConfirmationAddressMismatch();

    constructor(address _spInstance, uint64 _schemaId) Ownable(_msgSender()) {
        spInstance = ISP(_spInstance);
        schemaId = _schemaId;
    }

    event PointsConfirmed(
        address customer,
        uint256 points,
        address brand,
        uint64 attestationId
    );

    // function setSPInstance(address instance) external onlyOwner {
    //     spInstance = ISP(instance);
    // }

    // function setSchemaID(uint64 schemaId_) external onlyOwner {
    //     schemaId = schemaId_;
    // }

    // function claimHavePoints(
    //     address _customer,
    //     address _brand,
    //     uint256 _points
    // ) external {
    //     _points = customers[_customer].pointsByBrand[_brand];
    // }

    function confirmPoints(
        address customer,
        uint256 points
    ) external returns (uint64) {
        address brand = msg.sender;
        if (customers[customer].pointsByBrand[brand] == points) {
            bytes[] memory recipients = new bytes[](1);
            recipients[0] = abi.encode(customer);

            bytes memory encodedData = abi.encode(customer, points, brand);

            Attestation memory a = Attestation({
                schemaId: schemaId,
                linkedAttestationId: 0,
                attestTimestamp: 0,
                revokeTimestamp: 0,
                attester: address(this),
                validUntil: 0,
                dataLocation: DataLocation.ONCHAIN,
                revoked: false,
                recipients: recipients,
                data: encodedData
            });
            uint64 attestationId = spInstance.attest(a, "", "", "");
            emit PointsConfirmed(customer, points, brand, attestationId);
            return attestationId;
        } else {
            revert ConfirmationAddressMismatch();
        }
    }
}
