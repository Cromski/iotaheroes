<script>
  import {
    fulfillTrade,
    getOpenTrades,
  } from "../contractHelpers/heroMarketFunctions";
  import { selectedAccount } from "svelte-web3";
  import { heromarket } from "../contract_stores";
  import HeroListing from "../components/HeroesMarket/HeroListing.svelte";

  $: getTradesPromise = $heromarket ? getOpenTradesAux() : "";

  let getOpenTradesAux = async () => getOpenTrades($heromarket);

  async function tradeFulfiller(id, price) {
    await fulfillTrade(id, price, $heromarket, $selectedAccount);
    getTradesPromise = getOpenTradesAux();
  }
</script>

<h2>IotaHeroes Market</h2>
{#await getTradesPromise}
  <p>Getting trades..</p>
{:then trades}
  <h2>Hero listings:</h2>
  {#each trades as trade, i}
    <HeroListing
      tradeId={trade.tradeId}
      price={trade.price}
      heroId={trade.itemId}
      buyFunction={tradeFulfiller}
    />
  {/each}
{/await}
