<script>
  import { items } from "../../stores/all_items_store";
  export let select;
  let selected = "";
</script>

<select
  bind:value={selected}
  on:change={() => (selected !== "" ? select(selected) : "")}
>
  <option value={""}>Select an item</option>
  {#each Object.entries($items) as itemList, i}
    <optgroup label={itemList[0]}>
      {#each itemList[1] as item, i}
        <option group value={item.id}>{item.name}</option>
      {/each}
    </optgroup>
  {/each}
</select>
