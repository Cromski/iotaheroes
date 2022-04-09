<script>
  import { getAdventure } from "../../contractHelpers/adventureFunctions";
  import AdventureReplay from "./AdventureReplay.svelte";

  export let id;
  export let heroId;
  export let player;

  $: adventurePromise = getAdventure(id);
</script>

{#await adventurePromise}
  <p>Getting adventure...</p>
{:then adventure}
  <AdventureReplay {adventure} />
{/await}
