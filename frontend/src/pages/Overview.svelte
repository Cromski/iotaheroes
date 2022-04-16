<script>
  import { getHeroes, spawnHero } from "../contractHelpers/heroFunctions";
  import { adventure, hero } from "../stores/contract_stores";
  import { selectedAccount } from "svelte-web3";
  import HeroSummarySmall from "../components/Hero/HeroSummarySmall.svelte";
  import { push } from "svelte-spa-router";
  $: heroesPromise = $hero ? getHeroesAux() : "";

  let getHeroesAux = async () => getHeroes($hero, $adventure, $selectedAccount);

  async function spawnHeroAux() {
    await spawnHero($hero, $selectedAccount);
    heroesPromise = getHeroesAux();
  }
</script>

{#await heroesPromise}
  <h3>Getting heroes....</h3>
{:then heroes}
  <h1>Your heroes</h1>
  <div class="flex flex-wrap justify-center mt-10">
    {#each heroes as hero, i}
      <div>
        <HeroSummarySmall {hero} />
        <button
          class="btn-sm btn-orange"
          on:click={() => push("/hero/" + hero.id)}>Select hero</button
        >
      </div>
    {/each}
  </div>
{/await}
<div class="mt-10">
  <button class="btn btn-orange" on:click={spawnHeroAux}
    >Spawn a new hero</button
  >
</div>
