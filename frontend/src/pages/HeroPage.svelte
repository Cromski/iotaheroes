<script>
  import { selectedAccount } from "svelte-web3";
  import { hero } from "../contract_stores";

  import HeroSummary from "../components/HeroSummary.svelte";
  import Adventure from "../components/Adventure.svelte";
  export let currentRoute;
  let id = currentRoute.namedParams.id;

  $: heroPromise = $hero ? getHero() : "";
  $: eventPromise = $hero ? getEvents() : "";

  async function getHero() {
    const response = await $hero.methods.heroes(id).call();
    return response;
  }
  async function getEvents() {
    const response = await $hero.getPastEvents("AdventureCompleted", {
      fromBlock: 0,
      toBlock: "latest",
      filter: { heroId: id },
    });
    return response;
  }

  async function GoAdventure() {
    await $hero.methods.goAdventure(id).send({ from: $selectedAccount });
    heroPromise = getHero();
    eventPromise = getEvents();
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
