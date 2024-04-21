const hre = require("hardhat");
require("dotenv").config();

CONTRACT_ADDR_BRAND = process.env.CONTRACT_ADDR_BRAND;
CONTRACT_ADDR_CUSTOMER = process.env.CONTRACT_ADDR_CUSTOMER;

// Create a new reward & give points to user
async function main() {
    const customerAddr = "0xfdb8D26D4faB21C3c506A3781583a46aEDc5833d";

    const brandContract = await hre.ethers.getContractAt("TrustPointBrand", CONTRACT_ADDR_BRAND);
    const customerContract = await hre.ethers.getContractAt("TrustPointCustomer", CONTRACT_ADDR_CUSTOMER);

    const brandOwnerAddr = await brandContract.brandAddress();

    await brandContract.createNewReward("First reward", "Easy", 100);
    const reward = await brandContract.getRewardFromID(1);

    console.log("A new reward has been created!");
    console.log(reward);

    let points = await customerContract.getCustomerPoints(customerAddr, brandOwnerAddr);
    console.log("Customer points before:", points.toString());

    const data = hre.ethers.encodeBytes32String("");
    await brandContract.earnPoints(customerAddr, 200, data);

    points = await customerContract.getCustomerPoints(customerAddr, brandOwnerAddr);
    console.log("Customer points after:", points.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
