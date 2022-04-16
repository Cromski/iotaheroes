<script>
  import TrainingFacility from "./TrainingFacility.svelte";
  export let facility;
  export let trainFunction;
  export let heroIsReadyToTrain;
</script>

<div class="m-2">
  <TrainingFacility {facility} />
  <button
    disabled={!heroIsReadyToTrain ? "disabled" : ""}
    class="btn btn-orange"
    on:click={() => trainFunction(facility.id)}>Train!</button
  >
</div>
