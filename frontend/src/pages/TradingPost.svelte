<script>
  import { selectedAccount } from "svelte-web3";
  import { trade, token } from "../contract_stores";
  import TradeForm from "../components/TradeForm.svelte";
  import Trade from "../components/Trade.svelte";

  $: getTradesPromise = $trade ? getPastTrades() : "";
  $: approvedStatus = $token && $trade ? isApprovedForAll() : "";
  $: uriPromise = $token ? getTokensUri() : "";

  async function getTokensUri() {
    const response = await $token.methods.uri(0).call();
    return response;
  }
  async function createTrade(
    itemIdsForSale,
    amountsForSale,
    itemIdsWanted,
    amountsWanted
  ) {
    await $trade.methods
      .setTradeOffer(
        itemIdsForSale,
        amountsForSale,
        itemIdsWanted,
        amountsWanted
      )
      .send({ from: $selectedAccount });
    getTradesPromise = await getPastTrades();
  }

  async function tradeFulfiller(id) {
    await $trade.methods.fulfillTradeOffer(id).send({ from: $selectedAccount });
    getTradesPromise = await getPastTrades();
  }
  async function isApprovedForAll() {
    console.log($trade);
    const response = await $token.methods
      .isApprovedForAll($selectedAccount, $trade._address)
      .call();
    return response;
  }
  async function approveAll() {
    await $token.methods
      .setApprovalForAll($trade._address, true)
      .send({ from: $selectedAccount });
    approvedStatus = await isApprovedForAll();
  }
  async function getPastTrades() {
    const response = await $trade.methods.getOpenTrades().call();
    console.log(response[0]);
    return response;
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
    <button on:click={approveAll}>Approve</button>
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
