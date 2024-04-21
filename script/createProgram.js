const hre = require("hardhat");
const { verify } = require("./verify.js");
require("dotenv").config();

CONTRACT_ADDR_FACTORY = process.env.CONTRACT_ADDR_FACTORY;
CONTRACT_ADDR_CUSTOMER = process.env.CONTRACT_ADDR_CUSTOMER;

// Create new TrustPointBrand contract from factory & get the contract address
async function main() {
    const provider = new hre.ethers.JsonRpcProvider(process.env.ARBITRUM_SEPOLIA_URL);
    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const brandName = hre.ethers.encodeBytes32String("MyBrand");
    const spInstance = "0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD";

    const contract = await hre.ethers.getContractAt("TrustPointFactory", CONTRACT_ADDR_FACTORY);

    await contract.createNewProgram(wallet.address, brandName, 0, spInstance, CONTRACT_ADDR_CUSTOMER);
    console.log("New loyalty program has been created for your brand!\n");

    let lastIndex = await contract.getLastIndex();

    let programAddress = await contract.getProgramFromIndex(lastIndex);
    console.log("Here is the contract address:", programAddress);

    if (process.env.ARBISCAN_API_KEY) {
        await verify(programAddress, [wallet.address, brandName, 0, spInstance, CONTRACT_ADDR_CUSTOMER]);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
