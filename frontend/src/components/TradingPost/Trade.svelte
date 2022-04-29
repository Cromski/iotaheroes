<script>
  import Item from "../Item.svelte";
  import { selectedAccount } from "svelte-web3";
  import { items } from "../../stores/all_items_store";
  import { getUsername } from "../../contractHelpers/accountFunctions";
  import { hero } from "../../stores/contract_stores";
  import { inventory } from "../../stores/inventory_store";
  import UserLink from "../UserLink.svelte";
  export let trade;
  export let approved;
  export let tradefulfiller;
  $: getUsernamePromise = $hero ? getUsername($hero, trade.tradeInitiator) : "";
  let currentUserOwnsTrade =
    trade.tradeInitiator.toLowerCase() === $selectedAccount;
  $: hasItemsToFulfillPromise =
    $inventory !== [] ? checkIfOwnerHasItems() : false;

  let checkIfOwnerHasItems = () => {
    if ($inventory.length === 0) {
      return false;
    }
    for (let i = 0; i < trade.tokenIdsWanted.length; i++) {
      let itemFound = $inventory.find(
        (item) => item.id.toString() === trade.tokenIdsWanted[i]
      );
      if (itemFound === undefined) {
        return false;
      }
      if (itemFound.amount < trade.amountsWanted[i]) {
        return false;
      }
    }
    return true;
  };
  let findItem = (itemId, amount) => {
    if ($items !== []) {
      let newItem;
      Object.entries($items).forEach((itemList, i) => {
        let item = itemList[1].find((a) => a.id == itemId);
        if (item !== undefined) {
          newItem = { amount: amount, ...item };
        }
      });
      return newItem;
    }
  };
</script>

{#if Object.keys($items).length !== 0}
  {#await getUsernamePromise}
    <p>Getting trade info</p>
  {:then username}
    <div class="m-2 border-2 border-black">
      <div class="text-left">
        Trade created by <UserLink userSearchTerm={username} />
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

      {#await hasItemsToFulfillPromise then hasItemsToFulfill}
        <button
          class="btn-sm btn-orange"
          disabled={currentUserOwnsTrade || !hasItemsToFulfill || !approved}
          title={!approved
            ? "You need to approve the contract first"
            : currentUserOwnsTrade
            ? "This is your own trade!"
            : !hasItemsToFulfill
            ? "You don't have the required items to fulfill the trade"
            : ""}
          on:click={() => tradefulfiller(trade.tradeId)}>Fulfill trade</button
        >
      {/await}
    </div>
  {/await}
{/if}
