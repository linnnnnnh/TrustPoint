require("dotenv").config();

const {
    SignProtocolClient,
    SpMode,
    EvmChains
} = require("@ethsign/sp-sdk");
const { privateKeyToAccount } = require("viem/accounts");

const privateKey = process.env.PRIVATE_KEY_FOR_SCHEMA;
// console.log(privateKey);
const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.arbitrumSepolia,
    account: privateKeyToAccount(privateKey) // optional
});

async function createSchema() {
    try {

        const res = await client.createSchema({
            name: "Loyalty Points",
            data: [
                { name: "customer", type: "address" },
                { name: "points", type: "uint256" },
                { name: "brand", type: "address" }
            ]
        });

        console.log("Schema created:", res);
    } catch (error) {
        console.error("Failed to create schema:", error);
    }
}

createSchema();
