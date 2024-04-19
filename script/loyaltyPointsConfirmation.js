const hre = require("hardhat");

CONTRACT_ADDR_POINTS_Confirmation = "0x8Dcf23C761e6A5AA6d3a8fA4E492e85e962530Fc";

async function main() {
    //hardhat-ethers
    const contract = await hre.ethers.getContractAt("LoyaltyPointsConfirmation", CONTRACT_ADDR_POINTS_Confirmation);

    const customerAddr = "";
    // à changer
    const tx = await contract.confirmPoints(customerAddr, 2000);
    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});