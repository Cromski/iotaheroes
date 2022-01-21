<script>
  import { selectedAccount } from "svelte-web3";
  import { hero } from "../contract_stores";
  import {
    getHero,
    getCompletedAdventures,
    goAdventure,
    isAdventuring,
  } from "../contractHelpers/heroFunctions";
  import HeroSummary from "../components/HeroSummary.svelte";
  import Adventure from "../components/Adventure.svelte";
  export let currentRoute;
  let id = currentRoute.namedParams.id;

  $: heroPromise = $hero ? getHeroAux() : "";
  $: eventPromise = $hero ? getCompletedAdventuresAux() : "";
  $: heroAdventuring = $hero ? heroAdventuringAux() : "";
  let heroAdventuringAux = async () => isAdventuring(id, $hero);
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
  <h2>Getting hero....</h2>
{:then hero}
  {#await heroAdventuring}
    <h2>Checking adventure status</h2>
  {:then heroStatus}
    <HeroSummary
      id={hero.id}
      dna={hero.dna}
      constitution={hero.constitution}
      strength={hero.strength}
      agility={hero.agility}
      intelligence={hero.intelligence}
      restingTill={hero.restingTill}
      heroAdventuring={heroStatus}
    />
    <button class="btn btn-orange" on:click={GoAdventure}>Go adventure!</button>
  {/await}
{/await}
<button class="btn btn-orange" on:click={() => goToOverview()}
  >Go back to hero overview</button
>
{#await eventPromise}
  <h2>Gathering events for this hero...</h2>
{:then events}
  {#each events as event, i}
    <Adventure
      id={event.returnValues.adventureId}
      heroId={event.returnValues.heroId}
      player={event.returnValues.player}
    />
  {/each}
{/await}
