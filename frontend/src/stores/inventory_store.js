import { readable, get} from 'svelte/store';
import {getInventory} from '../contractHelpers/tokenFunctions'
import {token} from './contract_stores'
import { selectedAccount } from "svelte-web3";
import { getItem } from "../apiHelpers/Item";

const getData = async () => {
    let t = get(token);
    let sa = get(selectedAccount);
    var inv = await getInventory(get(token), get(selectedAccount))
    let items = []
    await Promise.all(inv.map(async (amount, itemId) => {
        if(amount != 0)
        {
            let metadata = await getItem(itemId);
            items.push({
                amount,
                ...metadata
            });
        }  
    }))
    return items;
}

export const inventory = readable([], function start(set) {
    getData().then(f => set(f));

    return function update() {
        getData().then(f => set(f));
    }

});
