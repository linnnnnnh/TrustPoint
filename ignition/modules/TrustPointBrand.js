const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const hre = require("hardhat");

module.exports = buildModule("TrustPointBrandModuleV2", (m) => {
    const brandName = hre.ethers.encodeBytes32String("KBrand");
    const brandAddr = "0x0475Bd09c8dF8C759de6dD8ec5A7285818a680Fd";
    const addrSign = "0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD";
    
    const trustPointBrand = m.contract("TrustPointBrand", [brandAddr, brandName, 0, addrSign]);
  
    return { trustPointBrand };
});
