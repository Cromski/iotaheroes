import { readable, get} from 'svelte/store';
import {getInventory} from '../contractHelpers/tokenFunctions'
import {token} from './contract_stores'
import { selectedAccount } from "svelte-web3";
import { getItem } from "../apiHelpers/Item";

const getData = async () => {
    var inv = await getInventory(get(token), get(selectedAccount))
    return inv;
}

export const inventory = readable([], function start(set) {
    getData().then(f => set(f));

    return function update() {
        getData().then(f => set(f));
    }

});
