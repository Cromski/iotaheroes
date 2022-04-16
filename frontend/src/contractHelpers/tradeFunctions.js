export const getPastTrades = async (tradeContract) => {
    const response = await tradeContract.methods.getOpenTrades().call();
    return response;
}
export const setTradeOffer = async ( itemIdsForSale,amountsForSale,itemIdsWanted,amountsWanted,tradeContract,selectedAccount) => {
    await tradeContract.methods.setTradeOffer(
      itemIdsForSale,
      amountsForSale,
      itemIdsWanted,
      amountsWanted
    )
    .send({ from: selectedAccount });
  }
export const fulfillTrade = async (id, tradeContract, selectedAccount) => {
    await tradeContract.methods.fulfillTradeOffer(id).send({ from: selectedAccount });
}