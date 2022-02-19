<script>
  import Time from "svelte-time";
  import { getLevelProgress } from "../util/heroXP";
  export let hero;

  var str = getLevelProgress(hero.strength);
  var agi = getLevelProgress(hero.agility);
  var int = getLevelProgress(hero.intelligence);
  var total = str.currentLevel + agi.currentLevel + int.currentLevel;

  //    src="https://www.gravatar.com/avatar/{hero.dna}?s=150&d=identicon"
  //      src={"process.env.API_URL" + "/hero/" + hero.id}
</script>

<div class="px-3 pt-3">
  <img
    class="outline outline-offset-2 outline-4 justify-self-auto"
    src="https://www.gravatar.com/avatar/{hero.dna}?s=150&d=identicon"
    alt="avatar"
    style="border-style:solid"
  />
  <ul class="p-2" style="list-style:none;">
    <li>id: {hero.id}</li>
    <!-- <li>dna: {dna}</li> -->
    <li>Total level: {total}</li>
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
