const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");

module.exports = buildModule("TrustPointBrandModule", (m) => {
    const brandName = hre.ethers.encodeBytes32String("KBrand");
    const brandAddr = "0x36b89b49217E7f4F67C16abEb7F473A50F6cF1AC";
    
    const trustPointBrand = m.contract("TrustPointBrand", [brandAddr, brandName, 0]);
  
    return { trustPointBrand };
});
