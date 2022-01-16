<script>
  import {
    getTokenUri,
    isApprovedForAll,
    approveAll,
  } from "../contractHelpers/tokenFunctions";
  import {
    fulfillTrade,
    getPastTrades,
    setTradeOffer,
  } from "../contractHelpers/tradeFunctions";
  import { selectedAccount } from "svelte-web3";
  import { trade, token } from "../contract_stores";
  import TradeForm from "../components/TradeForm.svelte";
  import Trade from "../components/Trade.svelte";

  $: getTradesPromise = $trade ? getPastTradesAux() : "";
  $: approvedStatus = $token && $trade ? isApprovedForAllAux() : "";
  $: uriPromise = $token ? getTokenUri($token) : "";

  let getPastTradesAux = async () => getPastTrades($trade);
  let isApprovedForAllAux = async () =>
    isApprovedForAll($trade, $token, $selectedAccount);

  async function createTrade(
    itemIdsForSale,
    amountsForSale,
    itemIdsWanted,
    amountsWanted
  ) {
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

<h1>IotaHeroes Trading Post</h1>
{#await approvedStatus}
  <p>Checking approval status...</p>
{:then isApproved}
  {#if !isApproved}
    <p>
      Before you can trade on the trading post, you must approve the marketplace
      to use your tokens
    </p>
    <button on:click={approveAllAux}>Approve</button>
  {:else}
    <p>
      You have approved the trade contract and are able to trade on the
      marketplace
    </p>
    <TradeForm {createTrade} {trade} {token} />
  {/if}
{/await}
{#await getTradesPromise}
  <p>Getting trades..</p>
{:then trades}
  {#await uriPromise}
    <p>Getting token uri</p>
  {:then _uri}
    {#each trades as trade, i}
      <Trade
        status={trade.tradeStatus}
        tradeId={trade.tradeId}
        uri={_uri}
        tradefulfiller={tradeFulfiller}
        creator={trade.tradeInitiator}
        itemIdsForSale={trade.tokenIdsForSale}
        amountsForSale={trade.amountsToSell}
        itemIdsWanted={trade.tokenIdsWanted}
        amountsWanted={trade.amountsWanted}
      />
    {/each}
  {/await}
{/await}
