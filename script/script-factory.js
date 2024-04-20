const hre = require("hardhat");

CONTRACT_ADDR_FACTORY = "0x63dBb1A7Af8eA4f224aEbC9618912253330d0ae3";

// Create new TrustPointBrand contract from factory & get the contract address
async function main() {
    const brandAddr = "0x36b89b49217E7f4F67C16abEb7F473A50F6cF1AC";
    const brandName = hre.ethers.encodeBytes32String("MyBrand");

    const contract = await hre.ethers.getContractAt("TrustPointFactory", CONTRACT_ADDR_FACTORY);

    await contract.createNewProgram(brandAddr, brandName, 0);
    console.log("New loyalty program has been created for your brand!\n");

    let lastIndex = await contract.getLastIndex();

    let programAddress = await contract.getProgramFromIndex(lastIndex);
    console.log("Here is the contract address:", programAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
