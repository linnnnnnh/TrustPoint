const hre = require("hardhat");

// CONTRACT_ADDR = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
CONTRACT_ADDR = "0x3419350265Ff06b824698813df806A8d7Cb6F9fC";
const PRIVATE_KEY = "a7d19f8da59a35a499efa299c87d8ae9aa37b5ae31dbf5b349ed107e8821925b";

async function main() {
    const provider = new hre.ethers.JsonRpcProvider(process.env.ARBITRUM_SEPOLIA_URL);
    const wallet = new hre.ethers.Wallet(PRIVATE_KEY, provider);

    const contract = await hre.ethers.getContractAt("TrustPointBrand", CONTRACT_ADDR);
    const contractWithSigner = contract.connect(wallet);

    const customer = '0xdC4B924b566c380E5e090150b176e42D58ec172a';
    const data = hre.ethers.encodeBytes32String("");
    const points = 4000;

    // const tx = await contractWithSigner.createNewReward('Back Friday', 'Earn double points', 2000);
    // const tx = await contractWithSigner.earnPoints(customer, points, data);
    const tx = await contractWithSigner.getCustomerPoints(customer);

    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});