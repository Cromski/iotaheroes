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

<h1>IotaHeroes Market</h1>
{#await getTradesPromise}
  <p>Getting trades..</p>
{:then trades}
  <div class=" my-5 flex flex-wrap">
    {#each trades as trade, i}
      <HeroListing
        tradeId={trade.tradeId}
        price={trade.price}
        heroId={trade.itemId}
        buyFunction={tradeFulfiller}
      />
    {/each}
  </div>
{/await}
