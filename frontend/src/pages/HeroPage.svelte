<script>
  import { selectedAccount } from "svelte-web3";
  import { hero } from "../contract_stores";
  import {
    getHero,
    getCompletedAdventures,
    goAdventure,
  } from "../contractHelpers/heroFunctions";
  import HeroSummary from "../components/HeroSummary.svelte";
  import Adventure from "../components/Adventure.svelte";
  export let currentRoute;
  let id = currentRoute.namedParams.id;

  $: heroPromise = $hero ? getHeroAux() : "";
  $: eventPromise = $hero ? getCompletedAdventuresAux() : "";

  let getHeroAux = async () => getHero(id, $hero);
  let getCompletedAdventuresAux = async () => getCompletedAdventures(id, $hero);

  async function GoAdventure() {
    await goAdventure(id, $hero, $selectedAccount);
    heroPromise = getHeroAux();
    eventPromise = getCompletedAdventuresAux();
  }
  function goToOverview() {
    location.href = "/";
  }
</script>

{#await heroPromise}
  <h1>Getting hero....</h1>
{:then hero}
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
  <button on:click={GoAdventure}>Go adventure!</button>
{/await}
<button on:click={() => goToOverview()}>Go back to hero overview</button>
{#await eventPromise}
  <h1>Gathering events for this hero...</h1>
{:then events}
  {#each events as event, i}
    <Adventure
      name={event.returnValues.name}
      diceRoll={event.returnValues.rand}
      adventureType={event.returnValues.adventureType}
    />
  {/each}
{/await}
