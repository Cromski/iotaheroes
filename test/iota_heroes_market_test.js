const IotaHeroTokenTrade = artifacts.require("IotaHeroTokenTrade");
const IotaHeroGameTokensContract = artifacts.require('IotaHeroGameTokens');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("IotaHeroTokenTrade", function (/* accounts */) {
    let tokentrade
    let gametokens
    before(async () => {
        tokentrade = await IotaHeroTokenTrade.deployed();
        gametokens = await IotaHeroGameTokensContract.deployed();
    })
    it('trade contract deployed successfully', async () => {
        const address = await tokentrade.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })
    it('token contract deployed successfully', async () => {
        const address = await gametokens.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('sets address on tokentrader', async () =>  {
        tokentrade.setTokenAddress(gametokens.address)
        .then(() => tokentrade.getTokenAddress())
        .then(contract => {
            console.log(contract)
            assert.Equal(contract, gametokens.address)
        })
    })
});
