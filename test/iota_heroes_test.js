const IotaHeroAdventure = artifacts.require("IotaHeroAdventure");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("IotaHeroAdventure", function (/* accounts */) {
  it("should assert true", async function () {
    await IotaHeroAdventure.deployed();
    return assert.isTrue(true);
  });
});
