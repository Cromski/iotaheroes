export const getAdventure = async (id) => {
    console.log(id)
    const res = await fetch("process.env.API_URL"+"/adventure/"+id)
    const json = res.json() 
    return json;
}
export const getCompletedAdventures = async (id, adventureContract) =>  {
    const response = await adventureContract.getPastEvents("AdventureCompleted", {
        fromBlock: 0,
        toBlock: "latest",
        filter: { heroId: id },
      });
      console.log(response)
      return response;
}
export const goAdventure = async (id, equipment, adventureContract, selectedAccount) => {
    await adventureContract.methods.goAdventure(id, equipment).send({ from: selectedAccount });
}
export const getHeroAdventureStatus = async (id, adventureContract) => {
    console.log(adventureContract)
    const response = await adventureContract.methods.getHeroAdventureStatus(id).call();
    console.log(response)
    return response;
}