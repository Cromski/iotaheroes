<script>
  import { getAllItems } from "../contractHelpers/tokenFunctions";

  export let select;
  let selected = "";
  $: allItemsPromise = getAllItems();
</script>

{#await allItemsPromise}
  <p>Getting items...</p>
{:then items}
  <select
    bind:value={selected}
    on:change={() => (selected !== "" ? select(selected) : "")}
  >
    <option value={""}>Select an item</option>
    {#each items as item, i}
      <option value={item.id}>{item.name}</option>
    {/each}
  </select>
{/await}
