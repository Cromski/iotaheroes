<script>
  import { form, field } from "svelte-forms";
  import { required } from "svelte-forms/validators";
  import { selectedAccount } from "svelte-web3";
  import Item from "../components/Item.svelte";

  export let token;
  export let trade;
  export let createTrade;

  let inventory;

  $: inventoryPromise = $token ? getInventory() : "";
  $: uriPromise = $token ? getTokensUri() : "";

  const myItemId = field("myItemId", "", [required()]);
  const myAmount = field("myAmount", "", [required()]);

  const wantedItemId = field("wantedItemId", "", [required()]);
  const wantedAmount = field("wantedAmount", "", [required()]);

  const myForm = form(myItemId, myAmount, wantedItemId, wantedAmount);

  function createTradeAux() {
    console.log($myForm);
    const itemIds = Array(1).fill($myItemId.value);
    const amounts = Array(1).fill($myAmount.value);
    const wItemIds = Array(1).fill($wantedItemId.value);
    const wAmounts = Array(1).fill($wantedAmount.value);
    console.log(itemIds, amounts, wItemIds, wAmounts);
    createTrade(itemIds, amounts, wItemIds, wAmounts);
  }

  async function getTokensUri() {
    const response = await $token.methods.uri(0).call();
    return response;
  }

  async function getInventory() {
    const response = await $token.methods
      .balanceOfBatch(
        Array(100).fill($selectedAccount),
        Array.from(Array(100).keys())
      )
      .call();
    return response;
  }
</script>

{#await inventoryPromise}
  <p>Getting your inventory</p>
{:then inventory}
  {#await uriPromise}
    <p>Getting token uri</p>
  {:then _uri}
    {#each inventory as item, i}
      {#if item != "0"}
        <Item qty={item} itemId={i} uri={_uri} />
      {/if}
    {/each}
  {/await}
{/await}
<section>
  <label
    >My item
    <input type="number" bind:value={$myItemId.value} />
  </label>
  <label
    >Amount
    <input type="number" bind:value={$myAmount.value} />
  </label>
  <hr />
  <label>
    Wanted item
    <input type="number" bind:value={$wantedItemId.value} />
  </label>
  <label
    >Wanted qty
    <input type="number" bind:value={$wantedAmount.value} />
  </label>
  <button disabled={!$myForm.valid} on:click={() => createTradeAux()}
    >Send form</button
  >
</section>
