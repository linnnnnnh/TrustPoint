// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";
import "./TrustPointStorage.sol";
import "./TrustPointCustomer.sol";

contract SignProtocolForLoyalty is TrustPointStorage, TrustPointCustomer {
    ISP public spInstance;
    uint64 public schemaId;

    constructor(address _instance) {
        spInstance = ISP(_instance);
    }

    function setSPInstance(address _instance) external {
        spInstance = ISP(_instance);
    }

    /// called by the attestion creation functions
    function setSchemaID(uint64 _schemaId) internal {
        schemaId = _schemaId;
    }

    event PointsConfirmed(
        address customer,
        uint256 points,
        address brand,
        uint64 attestationId
    );
    event GetPotentialCustomers(
        address[] customer,
        uint256 pointsThreshold,
        string brand
    );

    /// Attestion for brand owner to check the required threshold of points for reward redemption
    function confirmPointsForRewards(
        address _customer,
        uint256 _points,
        address _brand,
        uint64 _schemaId
    ) public returns (uint64) {
        setSchemaID(_schemaId);

        bool checkPoints = customers[_customer].pointsByBrand[_brand] >=
            _points;
        require(checkPoints, "Insufficient points, attestation refused.");

        bytes[] memory recipients = new bytes[](1);
        recipients[0] = abi.encode(msg.sender);

        bytes memory encodedData = abi.encode(_customer, _points, _brand);

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
        emit PointsConfirmed(_customer, _points, _brand, attestationId);
        return attestationId;
    }

    /// Attestion allowing interoperability for brands to target potential clients
    function targetPotentialCustomers(
        string memory _brandName,
        address _brandAddr,
        uint256 _pointsThreshold,
        uint64 _schemaId
    ) public returns (uint64) {
        setSchemaID(_schemaId);

        address[] memory potentialCustomers = getCustomersPerBrand(
            _brandAddr,
            _pointsThreshold
        );

        require(potentialCustomers.length >= 1, "No eligible customers");

        bytes[] memory recipients = new bytes[](1);
        recipients[0] = abi.encode(msg.sender);

        bytes memory encodedData = abi.encode(
            potentialCustomers,
            _pointsThreshold,
            _brandName
        );

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
        emit GetPotentialCustomers(
            potentialCustomers,
            _pointsThreshold,
            _brandName
        );
        return attestationId;
    }
}
