const IotaHeroTokenTradeContract = artifacts.require("IotaHeroTokenTrade");

module.exports = function(deployer) {
    deployer.deploy(IotaHeroTokenTradeContract);
}