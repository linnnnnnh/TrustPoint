const hre = require("hardhat");
require("dotenv").config();

CONTRACT_ADDR_BRAND = process.env.CONTRACT_ADDR_BRAND;

// Create a new reward & give points to user
async function main() {
    const customerAddr = "0xfdb8D26D4faB21C3c506A3781583a46aEDc5833d";

    const brandContract = await hre.ethers.getContractAt("TrustPointBrand", CONTRACT_ADDR_BRAND);

    const rewardChosen = 1;

    let userBalance = await brandContract.balanceOf(customerAddr, rewardChosen);
    console.log("User reward balance before:", userBalance);

    await brandContract.customerUsedReward(customerAddr, rewardChosen);
    console.log("\nReward", rewardChosen, "used!\n");

    userBalance = await brandContract.balanceOf(customerAddr, rewardChosen);
    console.log("User reward balance after:", userBalance);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
