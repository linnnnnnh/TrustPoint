const hre = require("hardhat");

CONTRACT_ADDR = "0x66CB36Fce477BD0a20DEf5Ad366f0D0E49b0B9F6";

async function main() {
    //hardhat-ethers
    const contract = await hre.ethers.getContractAt("Score", CONTRACT_ADDR);

    const tx = await contract.setPlayerInfo('Luca', 200);
    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});