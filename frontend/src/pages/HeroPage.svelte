<script>
  import { selectedAccount } from "svelte-web3";
  import { hero, adventure } from "../contract_stores";
  import { getHero } from "../contractHelpers/heroFunctions";
  import {
    getCompletedAdventures,
    goAdventure,
  } from "../contractHelpers/adventureFunctions";
  import HeroSummary from "../components/HeroSummary.svelte";
  import Adventure from "../components/Adventure.svelte";
  export let currentRoute;
  let id = currentRoute.namedParams.id;

  $: heroPromise = $hero ? getHeroAux() : "";
  $: eventPromise = $adventure ? getCompletedAdventuresAux() : "";
  let getHeroAux = async () => getHero(id, $hero, $adventure);
  let getCompletedAdventuresAux = async () =>
    getCompletedAdventures(id, $adventure);

  async function GoAdventure() {
    await goAdventure(id, $adventure, $selectedAccount);
    heroPromise = getHeroAux();
    eventPromise = getCompletedAdventuresAux();
  }
  function goToOverview() {
    location.href = "/";
  }
  function goTrain() {
    location.href = "/train/" + id;
  }
</script>

{#await heroPromise}
  <h2>Getting hero...</h2>
{:then hero}
  <HeroSummary {hero} />
  <button
    disabled={hero.isAdventuring ? "disabled" : ""}
    class="btn btn-orange"
    on:click={GoAdventure}>Go adventure!</button
  >
{/await}
<button class="btn btn-orange" on:click={() => goTrain()}>Go train</button>
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
