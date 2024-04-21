const hre = require("hardhat");
require("dotenv").config();

CONTRACT_ADDR_BRAND = process.env.CONTRACT_ADDR_BRAND;

// Create a new reward & give points to user
async function main() {
    const customerAddr = "0xfdb8D26D4faB21C3c506A3781583a46aEDc5833d";

    const brandContract = await hre.ethers.getContractAt("TrustPointBrand", CONTRACT_ADDR_BRAND);

    const rewardChosen = 1;

    let userBalance = await brandContract.balanceOf(customerAddr, rewardChosen);
    let userBalancePoints = await brandContract.balanceOf(customerAddr, 0);
    console.log("User points balance before:", userBalancePoints);
    console.log("User reward balance before:", userBalance);

    const data = hre.ethers.encodeBytes32String("");
    await brandContract.chooseReward(customerAddr, rewardChosen, data);
    console.log("\nReward", rewardChosen, "chosen!\n");

    userBalance = await brandContract.balanceOf(customerAddr, rewardChosen);
    userBalancePoints = await brandContract.balanceOf(customerAddr, 0);
    console.log("User points balance after:", userBalancePoints);
    console.log("User reward balance after:", userBalance);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
