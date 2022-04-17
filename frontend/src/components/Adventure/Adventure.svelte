<script>
  import AdventureHistory from "./AdventureHistory.svelte";
  import EquipForAdventure from "./EquipForAdventure.svelte";
  export let hero;
  export let adventureFunction;
</script>

<EquipForAdventure {hero} {adventureFunction} />
<AdventureHistory heroId={hero.id} />
