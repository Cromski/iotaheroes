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
    console.log(id);
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
    <div class="flex justify-center">
      {#each inventory as item, i}
        {#if item != "0"}
          <Item clickItem={pickItem} qty={item} itemId={i} uri={_uri} />
        {/if}
      {/each}
    </div>
    <section>
      <div class="flex">
        <div class="min-h-[100px] w-[50%] border-[1px] border-solid">
          <div class="mx-auto">
            <strong>Select the items you want to trade</strong>
          </div>
          <div class="mt-[30px]">
            {#each chosenItemIds as itemId, i}
              <div class=" m-[10px] flex justify-center">
                <!--/*border-2 border-black*/-->
                <img
                  on:click={() => pickItem(itemId)}
                  class="mr-2"
                  width="35px"
                  alt={"pic"}
                  src={"process.env.API_URL" + "/Item/" + itemId + ".png"}
                />
                <input type="hidden" value={itemId} />
                <input
                  type="number"
                  max={inventory[itemId]}
                  class=" min-w-[20%] h-9 my-auto text-center text-xl"
                  min="0"
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
          <div class="mx-auto">
            <strong>Select the items you are looking for</strong>
          </div>
          <div class="mt-[10px]">
            <!--/*border-2 border-black*/-->
            <div><ItemSelector select={pickItemWanted} /></div>
            {#each wantedItemIds as itemId, i}
              <div class="m-[10px] flex justify-center">
                <img
                  on:click={() => pickItemWanted(itemId)}
                  class="mr-2"
                  width="35px"
                  alt={"pic"}
                  src={"process.env.API_URL" + "/Item/" + itemId + ".png"}
                />
                <input type="hidden" value={itemId} />
                <input
                  type="number"
                  class="min-w-[20%] h-9 my-auto text-center text-xl"
                  placeholder="Amount"
                  min="0"
                  bind:value={wantedAmounts[i]}
                />
              </div>
            {/each}
          </div>
        </div>
        <button class="btn-sm btn-orange" on:click={() => createTradeAux()}
          >Create trade!</button
        >
      </div>
    </section>
  {/await}
{/await}
