<script>
  import { selectedAccount } from "svelte-web3";
  import { hero, adventure } from "../contract_stores";
  import { getHero } from "../contractHelpers/heroFunctions";
  import { goAdventure } from "../contractHelpers/adventureFunctions";
  import HeroSummary from "../components/HeroSummary.svelte";
  import HeroActionTabs from "../components/HeroActionTabs.svelte";
  export let currentRoute;
  let id = currentRoute.namedParams.id;
  $: heroPromise = $hero ? getHeroAux() : "";
  let getHeroAux = async () => getHero(id, $hero, $adventure);

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
