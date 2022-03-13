<script>
  import { hero, adventure } from "../../contract_stores";
  import { getHero } from "../../contractHelpers/heroFunctions";
  import HeroSummary from "../HeroSummary.svelte";

  export let tradeId;
  export let heroId;
  export let price;
  export let buyFunction;

  $: heroPromise = $hero ? getHeroAux() : "";
  let getHeroAux = async () => getHero(heroId, $hero, $adventure);
</script>

{#await heroPromise}
  <h2>Getting hero...</h2>
{:then hero}
  <div class="outline outline-offset-2 outline-2 relative">
    <HeroSummary {hero} />
    <span class="absolute right-0"><strong>{price}</strong>i</span>
    <div class="">
      <button
        class="btn btn-orange"
        on:click={() => buyFunction(tradeId, price)}>Buy!</button
      >
    </div>
  </div>
{/await}
