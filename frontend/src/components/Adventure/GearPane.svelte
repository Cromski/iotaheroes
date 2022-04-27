<script>
  import EquipmentSlot from "./EquipmentSlot.svelte";
  export let clickItem;
  export let equipment;
  $: equipment;
</script>

<div class="w-72">
  <div class="grid grid-cols-5">
    <div
      on:click={() => clickItem(3)}
      class="bg-white col-start-2 mx-4 my-1 border-black border-2 w-14 h-14"
    >
      <EquipmentSlot slotId={3} placeholderName={"Head"} item={equipment[3]} />
    </div>
  </div>
  <div class="grid grid-cols-5">
    <div class="bg-white mx-4 my-1 border-black border-2 w-14 h-14" />
    <div
      on:click={() => clickItem(4)}
      class="bg-white  mx-4 my-1 border-black border-2 w-14 h-14"
    >
      <EquipmentSlot slotId={4} placeholderName={"Chest"} item={equipment[4]} />
    </div>
    <div
      on:click={() => clickItem(1)}
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
      on:click={() => clickItem(6)}
      class="bg-white  mx-4 my-1 border-black border-2 w-14 h-14"
    >
      <EquipmentSlot slotId={6} placeholderName={"Boots"} item={equipment[6]} />
    </div>
    <div
      on:click={() => clickItem(7)}
      class="bg-white  mx-4 my-1 border-black border-2 w-14 h-14"
    >
      <EquipmentSlot slotId={7} placeholderName={"Belt"} item={equipment[7]} />
    </div>
  </div>
  <div class="grid grid-cols-5">
    <div
      on:click={() => clickItem(5)}
      class="bg-white col-start-2 mx-4 my-1 border-black border-2 w-14 h-14"
    >
      <EquipmentSlot slotId={5} placeholderName={"Pants"} item={equipment[5]} />
    </div>
  </div>
</div>
