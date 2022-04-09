<script>
  import { hero, adventure } from "../../stores/contract_stores";
  import { getHero } from "../../contractHelpers/heroFunctions";
  import HeroSummarySmall from "../HeroSummarySmall.svelte";
  import { link, push } from "svelte-spa-router";

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
  <div
    class="hover:shadow-2xl shadow-black cursor-pointer hover:-translate-y-1 hover:scale-110  transition ease-in-out m-2 outline outline-offset-2 outline-2 relative pb-5"
    on:click={() => push("/heromarket/" + tradeId)}
  >
    <HeroSummarySmall {hero} />
    <span class="absolute right-0"><strong>{price}</strong>i</span>
  </div>
{/await}
