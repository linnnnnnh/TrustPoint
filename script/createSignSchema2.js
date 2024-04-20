require("dotenv").config();

const {
    SignProtocolClient,
    SpMode,
    EvmChains
} = require("@ethsign/sp-sdk");
const { privateKeyToAccount } = require("viem/accounts");

const privateKey = process.env.PRIVATE_KEY_FOR_SCHEMA;

const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.arbitrumSepolia,
    account: privateKeyToAccount(privateKey)
});

async function createSchema() {
    try {

        const res = await client.createSchema({
            name: "P Customers",
            data: [
                { name: "customer", type: "address[]" },
                { name: "pointsThreshold", type: "uint256" },
                { name: "brand", type: "string" }
            ]
        });

        console.log("Schema created:", res);
    } catch (error) {
        console.error("Failed to create schema:", error);
    }
}

createSchema();
