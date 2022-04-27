export const signUp = async (username, heroContract, selectedAccount) => {
    await heroContract.methods.signUp(username).send({from:selectedAccount});
}
export const isSignedUp = async (heroContract, selectedAccount) => {
  try {
    return {error:false, status:await heroContract.methods.isSignedUp().call({from:selectedAccount})};
  } catch (e) {
    return {error:true, status:e};
  }    
}
// current users name
export const getUsername = async (heroContract, address) => {
    const response = await heroContract.methods.getUsername().call({from:address});
    return response;
}
export const getUsernameByAddress = async (heroContract, address) => {
    const response = await heroContract.methods.getUsernameByAddress(address).call();
    return response;
}
export const getAddressForUsername = async (heroContract, username) => {
    const response = await heroContract.methods.getAddressForUsername(username).call();
    return response;
}
export const getUserCount = async (heroContract) => {
    const response = await heroContract.methods.currentUserCount().call();
    return response;
}
export const usernameExists = async (username, heroContract) => {
    const response = await heroContract.methods.usernameExists(username).call();
    return response;
}

export const searchUser = async (user,heroContract) => {
    var exists = await usernameExists(user, heroContract);
    var addr = await getAddressForUsername(heroContract, user);
    if (exists) {
      return {username:user, address: addr};
    } else {
      var isValid = isValidAddress(user);
      if (isValid) {
        var username = await getUsernameByAddress(heroContract, user);
        return {username:username, address:user};
      } else {
        return "";
      }
    }
  };
  const isValidAddress = (adr) => {
    return adr.length === 42;
  };