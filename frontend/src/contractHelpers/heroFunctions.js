import {
    getHeroAdventureStatus
  } from "../contractHelpers/adventureFunctions";

export const getHeroes = async (heroContract,adventureContract, selectedAccount) => {
    console.log(heroContract)
    const heroes = await heroContract.methods.getOwnerHeroes(selectedAccount).call();
    console.log(heroes)
    const arrLength = heroes.length;
    let heroesWithStatus = [];
    await Promise.all(heroes.map( async (hero) => {
        const heroStatus = await getHeroAdventureStatus(hero.id,adventureContract);
        heroesWithStatus.push({...hero, readyToAdventure: heroStatus[1], isAdventuring: heroStatus[0]})
    })
    )
    console.log("heroesstatus",heroesWithStatus)
    return heroesWithStatus;
}
export const getHero = async (id, heroContract, adventureContract) => {
    const hero = await heroContract.methods.heroes(id).call();
    const heroStatus = await getHeroAdventureStatus(id,adventureContract);
    addHeroStatus(hero,heroStatus);
    return hero;
}

export const spawnHero = async (heroContract, selectedAccount) => {
    await heroContract.methods.spawnHero().send({ from: selectedAccount });
}

const addHeroStatus = (hero, heroStatus) => {
    hero.readyToAdventure = heroStatus[1];
    hero.isAdventuring = heroStatus[0];
    return hero;
}
