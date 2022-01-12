import { token } from "./contract_stores";
import { derived } from 'svelte/store';
import {selectedAccount} from 'svelte-web3'

export const getTokensUri = derived([token, selectedAccount], async ([$token]) => {  
    if ($token) {
        const response = await $token.methods.uri(0).call();
        return response;          
    }
    return null;
})
export const getInventory = derived([token,selectedAccount], async ([$token, $selectedAccount])  => {  
    if ($token) {
        const response = await $token.methods
            .balanceOfBatch(
            Array(100).fill($selectedAccount),
            Array.from(Array(100).keys())
            )
            .call();
      return response;
    }
    return null
})
