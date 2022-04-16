<script>
  import Item from "../Item.svelte";
  import { items } from "../../stores/all_items_store";
  import { getUsername } from "../../contractHelpers/accountFunctions";
  import { hero } from "../../stores/contract_stores";

  $: getUsernamePromise = $hero ? getUsername($hero, trade.tradeInitiator) : "";

  export let trade;
  export let tradefulfiller;
  let findItem = (itemId, amount) => {
    let newItem;
    Object.entries($items).forEach((itemList, i) => {
      let item = itemList[1].find((a) => a.id == itemId);
      if (item !== undefined) {
        newItem = { amount: amount, ...item };
      }
    });
    return newItem;
  };
</script>

{#if $items !== []}
  {#await getUsernamePromise}
    <p>Getting trade info</p>
  {:then username}
    <div class="m-2 border-2 border-black">
      <div class="text-left">
        Trade created by <strong>{username}</strong>
      </div>

      <div style="display:flex">
        <div>
          <h5 class="underline">Items for sale</h5>
          <div class="inline-flex  m-2 border border-black">
            {#each trade.tokenIdsForSale as itemId, i}
              <Item item={findItem(itemId, trade.amountsToSell[i])} />
            {/each}
          </div>
        </div>
        <div>
          <h5 class="underline">Items wanted</h5>
          <div class="inline-flex m-2 border border-black">
            {#each trade.tokenIdsWanted as itemId, i}
              <Item item={findItem(itemId, trade.amountsWanted[i])} />
            {/each}
          </div>
        </div>
      </div>
      <button
        class="btn-sm btn-orange"
        on:click={() => tradefulfiller(trade.tradeId)}>Fulfill trade</button
      >
    </div>
  {/await}
{/if}
