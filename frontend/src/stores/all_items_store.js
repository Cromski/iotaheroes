import { readable, get} from 'svelte/store';
import { getAllItems } from "../apiHelpers/Item";

const getData = async () => {
    console.log("Fetching all items..")
    var allItems = await getAllItems()   
    return allItems;
}

export const items = readable([], function start(set) {
    getData().then(f => set(f));
    return function update() {
        getData().then(f => set(f));
    }
});
