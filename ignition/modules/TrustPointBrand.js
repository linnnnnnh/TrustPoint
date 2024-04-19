const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");

module.exports = buildModule("TrustPointBrandModule", (m) => {
    const brandName = hre.ethers.encodeBytes32String("KBrand");
    const brandAddr = "0x0475Bd09c8dF8C759de6dD8ec5A7285818a680Fd";
    
    const trustPointBrand = m.contract("TrustPointBrand", [brandAddr, brandName, 0]);
  
    return { trustPointBrand };
});
