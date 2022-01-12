import { hero } from "./contract_stores";
import { derived,writable } from 'svelte/store';
import {selectedAccount} from 'svelte-web3'

export const reset = writable(0)
export const getHeroes = derived([reset,hero, selectedAccount], async ([$reset,$hero, $selectedAccount]) => {  
    if ($hero) {
        const response = await $hero.methods.getOwnerHeroes($selectedAccount).call();
        return response;      
    }
    return null;
})

export const getHero = derived([reset,hero], async ([$reset,$hero]) => {  
    if ($hero) {
        const response = await $hero.methods.heroes(1).call();
        return response;      
    }
    return null;
})
//  export const spawnHero = ()  => {  
//     const unsub1 = hero.subscribe(($hero) => {
//         const unsub2 = selectedAccount.subscribe(async ($selectedAccount) => {
//                 await $hero.methods.spawnHero().send({ from: $selectedAccount });
//                 unsub2();
//             })
//         });    
//     unsub1();
//  }

