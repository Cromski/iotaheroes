<script>
  import HelpTooltip from "../General/HelpTooltip.svelte";
  import collapse from "svelte-collapse";

  let saveSetName;
  let selectedGearSet;
  export let handleSelectSet;
  export let gearSets;
  export let handleSave;
  export let handleRemoveAll;
  export let handleRemove;

  let open = false;
</script>

<div>
  <div class="flex text-left items-center">
    <label for="setSelector">Your sets:</label>
    <select
      class="ml-1"
      id="setSelector"
      bind:value={selectedGearSet}
      on:change={() => {
        saveSetName = selectedGearSet;
        handleSelectSet(selectedGearSet);
      }}
    >
      {#if gearSets.length === 0}
        <option disabled>None</option>
      {/if}
      {#each gearSets as gearSet}
        <option value={gearSet.name}>{gearSet.name}</option>
      {/each}
    </select>
    <HelpTooltip
      tip={"Anytime you make a change it will be saved in the 'Last (autosaved)' set. Create a new set to have more control"}
    />
  </div>
  <div class="text-left">
    <button class="mt-2 btn-orange btn-sm" on:click={() => (open = !open)}>
      Manage sets</button
    >
  </div>

  <div use:collapse={{ open }} class="my-3 w-60 text-left ">
    <input
      class="w-full"
      bind:value={saveSetName}
      type="text"
      placeholder="Set name"
    />
    <div class="flex mt-2">
      <button
        disabled={saveSetName === undefined || saveSetName === ""}
        on:click={handleSave(saveSetName)}
        class="grow btn-orange btn-sm">Save</button
      >
      <button
        disabled={saveSetName === undefined || saveSetName === ""}
        on:click={handleRemove(saveSetName)}
        class="grow btn-orange btn-sm">Delete</button
      >
      <button on:click={handleRemoveAll} class="grow btn-orange btn-sm ml-1"
        >Delete All</button
      >
    </div>
  </div>
</div>
