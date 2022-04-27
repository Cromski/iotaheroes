<script>
  import { inventory } from "../../stores/inventory_store";
  import Item from "../Item.svelte";
  import GearPane from "./GearPane.svelte";
  import {
    getSet,
    getAllSets,
    saveSet,
    removeSet,
    removeAllSets,
  } from "../../storageHelpers/gearSets";
  export let adventureFunction;
  export let hero;

  let gearSets = getAllSets();
  let saveSetName;
  let selectedGearSet;

  $: activeSlot = 7;
  $: equipment = [];

  let changeActiveSlot = (id) => {
    activeSlot = id;
    delete equipment[id];
    equipment = equipment; // Trigger re-render
  };

  let selectItem = (item) => {
    equipment[item.attributes.itemSlot] = item;
    saveSet("Last (autosaved)", equipment);
  };

  let goAdventure = () => {
    let equipArr = equipment.map((a) => a.id).filter((a) => a != null);
    adventureFunction(hero.id, equipArr);
  };

  // Functionality to save/restore item sets
  let handleSave = () => {
    saveSet(saveSetName, equipment);
    gearSets = getAllSets();
  };
  let handleRemove = () => {
    removeSet(saveSetName);
    gearSets = getAllSets();
    saveSetName = "";
  };
  let handleRemoveAll = () => {
    removeAllSets();
    gearSets = getAllSets();
    saveSetName = "";
  };
  let fromTemplate = (name) => {
    var gearSet = getSet(name);
    if (gearSet === undefined) {
      equipment = [];
      return;
    }
    let gearSetWithItemData = [];
    for (let i = 0; i < gearSet.gear.length; i++) {
      var it = $inventory.find((item) => item.id === gearSet.gear[i]);
      if (it !== undefined) {
        gearSetWithItemData[i] = it;
      }
    }
    equipment = gearSetWithItemData;
  };
  let handleSelectSet = () => {
    fromTemplate(selectedGearSet);
    saveSetName = selectedGearSet;
  };
</script>

<div class="border">Equip your hero for the adventure</div>

<div class="flex">
  <GearPane {equipment} clickItem={changeActiveSlot} />

  <!-- Inventory pane -->
  <div class="p-2 border-black border-2 m-3">
    <h3>Stats bonus</h3>
    <div>
      Strength: +{equipment.length > 0
        ? equipment
            .map((item) => item.attributes.boost.strength)
            .reduce((prev, next) => prev + next)
        : 0}
    </div>
    <div>
      Agility: +{equipment.length > 0
        ? equipment
            .map((item) => item.attributes.boost.agility)
            .reduce((prev, next) => prev + next)
        : 0}
    </div>
    <div>
      Intelligence: +{equipment.length > 0
        ? equipment
            .map((item) => item.attributes.boost.intelligence)
            .reduce((prev, next) => prev + next)
        : 0}
    </div>
  </div>
  {#if activeSlot !== -1}
    <div class="p-2 border-black border-2 m-3">
      Here is your items
      <div>
        {#each $inventory.filter((f) => f.attributes?.itemSlot == activeSlot) as item, i}
          <Item {item} clickItem={selectItem} />
        {/each}
      </div>
    </div>
  {/if}
</div>
<div>
  <div class="flex text-left items-center">
    <label for="setSelector">Your sets:</label>
    <select
      class="ml-1"
      id="setSelector"
      bind:value={selectedGearSet}
      on:change={handleSelectSet}
    >
      <option disabled>None</option>
      {#each gearSets as gearSet}
        <option value={gearSet.name}>{gearSet.name}</option>
      {/each}
    </select>
    <button on:click={handleRemoveAll} class="btn-orange btn-sm ml-1"
      >Delete All</button
    >
  </div>
  <div class="text-left ">
    <input bind:value={saveSetName} type="text" placeholder="Set name" />
    <button
      disabled={saveSetName === undefined || saveSetName === ""}
      on:click={handleSave}
      class="btn-orange btn-sm">Save</button
    >
    <button
      disabled={saveSetName === undefined || saveSetName === ""}
      on:click={handleRemove}
      class="btn-orange btn-sm">Delete</button
    >
  </div>
</div>
<div class="mt-10">
  <button
    disabled={hero.isAdventuring ? "disabled" : ""}
    class="btn btn-orange"
    on:click={goAdventure}>Go adventure!</button
  >
</div>
