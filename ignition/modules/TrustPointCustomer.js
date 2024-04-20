const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

/// SCRIPT NOT FINISHED 
module.exports = buildModule("TrustPointCustomer2", (m) => {
  
    const trustPointCustomer = m.contract("TrustPointCustomer");
  
    return { trustPointCustomer };
});
