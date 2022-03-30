<script>
  import Time from "svelte-time";
  import { getLevelProgress } from "../util/heroXP";
  import XpBar from "./XpBar.svelte";
  export let hero;

  var str = getLevelProgress(hero.strength);
  var agi = getLevelProgress(hero.agility);
  var int = getLevelProgress(hero.intelligence);

  console.log(str);
  //    src="https://www.gravatar.com/avatar/{hero.dna}?s=150&d=identicon"
  //      src={"process.env.API_URL" + "/hero/" + hero.id}
</script>

<div class="flex flex-wrap">
  <div class="flex-auto">
    <img
      class="justify-self-auto w-64"
      src={"process.env.API_URL" + "/hero/" + hero.id}
      alt="avatar"
      style="border-style:solid"
    />
  </div>
  <div class="flex-auto">
    <ul style="list-style:none;padding:25px">
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
        <li>Hero is currently on an adventure</li>
      {/if}
      <li />
    </ul>
  </div>
</div>
