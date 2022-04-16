<script>
  import { inventory } from "../stores/inventory_store";
  import Item from "./Item.svelte";
</script>

<h2>Your inventory</h2>
<div class="grid grid-cols-6">
  {#each $inventory as item, i}
    <Item {item} />
  {/each}
</div>
