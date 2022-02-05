<script>
  import Time from "svelte-time";
  export let hero;
</script>

<div class="grid justify-items-center">
  <img
    class="outline outline-offset-2 outline-4 justify-self-auto"
    src="https://www.gravatar.com/avatar/{hero.dna}?s=150&d=identicon"
    alt="avatar"
    style="border-style:solid"
  />
  <ul style="list-style:none;padding:25px">
    <li>id: {hero.id}</li>
    <!-- <li>dna: {dna}</li> -->
    <li>HP: {hero.constitution}</li>
    <li>Strength: {hero.strength}</li>
    <li>Agility: {hero.agility}</li>
    <li>Intelligence: {hero.intelligence}</li>
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
