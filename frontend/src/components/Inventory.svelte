<script>
  import Item from "./Item.svelte";
  export let inventory;
  export let uri;
  console.log(inventory);
</script>

<h2>Your inventory</h2>
<div class="grid grid-cols-6">
  {#each inventory as item, i}
    {#if item != "0"}
      <Item qty={item} itemId={i} {uri} />
    {/if}
  {/each}
</div>
