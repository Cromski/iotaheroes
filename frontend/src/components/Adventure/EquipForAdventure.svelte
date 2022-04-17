<script>
  import { inventory } from "../../stores/inventory_store";
  import Item from "../Item.svelte";
  import EquipmentSlot from "./EquipmentSlot.svelte";
  export let adventureFunction;
  export let hero;
  $: activeSlot = 7;
  $: equipment = [];
  let changeActiveSlot = (id) => {
    activeSlot = id;
  };
  let selectItem = (item) => {
    equipment[activeSlot] = item;
    console.log(equipment);
  };
  let goAdventure = () => {
    let equipArr = equipment.map((a) => a.id).filter((a) => a != null);
    console.log(equipArr);
    adventureFunction(hero.id, equipArr);
  };
</script>

<div class="border">Equip your hero for the adventure</div>

<div class="flex">
  <!--Equipment pane -->
  <div class="w-72">
    <div class="grid grid-cols-5">
      <div
        on:click={() => changeActiveSlot(3)}
        class="bg-white col-start-2 mx-4 my-1 border-black border-2 w-14 h-14"
      >
        <EquipmentSlot
          slotId={3}
          placeholderName={"Head"}
          item={equipment[3]}
        />
      </div>
    </div>
    <div class="grid grid-cols-5">
      <div class="bg-white mx-4 my-1 border-black border-2 w-14 h-14" />
      <div
        on:click={() => changeActiveSlot(4)}
        class="bg-white  mx-4 my-1 border-black border-2 w-14 h-14"
      >
        <EquipmentSlot
          slotId={4}
          placeholderName={"Chest"}
          item={equipment[4]}
        />
      </div>
      <div
        on:click={() => changeActiveSlot(1)}
        class="bg-white  mx-4 my-1 border-black border-2 w-14 h-14"
      >
        <EquipmentSlot
          slotId={1}
          placeholderName={"Weapon"}
          item={equipment[1]}
        />
      </div>
    </div>
    <div class="grid grid-cols-5">
      <div
        on:click={() => changeActiveSlot(6)}
        class="bg-white  mx-4 my-1 border-black border-2 w-14 h-14"
      >
        <EquipmentSlot
          slotId={6}
          placeholderName={"Boots"}
          item={equipment[6]}
        />
      </div>
      <div
        on:click={() => changeActiveSlot(7)}
        class="bg-white  mx-4 my-1 border-black border-2 w-14 h-14"
      >
        <EquipmentSlot
          slotId={7}
          placeholderName={"Belt"}
          item={equipment[7]}
        />
      </div>
    </div>
    <div class="grid grid-cols-5">
      <div
        on:click={() => changeActiveSlot(5)}
        class="bg-white col-start-2 mx-4 my-1 border-black border-2 w-14 h-14"
      >
        <EquipmentSlot
          slotId={5}
          placeholderName={"Pants"}
          item={equipment[5]}
        />
      </div>
    </div>
  </div>

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
  <button
    disabled={hero.isAdventuring ? "disabled" : ""}
    class="btn btn-orange"
    on:click={goAdventure}>Go adventure!</button
  >
</div>
