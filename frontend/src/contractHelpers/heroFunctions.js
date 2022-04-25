import {
    getHeroAdventureStatus
  } from "../contractHelpers/adventureFunctions";
  import {getHeroTraits} from "../apiHelpers/Hero"


export const getHeroes = async (heroContract,adventureContract, selectedAccount) => {
    const heroes = await heroContract.methods.getOwnerHeroes(selectedAccount).call();
    let heroesWithStatus = [];
    await Promise.all(heroes.map( async (hero) => {
        const heroStatus = await getHeroAdventureStatus(hero.id,adventureContract);
        const heroTraits = await getHeroTraits(hero.id);
        const heroOwner = await getHeroOwner(hero.id, heroContract);

        heroesWithStatus.push({...hero, readyToAdventure: heroStatus[1], isAdventuring: heroStatus[0], traits:heroTraits,owner:heroOwner})
    })
    )
    return heroesWithStatus.sort((a,b) => a.id - b.id);
}
export const getHeroesSimple = async (heroContract, selectedAccount) => {
    const heroes = await heroContract.methods.getOwnerHeroes(selectedAccount).call();   
    return heroes;
}
export const getHero = async (id, heroContract, adventureContract) => {
    const hero = await heroContract.methods.heroes(id).call();
    const heroStatus = await getHeroAdventureStatus(id,adventureContract);
    const heroTraits = await getHeroTraits(id);
    const heroOwner = await getHeroOwner(id, heroContract);
    addHeroStatusAndTraits(hero,heroStatus,heroTraits,heroOwner);

    return hero;
}

export const spawnHero = async (heroContract, selectedAccount) => {
    await heroContract.methods.spawnHero().send({ from: selectedAccount });
}
export const isApprovedForAll = async (operator, heroContract, selectedAccount) =>
{    const response = await heroContract.methods
      .isApprovedForAll(selectedAccount, operator._address)
      .call();
    return response;
}

export const approveAll = async (operator, heroContract,selectedAccount) => {
    await heroContract.methods
    .setApprovalForAll(operator._address, true)
    .send({ from: selectedAccount });
}
export const getHeroOwner = async (id, heroContract) =>
{    const response = await heroContract.methods
      .ownerOf(id)
      .call();
    return response;
}



const addHeroStatusAndTraits = (hero, heroStatus,heroTraits, owner) => {
    hero.readyToAdventure = heroStatus[1];
    hero.isAdventuring = heroStatus[0];
    hero.traits = heroTraits;
    hero.owner = owner;
    return hero;
}
