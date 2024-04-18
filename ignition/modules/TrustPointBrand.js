const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("TrustPointBrand", (m) => {
  
    const trustPointBrand = m.contract("TrustPointBrand", "K-Brand", BrandBizType.Fashion);
  
    return { trustPointBrand };
});
