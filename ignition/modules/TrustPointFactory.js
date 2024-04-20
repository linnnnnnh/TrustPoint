const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Deploy factory contract
module.exports = buildModule("TrustPointFactory", (m) => {
    
    const trustPointFactory = m.contract("TrustPointFactory");
  
    return { trustPointFactory };
});
