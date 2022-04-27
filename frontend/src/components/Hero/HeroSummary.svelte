<script>
  import Time from "svelte-time";
  import { getLevelProgress } from "../../util/heroXP";
  import XpBar from "../XpBar.svelte";
  import HeroCanvas from "./HeroCanvas.svelte";
  import HelpTooltip from "../General/HelpTooltip.svelte";

  export let hero;
  var str = getLevelProgress(hero.strength);
  var agi = getLevelProgress(hero.agility);
  var int = getLevelProgress(hero.intelligence);
</script>

<div class="flex">
  <div class="flex-auto">
    <div class=" " style="margin-left:auto;max-width:350px;">
      <HeroCanvas {...hero.traits} />
    </div>
  </div>
  <div class="flex-auto">
    <div class="" style="max-width:270px">
      <ul style="list-style:none;">
        <li>id: {hero.id}</li>
        <!-- <li>dna: {dna}</li> -->
        <li>HP: {hero.constitution}</li>
        <li>Strength level: {str.currentLevel}</li>
        <XpBar perc={str.progressTowardsLevel} color={"#853939"} />
        <li>Agility level: {agi.currentLevel}</li>
        <XpBar perc={agi.progressTowardsLevel} color={"#53723d"} />
        <li>Intelligence level: {int.currentLevel}</li>
        <li><XpBar perc={int.progressTowardsLevel} color={"#3f83a7"} /></li>

        <li>
          Ready: <strong
            ><Time
              live={1 * 1000}
              relative
              timestamp={hero.readyToAdventure * 1000}
            /></strong
          >
        </li>
        {#if hero.isAdventuring}
          <h2>Hero is currently on an adventure <HelpTooltip tip={"You have to wait for the adventure to complete before you can go on another!"} /></h2>     

        {/if}
        <li />
      </ul>
    </div>
  </div>
</div>
