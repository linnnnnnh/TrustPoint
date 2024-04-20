const hre = require("hardhat");

CONTRACT_ADDR_BRAND = "0x0989CD24eF9FCED704bc5f878d68Ff48961C1005";

async function main() {
    //hardhat-ethers
    const customerAddr = "0x0475Bd09c8dF8C759de6dD8ec5A7285818a680Fd";

    const contract = await hre.ethers.getContractAt("TrustPointBrand", CONTRACT_ADDR_BRAND);

    let points = await contract.getCustomerPoints(customerAddr);
    console.log("Customer points before:", points.toString());

    await contract.createNewReward("First reward", "Easy", 10);

    const data = hre.ethers.encodeBytes32String("");
    await contract.earnPoints(customerAddr, 10, data);

    points = await contract.getCustomerPoints(customerAddr);
    console.log("Customer points after:", points.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
