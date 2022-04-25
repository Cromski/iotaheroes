<script>
  import { selectedAccount } from "svelte-web3";
  import { hero, adventure } from "../stores/contract_stores";
  import {
    getHero,
    getHeroesSimple,
    getHeroes,
  } from "../contractHelpers/heroFunctions";
  import { goAdventure } from "../contractHelpers/adventureFunctions";
  import HeroSummary from "../components/Hero/HeroSummary.svelte";
  import HeroActionTabs from "../components/Hero/HeroActionTabs.svelte";
  import UserLink from "../components/UserLink.svelte";
  import { push } from "svelte-spa-router";

  export let params = {};
  let id = params.id;
  // when id param changes, reload hero
  $: (id = params.id),
    ((heroPromise = getHeroAux()), (heroesForAddressPromise = getHeroesAux()));
  $: heroPromise = $hero ? getHeroAux() : "";

  $: heroesForAddressPromise = $hero ? getHeroesAux() : [];

  let getHeroesAux = async () => {
    var heroResult = await heroPromise;
    var heroes = await getHeroes($hero, $adventure, heroResult.owner);
    let heroesCount = heroes.length;
    if (heroesCount < 2) {
      return { left: null, right: null };
    } else {
      var currentIndex = heroes.findIndex((obj) => {
        return obj.id === id;
      });
      if (currentIndex === 0) {
        return { left: null, right: heroes[1] };
      } else if (currentIndex === heroesCount) {
        return { left: heroes[currentIndex - 1], right: null };
      } else {
        return {
          left: heroes[currentIndex - 1],
          right: heroes[currentIndex + 1],
        };
      }
    }
  };
  let getHeroAux = async () => getHero(id, $hero, $adventure);

  async function GoAdventure(heroId, equipment) {
    await goAdventure(heroId, equipment, $adventure, $selectedAccount);
    heroPromise = getHeroAux();
  }
  function refreshHeroData() {
    heroPromise = getHeroAux();
  }
</script>

{#await heroesForAddressPromise then heroesForAddress}
  {#if heroesForAddress.left != null}
    <div
      on:click={() => push("/hero/" + heroesForAddress.left.id)}
      class="cursor-pointer absolute left-2 top-40 inline-flex"
    >
      <img width="30px" src="/images/left.png" alt="left" /><span>
        #{heroesForAddress.left.id}</span
      >
    </div>
  {/if}
  {#if heroesForAddress.right != null}
    <div
      on:click={() => push("/hero/" + heroesForAddress.right.id)}
      class="cursor-pointer absolute right-2 top-40 inline-flex"
    >
      <img width="30px" src="/images/right.png" alt="right" /><span>
        #{heroesForAddress.right.id}</span
      >
    </div>
  {/if}
{/await}
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
