export const getOpenTrades = async (heroMarketContract) => {
    const response = await heroMarketContract.methods.getOpenTrades().call();
    return response;
}
export const getTradeForItemId = async (itemId, heroMarketContract) => {
  const response = await heroMarketContract.methods.getTradeForItem(itemId).call();

  if (response.tradeInitiator == "0x0000000000000000000000000000000000000000")
  {
    return null;
  } else {
    return response;
  }
}
export const cancelTrade = async (tradeId, heroMarketContract, selectedAccount) => {
    await heroMarketContract.methods.cancelTrade(tradeId)
    .send({ from: selectedAccount });
}
export const listTrade = async ( itemId,price,heroMarketContract,selectedAccount) => {
  await heroMarketContract.methods.listTrade(itemId,price)
  .send({ from: selectedAccount });
}
export const fulfillTrade = async (id, value, heroMarketContract, selectedAccount) => {
    await heroMarketContract.methods.fulfillTrade(id).send({value:value, from: selectedAccount });
}