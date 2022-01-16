export const getProducts = async (storeId, storeContract) => {
    console.log(storeContract)
    const response = await storeContract.methods.getProducts(storeId).call();
    return response;
}
export const buyProduct = async (productId, storeId, amount,price, storeContract, selectedAccount) => {
    console.log(productId,storeId,amount)
    var salePrice = price*amount;
    await storeContract.methods.buyProduct(storeId, productId, amount).send({from:selectedAccount, value:salePrice});
}