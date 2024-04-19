const hre = require("hardhat");

CONTRACT_ADDR_CUSTOMER = "0x51F3c2C302273e60fc69C1c6E40339f0Bc17cFBE";

async function main() {
    //hardhat-ethers
    const contract = await hre.ethers.getContractAt("TrustPointCustomer", CONTRACT_ADDR_CUSTOMER);

    // à changer
    const tx = await contract.setPlayerInfo('Luca', 200);
    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});