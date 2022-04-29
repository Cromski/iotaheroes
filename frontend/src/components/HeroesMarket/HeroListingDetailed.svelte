<script>
  import { hero, adventure } from "../../stores/contract_stores";
  import { getHero } from "../../contractHelpers/heroFunctions";
  import HeroSummary from "../Hero/HeroSummary.svelte";
  import UserLink from "../UserLink.svelte";

  export let trade;
  export let buyFunction;

  $: heroPromise = $hero && trade ? getHeroAux() : "";
  let getHeroAux = async () => getHero(trade.itemId, $hero, $adventure);
</script>

{#await heroPromise}
  <h2>Fetching listing...</h2>
{:then hero}
  <div class="outline outline-offset-2 outline-2 relative m-3">
    <HeroSummary {hero} />
    <div class="absolute top-0 left-0">
      Listed by: <UserLink userSearchTerm={hero.owner} />
    </div>
    <span class="absolute right-0"><strong>{trade.price}</strong>i</span>
    <div class="">
      <button
        class="btn btn-orange"
        on:click={() => buyFunction(trade.tradeId, trade.price)}>Buy!</button
      >
    </div>
  </div>
{/await}
<hr />
