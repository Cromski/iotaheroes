<script>
  import { getHeroes, spawnHero } from "../contractHelpers/heroFunctions";
  import { getTokenUri, getInventory } from "../contractHelpers/tokenFunctions";
  import { hero, token } from "../contract_stores";
  import HeroSummary from "../components/HeroSummary.svelte";
  import Item from "../components/Item.svelte";
  import { selectedAccount } from "svelte-web3";

  $: uriPromise = $token ? getTokenUri($token) : "";
  $: inventoryPromise = $token ? getInventoryAux() : "";
  $: heroesPromise = $hero ? getHeroesAux() : "";

  let getHeroesAux = async () => getHeroes($hero, $selectedAccount);
  let getInventoryAux = async () => getInventory($token, $selectedAccount);

  async function spawnHeroAux() {
    await spawnHero($hero, $selectedAccount);
    inventoryPromise = getInventoryAux();
    heroesPromise = getHeroesAux();
  }
  function goToHeroPage(heroId) {
    location.href = "hero/" + heroId;
  }
</script>

<div>
  {#await inventoryPromise}
    <h1>Loading your inventory...</h1>
  {:then inventory}
    {#await uriPromise}
      <h1>Awaiting uri...</h1>
    {:then _uri}
      <h1>Your inventory</h1>
      <div style={"display:flex;justify-content:center"}>
        {#each inventory as item, i}
          {#if item != "0"}
            <Item qty={item} itemId={i} uri={_uri} />
          {/if}
        {/each}
      </div>
      <button on:click={() => (location.href = "trade")}>Start trading!</button>
    {/await}
  {/await}
</div>

{#await heroesPromise}
  <h1>Getting heroes....</h1>
{:then heroes}
  <h1>Your heroes</h1>
  <div style="display:flex;flex-wrap:wrap;justify-content:center">
    {#each heroes as hero, i}
      <div>
        <HeroSummary
          id={hero.id}
          dna={hero.dna}
          xp={hero.xp}
          mental={hero.mental}
          physical={hero.physical}
          level={hero.level}
          restingTill={hero.restingTill}
          debug={hero.debug}
        />
        <button on:click={goToHeroPage(hero.id)}>Select hero</button>
      </div>
    {/each}
  </div>
{/await}
<div>
  <button on:click={spawnHeroAux}>Spawn a new hero</button>
</div>
