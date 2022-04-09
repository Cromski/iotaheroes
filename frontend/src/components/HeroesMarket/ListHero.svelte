<script>
  import {
    isApprovedForAll,
    approveAll,
  } from "../../contractHelpers/heroFunctions";
  import {
    listTrade,
    getTradeForItemId,
    cancelTrade,
  } from "../../contractHelpers/heroMarketFunctions";
  import { selectedAccount } from "svelte-web3";
  import { hero, heromarket, trade } from "../../stores/contract_stores";
  import ListHeroForm from "./ListHeroForm.svelte";
  export let heroId;
  $: approvedStatus = $hero && $heromarket ? isApprovedForAllAux() : "";
  $: heroSale = $hero && $heromarket ? getTradeForItemIdAux() : "";
  let getTradeForItemIdAux = async () => getTradeForItemId(heroId, $heromarket);
  let isApprovedForAllAux = async () =>
    isApprovedForAll($heromarket, $hero, $selectedAccount);

  async function approveAllAux() {
    await approveAll($heromarket, $hero, $selectedAccount);
    approvedStatus = isApprovedForAllAux();
  }
  async function createTrade(itemId, price) {
    await listTrade(itemId, price, $heromarket, $selectedAccount);
    heroSale = getTradeForItemIdAux();
  }
  async function cancelTradeAux(tradeId) {
    await cancelTrade(tradeId, $heromarket, $selectedAccount);
    heroSale = getTradeForItemIdAux();
  }
</script>

{#await heroSale}
  <p>Checking if hero is already for sale..</p>
{:then trade}
  {#if trade == null}
    {#await approvedStatus}
      <p>Checking approval status...</p>
    {:then isApproved}
      {#if !isApproved}
        <p>
          Before you can create hero listings on, you must approve the
          marketplace to use your heroes
        </p>
        <button class="btn-sm btn-orange" on:click={approveAllAux}
          >Approve</button
        >
      {:else}
        <ListHeroForm listHeroFunction={createTrade} update={false} {heroId} />
      {/if}
    {/await}
  {:else}
    <p>Your hero is already for sale for: <strong>{trade.price}</strong></p>
    <ListHeroForm listHeroFunction={createTrade} update={true} {heroId} />
    <button
      class="btn-sm btn-orange"
      on:click={() => cancelTradeAux(trade.tradeId)}>Cancel listing</button
    >
  {/if}
{/await}
