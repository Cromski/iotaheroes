
export const getHeroes = async (heroContract, selectedAccount) => {
    console.log(heroContract)
    const response = await heroContract.methods.getOwnerHeroes(selectedAccount).call();
    return response;
}
export const getHero = async (id, heroContract) => {
    const response = await heroContract.methods.heroes(id).call();
    return response;
}
export const getCompletedAdventures = async (id, heroContract) =>  {
    const response = await heroContract.getPastEvents("AdventureCompleted", {
        fromBlock: 0,
        toBlock: "latest",
        filter: { heroId: id },
      });
      return response;
}
export const goAdventure = async (id, heroContract, selectedAccount) => {
    await heroContract.methods.goAdventure(id).send({ from: selectedAccount });
}
export const spawnHero = async (heroContract, selectedAccount) => {
    await heroContract.methods.spawnHero().send({ from: selectedAccount });
}

