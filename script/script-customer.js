const hre = require("hardhat");

CONTRACT_ADDR_BRAND = "0x443cf8612eC468D18AC941f47983252b7A70f40F";

async function main() {
    //hardhat-ethers
    const contract = await hre.ethers.getContractAt("Score", CONTRACT_ADDR_BRAND);

    //à changer
    const tx = await contract.setPlayerInfo('Luca', 200);
    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});