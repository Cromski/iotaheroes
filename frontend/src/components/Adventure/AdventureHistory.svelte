<script>
  import { adventure } from "../../stores/contract_stores";
  import { getCompletedAdventures } from "../../contractHelpers/adventureFunctions";
  import AdventureHistoryItem from "./AdventureHistoryItem.svelte";
  export let heroId;
  $: eventPromise = $adventure ? getCompletedAdventuresAux() : "";
  let getCompletedAdventuresAux = async () =>
    getCompletedAdventures(heroId, $adventure);
</script>

{#await eventPromise}
  <h2>Gathering events for this hero...</h2>
{:then events}
  {#each events as event, i}
    <AdventureHistoryItem
      id={event.returnValues.adventureId}
      heroId={event.returnValues.heroId}
      player={event.returnValues.player}
    />
  {/each}
{/await}
