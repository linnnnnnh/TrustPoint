const hre = require("hardhat");
require("dotenv").config();

CONTRACT_ADDR_BRAND = process.env.CONTRACT_ADDR_BRAND;

// Create a new reward & give points to user
async function main() {
    const customerAddr = "0xfdb8D26D4faB21C3c506A3781583a46aEDc5833d";

    const brandContract = await hre.ethers.getContractAt("TrustPointBrand", CONTRACT_ADDR_BRAND);

    await brandContract.createNewReward("First reward", "Easy", 100);
    const reward = await brandContract.getRewardFromID(1);

    console.log("A new reward has been created!");
    console.log(reward);

    let points = await brandContract.balanceOf(customerAddr, 0);
    console.log("Customer points before:", points.toString());

    const data = hre.ethers.encodeBytes32String("");
    await brandContract.earnPoints(customerAddr, 200, data);

    points = await brandContract.balanceOf(customerAddr, 0);
    console.log("Customer points after:", points.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
