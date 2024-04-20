const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LoyaltyPointsConfirmationV7", (m) => {
    const spInstance = "0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD";

    const loyaltyPointsConfirmation = m.contract("LoyaltyPointsConfirmation", [spInstance]);

    return { loyaltyPointsConfirmation };
});
