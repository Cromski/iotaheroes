<script>
  import { selectedAccount } from "svelte-web3";
  import { facility, token } from "../contract_stores";
  import {
    getBasePrice,
    getFacilities,
    upgradeFacilityById,
    addressReadyToUpgradeAt,
  } from "../contractHelpers/facilityFunctions";
  import Time from "svelte-time";

  import {
    isApprovedForAll,
    approveAll,
  } from "../contractHelpers/tokenFunctions";
  import TrainingFacilityUpgrades from "../components/TrainingFacilityUpgrades.svelte";

  $: facilityPromise = $facility ? getFacilitiesAux() : "";
  $: basePricePromise = $facility ? getBasePrice($facility) : "";
  $: approvedStatus = $token && $facility ? isApprovedForAllAux() : "";
  $: readyToUpgradePromise = $facility
    ? addressReadyToUpgradeAt($facility, $selectedAccount)
    : "";
  let getFacilitiesAux = async () => getFacilities($facility, $selectedAccount);
  let isApprovedForAllAux = async () =>
    isApprovedForAll($facility, $token, $selectedAccount);

  async function approveAllAux() {
    await approveAll($facility, $token, $selectedAccount);
    approvedStatus = isApprovedForAllAux();
  }
  async function upgradeFacility(facilityId) {
    await upgradeFacilityById(facilityId, $facility, $selectedAccount);
    facilityPromise = getFacilitiesAux();
  }
</script>

{#await approvedStatus}
  <p>Checking approval status...</p>
{:then isApproved}
  {#if !isApproved}
    <p>
      Before you can purchase training facilities, you must approve the training
      contract to use your tokens.
    </p>
    <button class="btn-sm btn-orange" on:click={approveAllAux}>Approve</button>
  {:else}
    {#await readyToUpgradePromise}
      <p>Checking account upgrade timer..</p>
    {:then canUpgradeAt}
      <h2>
        Here you can see all the available training facilities and upgrade them
        if you wish!
      </h2>
      <h2>
        Can upgrade: <strong
          ><Time
            live={1 * 1000}
            relative
            timestamp={canUpgradeAt * 1000}
          /></strong
        >
      </h2>
      {#await facilityPromise}
        <p>Getting your facilities...</p>
      {:then facilities}
        {#if facilities.length == 0}
          You have no facilities yet, buy some!
        {/if}
        {#await basePricePromise}
          <p>Getting baseprice for facilities..</p>
        {:then basePrice}
          {#key facilityPromise}
            <div class="flex flex-wrap justify-center mt-10">
              {#each facilities as facility}
                <TrainingFacilityUpgrades
                  {canUpgradeAt}
                  {facility}
                  upgradeFunction={upgradeFacility}
                  {basePrice}
                />
              {/each}
            </div>
          {/key}
        {/await}
      {/await}
    {/await}
  {/if}
{/await}
