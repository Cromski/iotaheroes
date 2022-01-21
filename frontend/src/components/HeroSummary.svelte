<script>
  import Time from "svelte-time";
  export let id;
  export let dna;
  export let constitution;
  export let strength;
  export let agility;
  export let intelligence;
  export let restingTill;
  export let heroAdventuring;
</script>

<div class="grid justify-items-center">
  <img
    class="outline outline-offset-2 outline-4 justify-self-auto"
    src="https://www.gravatar.com/avatar/{dna}?s=150&d=identicon"
    alt="avatar"
    style="border-style:solid"
  />
  <ul style="list-style:none;padding:25px">
    <li>id: {id}</li>
    <!-- <li>dna: {dna}</li> -->
    <li>HP: {constitution}</li>
    <li>Strength: {strength}</li>
    <li>Agility: {agility}</li>
    <li>Intelligence: {intelligence}</li>
    <li>
      Ready: <strong
        ><Time
          live={1 * 1000}
          relative
          timestamp={restingTill * 1000}
        /></strong
      >
    </li>
    {#if heroAdventuring}
      <li>Hero is currently on an adventure...</li>
    {:else}
      <!-- <li>Hero is not on any adventure</li> -->
    {/if}
  </ul>
</div>
