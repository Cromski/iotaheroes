<script>
  import Item from "../Item.svelte";
  import { items } from "../../stores/all_items_store";

  export let creator;
  export let itemIdsForSale;
  export let amountsForSale;
  export let itemIdsWanted;
  export let amountsWanted;
  export let tradefulfiller;
  export let tradeId;
  export let status;

  let findItem = (id) => {
    Object.entries($items).forEach((itemList, i) => {
      console.log($items);
      let item = itemList[1].find((a) => a.id == id);
      console.log(item);
      if (item !== undefined) {
        return item;
      }
    });
  };
</script>

<div style="display:flex">
  <h4>Trade created by {creator}</h4>
  <div>
    <h5>Items for sale</h5>
    {#each itemIdsForSale as itemId, i}
      <Item item={findItem(itemId)} />
    {/each}
  </div>
  <div>
    <h5>Items wanted</h5>
    {#each itemIdsWanted as itemId, i}
      <Item qty={amountsWanted[i]} {itemId} />
    {/each}
  </div>
</div>
<button on:click={() => tradefulfiller(tradeId)}>Fulfill trade</button>
