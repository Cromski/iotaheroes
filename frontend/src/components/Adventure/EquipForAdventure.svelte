<script>
  import { inventory } from "../../stores/inventory_store";
  import { getLevelProgress } from "../../util/heroXP";
  import { checkIfEmpty } from "../../util/sparseArrayIsEmpty";
  import Item from "../Item.svelte";
  import GearPane from "./GearPane.svelte";
  import {
    getSet,
    getAllSets,
    saveSet,
    removeSet,
    removeAllSets,
  } from "../../storageHelpers/gearSets";
  import { onDestroy } from "svelte";
  import GearSetManager from "./GearSetManager.svelte";
  import { slimscroll } from "svelte-slimscroll";

  export let adventureFunction;
  export let hero;

  $: activeSlot = 7;
  $: equipment = [];
  const heroStr = getLevelProgress(hero.strength);
  const heroAgi = getLevelProgress(hero.agility);
  const heroInt = getLevelProgress(hero.intelligence);

  let gearStr, gearAgi, gearInt;
  $: equipment,
    (gearStr =
      equipment.length > 0 && !checkIfEmpty(equipment)
        ? equipment
            .map((item) => item.attributes.boost.strength)
            .reduce((prev, next) => prev + next)
        : 0),
    (gearAgi =
      equipment.length > 0 && !checkIfEmpty(equipment)
        ? equipment
            .map((item) => item.attributes.boost.agility)
            .reduce((prev, next) => prev + next)
        : 0),
    (gearInt =
      equipment.length > 0 && !checkIfEmpty(equipment)
        ? equipment
            .map((item) => item.attributes.boost.intelligence)
            .reduce((prev, next) => prev + next)
        : 0);

  let gearSets = getAllSets();

  let changeActiveSlot = (id) => {
    activeSlot = id;
    delete equipment[id];
    equipment = equipment; // Trigger re-render
    saveSet("Last (autosaved)", equipment);
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
  let handleSave = (name) => {
    saveSet(name, equipment);
    gearSets = getAllSets();
  };
  let handleRemove = (name) => {
    removeSet(name);
    gearSets = getAllSets();
  };
  let handleRemoveAll = () => {
    removeAllSets();
    gearSets = getAllSets();
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
  let handleSelectSet = (name) => {
    fromTemplate(name);
  };
  let unsub = inventory.subscribe((inv) => {
    if (gearSets.length !== 0) {
      fromTemplate(gearSets[0].name);
    }
  });
  onDestroy(unsub);
</script>

<h2>Equip your hero for the adventure</h2>

<div class="mt-4 flex">
  <div class="p-1 border-black border m-3">
    <h3>Stats</h3>
    <div class="underline whitespace-pre font-bold str-text">
      Strength: {heroStr.currentLevel}(+{gearStr})={heroStr.currentLevel+gearStr}
    </div>
    <div class="underline whitespace-pre font-bold agi-text">
      Agility: {heroAgi.currentLevel}(+{gearAgi})={heroAgi.currentLevel+gearAgi}
    </div>
    <div class="underline whitespace-pre font-bold int-text">
      Intelligence: {heroInt.currentLevel}(+{gearInt})={heroInt.currentLevel+gearInt}
    </div>
  </div>
  <GearPane {equipment} clickItem={changeActiveSlot} />

  <!-- Inventory pane -->
  {#if activeSlot !== -1}
    <div class="grow p-2 border-black border mx-4">
      <h3>Here is your items</h3>
      <div
        class="flex flex-wrap"
        use:slimscroll={{
          height: "170px",
          alwaysVisible: true,
          color: "#EA580C",
        }}
      >
        <!-- {#each $inventory.filter((f) => f.attributes?.itemSlot == activeSlot) as item, i} -->
        {#each $inventory.filter((f) => f.attributes?.itemSlot !== undefined) as item, i}
          <Item {item} clickItem={selectItem} />
        {/each}
      </div>
    </div>
  {/if}
</div>
<GearSetManager
  {gearSets}
  {handleRemove}
  {handleSave}
  {handleRemoveAll}
  {handleSelectSet}
/>

<div class="mt-10">
  <button
    disabled={hero.isAdventuring ? "disabled" : ""}
    class="btn btn-orange"
    on:click={goAdventure}>Go adventure!</button
  >
</div>
