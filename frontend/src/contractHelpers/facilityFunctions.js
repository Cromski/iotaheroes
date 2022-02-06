export const getFacilities = async (facilityContract, selectedAccount) => {
    console.log(facilityContract)
    const response = await facilityContract.methods.getFacilitiesWithUserLevels().call({from:selectedAccount});
    let facilitiesWithLevel = [];
    response[0].forEach((facility, i) => {
        facilitiesWithLevel.push({...facility, level: response[1][i]})
    })
    console.log(facilitiesWithLevel)
    return facilitiesWithLevel;
}
export const getBasePrice = async (facilityContract) => {
    const response = await facilityContract.methods.getBasePrice().call();
    return response;
}
export const addressReadyToUpgradeAt = async (facilityContract, selectedAccount) => {
    const response = await facilityContract.methods.getAddressCanUpgradeAt(selectedAccount).call();
    return response;
}
export const heroReadyToTrainAt = async (facilityContract, heroId) => {
    const response = await facilityContract.methods.getHeroCanTrainAt(heroId).call();
    return response;
}

export const upgradeFacilityById = async (facilityId, facilityContract,selectedAccount) => {
    await facilityContract.methods.upgradeFacility(facilityId).send({from:selectedAccount});
}
export const trainAtFacility = async (heroId, facilityId, facilityContract, selectedAccount) => {
    await facilityContract.methods.trainAtFacility(heroId, facilityId).send({from:selectedAccount});
}