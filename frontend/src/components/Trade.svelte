<script>
  import Item from "./Item.svelte";
  export let creator;
  export let itemIdsForSale;
  export let amountsForSale;
  export let itemIdsWanted;
  export let amountsWanted;
  export let uri;
  export let tradefulfiller;
  export let tradeId;
  export let status;
</script>

<div style="display:flex">
  <h4>Trade created by {creator}</h4>
  <div>
    <h5>Items for sale</h5>
    {#each itemIdsForSale as itemId, i}
      <Item qty={amountsForSale[i]} {itemId} {uri} />
    {/each}
  </div>
  <div>
    <h5>Items wanted</h5>
    {#each itemIdsWanted as itemId, i}
      <Item qty={amountsWanted[i]} {itemId} {uri} />
    {/each}
  </div>
</div>
<button on:click={() => tradefulfiller(tradeId)}>Fulfill trade</button>
