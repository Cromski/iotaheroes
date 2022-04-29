<script>
  import {
    isApprovedForAll,
    approveAll,
  } from "../contractHelpers/tokenFunctions";
  import {
    fulfillTrade,
    getPastTrades,
    setTradeOffer,
  } from "../contractHelpers/tradeFunctions";
  import { selectedAccount } from "svelte-web3";
  import { trade, token } from "../stores/contract_stores";
  import TradeForm from "../components/TradingPost/TradeForm.svelte";
  import Trade from "../components/TradingPost/Trade.svelte";

  $: getTradesPromise = $trade ? getPastTradesAux() : "";
  $: approvedStatus = $token && $trade ? isApprovedForAllAux() : "";

  let getPastTradesAux = async () => getPastTrades($trade);
  let isApprovedForAllAux = async () =>
    isApprovedForAll($trade, $token, $selectedAccount);

  async function createTrade(
    itemIdsForSale,
    amountsForSale,
    itemIdsWanted,
    amountsWanted
  ) {
    console.log(itemIdsForSale);
    await setTradeOffer(
      itemIdsForSale,
      amountsForSale,
      itemIdsWanted,
      amountsWanted,
      $trade,
      $selectedAccount
    );
    getTradesPromise = getPastTradesAux();
  }
  async function tradeFulfiller(id) {
    await fulfillTrade(id, $trade, $selectedAccount);
    getTradesPromise = getPastTradesAux();
  }

  async function approveAllAux() {
    await approveAll($trade, $token, $selectedAccount);
    approvedStatus = isApprovedForAllAux();
  }
</script>

<h2>IotaHeroes Trading Post</h2>
{#await approvedStatus}
  <p>Checking approval status...</p>
{:then isApproved}
  {#if !isApproved}
    <p>
      Before you can trade on the trading post, you must approve the marketplace
      to use your tokens
    </p>
    <button class="btn-sm btn-orange" on:click={approveAllAux}>Approve</button>
  {:else}
    <p>
      You have approved the trade contract and are able to trade on the
      marketplace
    </p>
    <TradeForm {createTrade} {trade} {token} />
  {/if}

  {#await getTradesPromise}
    <p>Getting trades..</p>
  {:then trades}
    {#each trades as trade, i}
      <Trade {trade} approved={isApproved} tradefulfiller={tradeFulfiller} />
    {/each}
  {/await}
{/await}
