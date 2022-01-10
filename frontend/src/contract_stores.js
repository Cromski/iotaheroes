import { defaultEvmStores, makeContractStore, web3, chainId } from "svelte-web3";
import IotaHeroAdventure from "./contracts/IotaHeroAdventure.json";
import IotaHeroGameTokens from "./contracts/IotaHeroGameTokens.json";
import IotaHeroTokenTrade from "./contracts/IotaHeroTokenTrade.json";
import { derived } from 'svelte/store';

export const hero = derived([web3, chainId], ([$web3, $chainId]) => {  
    if ($web3.eth && $chainId) {
        const deployedNetwork = IotaHeroAdventure.networks[$chainId];
        console.log(deployedNetwork)
        return new $web3.eth.Contract(
        IotaHeroAdventure.abi, deployedNetwork.address, {});
    }
    return null;
})
export const token = derived([web3, chainId], ([$web3, $chainId]) => {   
    if ($chainId && $web3.eth) {
        const deployedNetwork = IotaHeroGameTokens.networks[$chainId];
        return new $web3.eth.Contract(
            IotaHeroGameTokens.abi, deployedNetwork.address, {});
    }
    return null;
})
export const trade = derived([web3, chainId], ([$web3, $chainId]) => {  
    if ($chainId && $web3.eth) {
        const deployedNetwork = IotaHeroTokenTrade.networks[$chainId];
        return new $web3.eth.Contract(
            IotaHeroTokenTrade.abi, deployedNetwork.address);
    }
    return null;
})

