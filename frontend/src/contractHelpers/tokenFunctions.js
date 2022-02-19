export const getTokenUri = async (tokenContract) => {
    console.log(tokenContract)
    const response = await tokenContract.methods.uri(0).call();
    // Need to overwrite this while testing..
    console.log(response)
    return "process.env.API_URL"+"/item/{id}";
    //return response;
}
export const isApprovedForAll = async (operator, tokenContract, selectedAccount) =>
{    const response = await tokenContract.methods
      .isApprovedForAll(selectedAccount, operator._address)
      .call();
    return response;
}
export const getInventory = async (tokenContract, selectedAccount) => {
    const response = await tokenContract.methods
    .balanceOfBatch(
    Array(100).fill(selectedAccount),
    Array.from(Array(100).keys())
    )
    .call();
    return response
}
export const approveAll = async (operator, tokenContract,selectedAccount) => {
    await tokenContract.methods
    .setApprovalForAll(operator._address, true)
    .send({ from: selectedAccount });
}
export const getAllItems = async () => {
    const res = await fetch("process.env.API_URL" + "/item")
    const json = res.json() 
    return json;
}