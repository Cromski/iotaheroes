export const signUp = async (username, heroContract, selectedAccount) => {
    await heroContract.methods.signUp(username).send({from:selectedAccount});
}
export const isSignedUp = async (heroContract, selectedAccount) => {
    const response = await heroContract.methods.isSignedUp().call({from:selectedAccount});
    return response;
}
export const getUsername = async (heroContract, selectedAccount) => {
    const response = await heroContract.methods.getUsername().call({from:selectedAccount});
    return response;
}
export const usernameExists = async (username, heroContract) => {
    const response = await heroContract.methods.usernameExists(username).call();
    console.log(response)
    return response;
}