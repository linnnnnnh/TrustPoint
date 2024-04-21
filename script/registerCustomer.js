const hre = require("hardhat");
require("dotenv").config();

CONTRACT_ADDR_CUSTOMER = process.env.CONTRACT_ADDR_CUSTOMER;

// Create a new reward & give points to user
async function main() {
    const customerAddr = "0xfdb8D26D4faB21C3c506A3781583a46aEDc5833d";

    const customerContract = await hre.ethers.getContractAt("TrustPointCustomer", CONTRACT_ADDR_CUSTOMER);

    const gender = hre.ethers.encodeBytes32String("Male");
    const country = hre.ethers.encodeBytes32String("France");
    await customerContract.registerCustomer(customerAddr, 25, gender, country);

    console.log("Your customer has been registered!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
