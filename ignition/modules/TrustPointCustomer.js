const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

/// SCRIPT NOT FINISHED 
module.exports = buildModule("TrustPointCustomer", (m) => {
  
    const trustPointCustomer = m.contract("TrustPointCustomer");
  
    return { trustPointCustomer };
});
