<script>
  import { getAdventure } from "../../contractHelpers/adventureFunctions";
  import { getTokenUri } from "../../contractHelpers/tokenFunctions";
  import { token } from "../../contract_stores";

  import AdventureReplay from "./AdventureReplay.svelte";

  export let id;
  export let heroId;
  export let player;

  $: uriPromise = $token ? getTokenUri($token) : "";
  $: adventurePromise = getAdventure(id);
</script>

{#await adventurePromise}
  <p>Getting adventure...</p>
{:then adventure}
  {#await uriPromise}
    <p>Getting token uri..</p>
  {:then tokenUri}
    <AdventureReplay {tokenUri} {adventure} />
  {/await}
{/await}
