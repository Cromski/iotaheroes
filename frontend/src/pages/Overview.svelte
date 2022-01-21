<script>
  import { getHeroes, spawnHero } from "../contractHelpers/heroFunctions";
  import { hero } from "../contract_stores";
  import HeroSummary from "../components/HeroSummary.svelte";
  import { selectedAccount } from "svelte-web3";
  $: heroesPromise = $hero ? getHeroesAux() : "";

  let getHeroesAux = async () => getHeroes($hero, $selectedAccount);

  async function spawnHeroAux() {
    await spawnHero($hero, $selectedAccount);
    inventoryPromise = getInventoryAux();
    heroesPromise = getHeroesAux();
  }
  function goToHeroPage(heroId) {
    location.href = "hero/" + heroId;
  }
</script>

{#await heroesPromise}
  <h3>Getting heroes....</h3>
{:then heroes}
  <h2>Your heroes</h2>
  <div class="flex flex-wrap justify-center mt-10">
    {#each heroes as hero, i}
      <div>
        <HeroSummary
          id={hero.id}
          dna={hero.dna}
          constitution={hero.constitution}
          strength={hero.strength}
          agility={hero.agility}
          intelligence={hero.intelligence}
          restingTill={hero.restingTill}
        />
        <button class="btn-sm btn-orange" on:click={goToHeroPage(hero.id)}
          >Select hero</button
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
