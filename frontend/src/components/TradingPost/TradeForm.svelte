<script>
  import { inventory } from "../../stores/inventory_store";
  import Item from "../Item.svelte";
  import ItemSelector from "./ItemSelector.svelte";
  export let createTrade;

  let chosenItems = [];
  let chosenItemAmounts = [];
  let wantedItems = [0];
  let wantedAmounts = [0];

  const pickItem = (id) => {
    console.log(id);
    if (!chosenItems.includes(id)) {
      chosenItems = [...chosenItems, id];
      chosenItemAmounts = [...chosenItemAmounts, 0];
    } else {
      let newArr = [...chosenItems];
      newArr.splice(chosenItems.indexOf(id), 1);
      let newAmountsArr = [...chosenItemAmounts];
      newAmountsArr.splice(chosenItems.indexOf(id), 1);
      chosenItemAmounts = newAmountsArr;
      chosenItems = newArr;
    }
  };
  const pickItemWanted = (id) => {
    console.log(id);
    if (!wantedItems.includes(id)) {
      wantedItems = [...wantedItems, id];
      wantedAmounts = [...wantedAmounts, 0];
    } else {
      let newArr = [...wantedItems];
      newArr.splice(wantedItems.indexOf(id), 1);
      let newAmountsArr = [...wantedAmounts];
      newAmountsArr.splice(wantedItems.indexOf(id), 1);
      wantedAmounts = newAmountsArr;
      wantedItems = newArr;
    }
  };

  function createTradeAux() {
    createTrade(
      chosenItems.map((a) => a.itemId),
      chosenItemAmounts,
      wantedItems,
      wantedAmounts
    );
  }
</script>

<div class="flex justify-center">
  {#each $inventory as item, i}
    <Item clickItem={pickItem} {item} />
  {/each}
</div>
<section>
  <div class="flex">
    <div class="min-h-[100px] w-[50%] border-[1px] border-solid">
      <div class="mx-auto">
        <strong>Select the items you want to trade</strong>
      </div>
      <div class="mt-[30px]">
        {#each chosenItems as item, i}
          <div class=" m-[10px] flex justify-center">
            <!--/*border-2 border-black*/-->
            <img
              on:click={() => pickItem(item)}
              class="mr-2"
              width="35px"
              alt={"pic"}
              src={"process.env.API_URL" + "/Item/" + item.itemId + ".png"}
            />
            <input type="hidden" value={item.itemId} />
            <input
              type="number"
              max={inventory[item.amount]}
              class=" min-w-[20%] h-9 my-auto text-center text-xl"
              min="0"
              placeholder="Amount"
              bind:value={chosenItemAmounts[i]}
            />
          </div>
        {/each}
      </div>
    </div>

    <div style="min-height:100px;width:50%;border-width:1px;border-style:solid">
      <div class="mx-auto">
        <strong>Select the items you are looking for</strong>
      </div>
      <div class="mt-[10px]">
        <!--/*border-2 border-black*/-->
        <div><ItemSelector select={pickItemWanted} /></div>
        {#each wantedItems as item, i}
          {console.log(item)}
          <div class="m-[10px] flex justify-center">
            <img
              on:click={() => pickItemWanted(item)}
              class="mr-2"
              width="35px"
              alt={"pic"}
              src={"process.env.API_URL" + "/Item/" + item + ".png"}
            />
            <input type="hidden" value={item} />
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
