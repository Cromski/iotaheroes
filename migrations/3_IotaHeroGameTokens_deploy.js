const IotaHeroGameTokensContract = artifacts.require('IotaHeroGameTokens');

module.exports = function(deployer) {
    deployer.deploy(IotaHeroGameTokensContract);
}