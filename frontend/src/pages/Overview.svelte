<script>
  import { selectedAccount } from "svelte-web3";
  import { hero, token, trade } from "../contract_stores";
  import HeroSummary from "../components/HeroSummary.svelte";
  import Item from "../components/Item.svelte";

  $: uriPromise = $token ? getTokensUri() : "";
  $: inventoryPromise = $token ? getInventory() : "";
  $: heroesPromise = $hero ? getHeroes() : "";

  async function getTokensUri() {
    const response = await $token.methods.uri(0).call();
    return response;
  }

  async function getInventory() {
    const response = await $token.methods
      .balanceOfBatch(
        Array(100).fill($selectedAccount),
        Array.from(Array(100).keys())
      )
      .call();
    return response;
  }

  async function getHeroes() {
    console.log($hero);
    let response = await $hero.methods.getOwnerHeroes($selectedAccount).call();
    return response;
  }

  async function spawnHero() {
    await $hero.methods.spawnHero().send({ from: $selectedAccount });
    heroesPromise = getHeroes();
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
  <div style="display:flex;justify-content:center">
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
