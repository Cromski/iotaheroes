<script>
  import StatPie from "../StatPie.svelte";
  import TrainingFacility from "./TrainingFacility.svelte";
  export let facility;
  export let canUpgradeAt;
  export let upgradeFunction;
  export let basePrice;
  $: readyToUpgrade = canUpgradeAt > Date.now() / 1000;
</script>

<div class="m-2" style="">
  <TrainingFacility {facility} />
  <strong
    >Cost to upgrade: {Number(basePrice) * (Number(facility.level) + 1)}</strong
  >
  <div>
    <button
      disabled={readyToUpgrade ? "disabled" : ""}
      class="btn btn-orange"
      on:click={() => upgradeFunction(facility.id, facility.level)}
      >Upgrade!</button
    >
  </div>
</div>
