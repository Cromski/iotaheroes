<script>
  import { getTokenUri, getInventory } from "../contractHelpers/tokenFunctions";
  import { selectedAccount } from "svelte-web3";
  import Item from "../components/Item.svelte";
  import ItemSelector from "../components/ItemSelector.svelte";
  export let token;
  export let createTrade;

  let chosenItemIds = [];
  let chosenItemAmounts = [];
  let wantedItemIds = [0];
  let wantedAmounts = [0];

  const pickItem = (id) => {
    if (!chosenItemIds.includes(id)) {
      chosenItemIds = [...chosenItemIds, id];
      chosenItemAmounts = [...chosenItemAmounts, 0];
    } else {
      let newArr = [...chosenItemIds];
      newArr.splice(chosenItemIds.indexOf(id), 1);
      let newAmountsArr = [...chosenItemAmounts];
      newAmountsArr.splice(chosenItemIds.indexOf(id), 1);
      chosenItemAmounts = newAmountsArr;
      chosenItemIds = newArr;
    }
  };
  const pickItemWanted = (id) => {
    if (!wantedItemIds.includes(id)) {
      wantedItemIds = [...wantedItemIds, id];
      wantedAmounts = [...wantedAmounts, 0];
    } else {
      let newArr = [...wantedItemIds];
      newArr.splice(wantedItemIds.indexOf(id), 1);
      let newAmountsArr = [...wantedAmounts];
      newAmountsArr.splice(wantedItemIds.indexOf(id), 1);
      wantedAmounts = newAmountsArr;
      wantedItemIds = newArr;
    }
  };

  $: inventoryPromise = $token ? getInventoryAux() : "";
  $: uriPromise = $token ? getTokenUri($token) : "";

  let getInventoryAux = async () => getInventory($token, $selectedAccount);

  function createTradeAux() {
    createTrade(chosenItemIds, chosenItemAmounts, wantedItemIds, wantedAmounts);
  }
</script>

{#await inventoryPromise}
  <p>Getting your inventory</p>
{:then inventory}
  {#await uriPromise}
    <p>Getting token uri</p>
  {:then _uri}
    <div style="display:flex;justify-content:center">
      {#each inventory as item, i}
        {#if item != "0"}
          <Item clickItem={pickItem} qty={item} itemId={i} uri={_uri} />
        {/if}
      {/each}
    </div>
    <section>
      <div style="display:flex">
        <div
          style="min-height:100px;width:50%;border-width:1px;border-style:solid"
        >
          <div style="position:absolute">
            <strong>Select the items you want to trade</strong>
          </div>
          <div style="margin-top:30px">
            {#each chosenItemIds as itemId, i}
              <div style="margin:10px;display:flex">
                <img
                  on:click={() => pickItem(itemId)}
                  style={"border-style:solid; border-width:1px;vertical-align:middle"}
                  width="35px"
                  alt={"pic"}
                  src={_uri.replace(
                    "json/{id}.json",
                    "image/" + itemId + ".png"
                  )}
                />
                <input type="hidden" value={itemId} />
                <input
                  type="number"
                  max={inventory[itemId]}
                  placeholder="Amount"
                  bind:value={chosenItemAmounts[i]}
                />
              </div>
            {/each}
          </div>
        </div>

        <div
          style="min-height:100px;width:50%;border-width:1px;border-style:solid"
        >
          <div style="position:absolute">
            <strong>Select the items you are looking for</strong>
          </div>
          <div style="margin-top:30px;" />
          {#each wantedItemIds as itemId, i}
            <div style="margin:10px;display:flex">
              <img
                on:click={() => pickItemWanted(itemId)}
                style={"border-style:solid; border-width:1px;vertical-align:middle"}
                width="35px"
                alt={"pic"}
                src={_uri.replace("json/{id}.json", "image/" + itemId + ".png")}
              />
              <input type="hidden" value={itemId} />
              <input
                type="number"
                placeholder="Amount"
                bind:value={wantedAmounts[i]}
              />
            </div>
          {/each}
          <div><ItemSelector select={pickItemWanted} /></div>
        </div>
      </div>
      <button on:click={() => createTradeAux()}>Create trade!</button>
    </section>
  {/await}
{/await}
