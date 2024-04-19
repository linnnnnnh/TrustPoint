const hre = require("hardhat");

CONTRACT_ADDR_BRAND = "0x51F3c2C302273e60fc69C1c6E40339f0Bc17cFBE";

async function main() {
    //hardhat-ethers
    const contract = await hre.ethers.getContractAt("TrustPointCustomer", CONTRACT_ADDR_BRAND);

    const customerAddr = "0x966907738C4b58a4956795fcf185569922262f81";
    const age = 30;
    const gender = hre.ethers.encodeBytes32String("F");
    const country = hre.ethers.encodeBytes32String("France");

    const tx = await contract.registerCustomer(customerAddr, age, gender, country);
    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});