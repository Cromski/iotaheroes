<script>
  import { selectedAccount } from "svelte-web3";
  import { hero, adventure } from "../stores/contract_stores";
  import { getHero } from "../contractHelpers/heroFunctions";
  import { goAdventure } from "../contractHelpers/adventureFunctions";
  import HeroSummary from "../components/Hero/HeroSummary.svelte";
  import HeroActionTabs from "../components/Hero/HeroActionTabs.svelte";
  import UserLink from "../components/UserLink.svelte";

  export let params = {};
  let id = params.id;
  $: heroPromise = $hero ? getHeroAux() : "";
  let getHeroAux = async () => getHero(id, $hero, $adventure);

  async function GoAdventure(heroId, equipment) {
    await goAdventure(heroId, equipment, $adventure, $selectedAccount);
    heroPromise = getHeroAux();
  }
  function refreshHeroData() {
    heroPromise = getHeroAux();
  }
</script>

{#await heroPromise}
  <h2>Getting hero...</h2>
{:then hero}
  <HeroSummary {hero} />

  {#if hero.owner.toLowerCase() === $selectedAccount}
    <HeroActionTabs {hero} {refreshHeroData} adventureFunction={GoAdventure} />
  {:else}
    <div>This hero is owned by: <UserLink userSearchTerm={hero.owner} /></div>
  {/if}
{/await}
