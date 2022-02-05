<script>
  import StatPie from "./StatPie.svelte";
  import TrainingFacility from "./TrainingFacility.svelte";
  export let facility;
  export let canUpgradeAt;
  export let upgradeFunction;
  export let basePrice;
  $: readyToUpgrade = canUpgradeAt > Date.now() / 1000;
</script>

<div class="grid justify-items-center">
  <TrainingFacility {facility} />
  <strong
    >Cost to upgrade: {Number(basePrice) * (Number(facility.level) + 1)}</strong
  >
  <button
    disabled={readyToUpgrade ? "disabled" : ""}
    class="btn btn-orange"
    on:click={() => upgradeFunction(facility.id, facility.level)}
    >Upgrade!</button
  >
</div>
