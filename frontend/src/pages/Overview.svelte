<script>
  import { getInventory, getTokensUri } from "../tokenStore";
  import { getHeroes, reset } from "../heroStore";
  import { hero } from "../contract_stores";
  import HeroSummary from "../components/HeroSummary.svelte";
  import Item from "../components/Item.svelte";
  import { selectedAccount } from "svelte-web3";

  $: uriPromise = $getTokensUri;
  $: inventoryPromise = $getInventory;
  $: heroesPromise = $getHeroes;

  async function spawnHero() {
    await $hero.methods.spawnHero().send({ from: $selectedAccount });
    reset.update((n) => n + 1);
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
  <button on:click={spawnHero}>Spawn a new hero</button>
</div>
