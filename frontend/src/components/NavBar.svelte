<script>
  import { openModal } from "svelte-modals";
  import InventoryModal from "./InventoryModal.svelte";
  import AccountInfo from "./AccountInfo.svelte";
  import { push } from "svelte-spa-router";

  function toggleInventory() {
    openModal(InventoryModal);
  }
</script>

<div
  class="fixed top-0 border-0  w-full h-16 flex border-b-2 border-black-600 border-off-set-4"
>
  <!-- navbar start -->
  <div on:click={() => push("/")} class=" flex justify-start bing:w-1/4 bing:min-w-[210px] w-1/2 bing:bg-cyan-600">
    <!-- left side  px-9 text-2xl text-[#ff3e00] font-thin border-none ml-11 ... flex justify-start w-1/4-->
    <img
      alt="IotaHeroes"
      src="/logo.PNG"
      class=" mx-auto "
    />
  </div>
  <div class="flex justify-end w-3/4 bg-red-600 overflow-hidden">
    <!-- right side -->
    <button
      on:click={() => push("/heromarket")}
      class="mr-3 h-16 w-24 border-none text-lg hover:underline"
      >HERO MARKET</button
    >
    <button
      on:click={() => push("/upgrade")}
      class="mr-3 h-16 w-24 border-none text-lg hover:underline">UPGRADE</button
    >
    <button
      on:click={() => toggleInventory()}
      class="mr-3 h-16 w-24 border-none text-lg hover:underline"
      >INVENTORY</button
    >

    <button
      on:click={() => push("/trade")}
      class="mr-3 h-16 w-24 border-none text-lg hover:underline">TRADE</button
    >
    <button
      on:click={() => push("/shop/0")}
      class=" mr-[12%] h-16 w-24 border-none text-lg hover:underline"
      >SHOP</button
    >
    <div class="h-16 w-18 border-none text-lg hover:underline items-center">
      <AccountInfo />
    </div>
  </div>
</div>
