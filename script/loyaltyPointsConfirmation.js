const hre = require("hardhat");

CONTRACT_ADDR_POINTS_CONFIRMATION = "0x3419350265Ff06b824698813df806A8d7Cb6F9fC";

async function main() {
    const contract = await hre.ethers.getContractAt("TrustPointBrand", CONTRACT_ADDR_POINTS_CONFIRMATION);

    const customer = "0xdC4B924b566c380E5e090150b176e42D58ec172a";
    const brandAddr = "0x0475Bd09c8dF8C759de6dD8ec5A7285818a680Fd";
    const brandName = "Brand XYZ";
    const pointsThreshold = 1000;
    const schemaId1 = 26;
    const schemaId2 = 46;

    // const tx = await contract.confirmPointsForRewards(customer, 3000, brandAddr, schemaId1);
    // console.log(tx);
    const tx = await contract.targetPotentialCustomers(brandName, brandAddr, pointsThreshold, schemaId2);
    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});