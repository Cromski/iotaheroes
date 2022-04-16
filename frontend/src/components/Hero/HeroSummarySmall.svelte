<script>
  import Time from "svelte-time";
  import { getLevelProgress } from "../../util/heroXP";
  import HeroCanvas from "./HeroCanvas.svelte";
  import StatPieSmall from "../StatPieSmall.svelte";
  export let hero;

  var str = getLevelProgress(hero.strength);
  var agi = getLevelProgress(hero.agility);
  var int = getLevelProgress(hero.intelligence);
  var total = str.currentLevel + agi.currentLevel + int.currentLevel;
</script>

<div style="max-width:150px;" class=" my-2 px-1 pt-1 relative">
  <span class="absolute left-0 top-0"><strong>#{hero.id}</strong></span>
  <HeroCanvas {...hero.traits} />

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
  <!-- {#if hero.isAdventuring}
    <span>Hero is currently on an adventure</span>
  {/if} -->
  <div class="w-9 top-0 right-4 absolute">
    <StatPieSmall
      str={str.currentLevel}
      int={int.currentLevel}
      agi={agi.currentLevel}
    />
  </div>
</div>
