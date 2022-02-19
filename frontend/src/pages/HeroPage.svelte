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
  import HeroActionTabs from "../components/HeroActionTabs.svelte";
  export let currentRoute;
  let id = currentRoute.namedParams.id;
  // console.log("Api url", process.env.API_URL);
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
  function refreshHeroData() {
    console.log("Queued hero for refresh");
    heroPromise = getHeroAux();
  }
</script>

{#await heroPromise}
  <h2>Getting hero...</h2>
{:then hero}
  <HeroSummary {hero} />
  <HeroActionTabs {hero} {refreshHeroData} adventureFunction={GoAdventure} />
{/await}

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
