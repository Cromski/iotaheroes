<script>
  import Time from "svelte-time";
  import { getLevelProgress } from "../util/heroXP";
  import StatPie from "./StatPie.svelte";
  import StatPieSmall from "./StatPieSmall.svelte";
  export let hero;

  var str = getLevelProgress(hero.strength);
  var agi = getLevelProgress(hero.agility);
  var int = getLevelProgress(hero.intelligence);
  var total = str.currentLevel + agi.currentLevel + int.currentLevel;

  //    src="https://www.gravatar.com/avatar/{hero.dna}?s=150&d=identicon"
  //      src={"process.env.API_URL" + "/hero/" + hero.id}
</script>

<div class=" px-1 pt-1 relative">
  <span class="absolute left-0 top-0"><strong>#{hero.id}</strong></span>
  <img
    class="justify-self-auto w-36"
    src={"process.env.API_URL" + "/hero/" + hero.id}
    alt="avatar"
    style="border-style:solid"
  />
  <span class=""><strong>Total level: {total}</strong></span>
  <!-- <li>
      Ready: <strong
        ><Time
          live={1 * 1000}
          relative
          timestamp={hero.readyToAdventure * 1000}
        /></strong
      >
    </li> -->
  {#if hero.isAdventuring}
    <span>Hero is currently on an adventure</span>
  {/if}
  <div class="w-9 top-0 right-0 absolute">
    <StatPieSmall
      str={str.currentLevel}
      int={int.currentLevel}
      agi={agi.currentLevel}
    />
  </div>
</div>
