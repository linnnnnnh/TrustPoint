const hre = require("hardhat");

// const CONTRACT_ADDR = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// const PRIVATE_KEY = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
const CONTRACT_ADDR = "0xC54414a40a40CDFbfA3BD42318fd9356B47A93DF";
const PRIVATE_KEY = "060a81d0733d92eda8acc0d2d8eac08dd522cb12a7b78dc6cf6f301b9a19e2aa";

async function main() {

    const provider = new hre.ethers.JsonRpcProvider(process.env.ARBITRUM_SEPOLIA_URL);
    const wallet = new hre.ethers.Wallet(PRIVATE_KEY, provider);

    const contract = await hre.ethers.getContractAt("TrustPointCustomer", CONTRACT_ADDR);

    const contractWithSigner = contract.connect(wallet);


    const customerAddr = "0xdC4B924b566c380E5e090150b176e42D58ec172a";
    const age = 40;
    const gender = hre.ethers.encodeBytes32String("F");
    const country = hre.ethers.encodeBytes32String("France");

    const tx = await contractWithSigner.registerCustomer(customerAddr, age, gender, country);
    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});