<script>
  import { selectedAccount } from "svelte-web3";
  import Time from "svelte-time";

  import { facility } from "../contract_stores";
  import {
    getFacilities,
    trainAtFacility,
    heroReadyToTrainAt,
  } from "../contractHelpers/facilityFunctions";
  import TrainingFacilityTraining from "../components/TrainingFacilityTraining.svelte";
  export let hero;
  let id = hero.id;
  export let refreshHeroData;

  $: facilityPromise = $facility ? getFacilitiesAux() : "";
  $: heroReadyPromise = $facility ? getHeroReadyAux() : "";

  let getFacilitiesAux = async () =>
    getFacilities($facility, $selectedAccount, true);
  let getHeroReadyAux = async () => heroReadyToTrainAt($facility, id);

  async function train(facilityId) {
    await trainAtFacility(id, facilityId, $facility, $selectedAccount);
    refreshHeroData();
    facilityPromise = getFacilitiesAux();
    heroReadyPromise = getHeroReadyAux();
  }
</script>

{#await heroReadyPromise}
  <p>Checking if hero is ready to train..</p>
{:then heroReadyAt}
  {#if heroReadyAt < Date.now() / 1000}
    <p>Hero is ready to train!</p>
  {:else}
    <p>
      Hero is ready <Time
        live={1 * 1000}
        relative
        timestamp={heroReadyAt * 1000}
      />
    </p>
  {/if}
  {#await facilityPromise}
    <p>Getting your facilities...</p>
  {:then facilities}
    {#if facilities.length != 0}
      {#key facilityPromise}
        <div class="flex flex-wrap justify-center mt-10">
          <button on:click={() => refreshHeroData()}>tester</button>
          {#each facilities as facility}
            <TrainingFacilityTraining
              {facility}
              trainFunction={train}
              heroIsReadyToTrain={heroReadyAt < Date.now() / 1000}
            />
          {/each}
        </div>
      {/key}
    {:else}
      You have no facilities yet, buy some!
    {/if}
  {/await}
{/await}
