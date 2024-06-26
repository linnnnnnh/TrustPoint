require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    arbitrumSepolia: {
      url: process.env.ARBITRUM_SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    chiado: {
      url: process.env.CHIADO_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    morphTestnet: {
      url: process.env.MORPH_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    availSepolia: {
      url: process.env.AVAIL_SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },

  etherscan: {
    apiKey: {
      arbitrumSepolia: process.env.ARBISCAN_API_KEY
    }
  }
};
