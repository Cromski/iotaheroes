<script>
  import { inventory } from "../stores/inventory_store";
  import InventoryItem from "../components/Inventory/InventoryItem.svelte";
  import InventoryItemActions from "../components/Inventory/InventoryItemActions.svelte";

  let activeItem;
</script>

<h2>Your inventory</h2>
<div class="grid grid-cols-6 mx-auto">
  {#each $inventory as item, i}
    <div on:click={() => (activeItem = item)}>
      <InventoryItem {item} />
    </div>
  {/each}
</div>
{#if activeItem}
  <div class="border border-black flex w-2/3  mx-auto p-1">
    <div class="basis-1/2 text-left">
      <div>Name:</div>
      <div><strong>{activeItem.name}</strong></div>
      <img
        class="border-solid mx-auto"
        width="200px"
        alt={activeItem.description}
        src={"items/" + activeItem.id + ".png"}
      />
      <div>Description:</div>
      <div><strong>{activeItem.description}</strong></div>
      <div>Amount: <strong>{activeItem.amount}</strong></div>
      <div>Type: <strong>{activeItem.type}</strong></div>
    </div>
    <div class="basis-1/2 ">
      <InventoryItemActions item={activeItem} />
    </div>
  </div>
{/if}
