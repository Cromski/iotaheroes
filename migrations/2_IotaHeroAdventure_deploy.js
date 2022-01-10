const IotaHeroAdventureContract = artifacts.require('IotaHeroAdventure');

module.exports = function(deployer) {
    deployer.deploy(IotaHeroAdventureContract);
}