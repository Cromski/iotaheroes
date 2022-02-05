<script>
  import { openModal } from "svelte-modals";
  import { selectedAccount } from "svelte-web3";

  import InventoryModal from "./InventoryModal.svelte";
  import { getTokenUri, getInventory } from "../contractHelpers/tokenFunctions";
  import { hero, token } from "../contract_stores";
  import AccountInfo from "./AccountInfo.svelte";

  $: uriPromise = $token ? getTokenUri($token) : "";
  $: inventoryPromise = $token ? getInventoryAux() : "";
  let getInventoryAux = async () => getInventory($token, $selectedAccount);

  function toggleInventory(inventory, uri) {
    openModal(InventoryModal, { inventory: inventory, uri: uri });
  }
</script>

<div
  class="fixed top-0 border-0 bg-[lightgoldenrodyellow] w-full h-16 flex border-b-2 border-black-600 border-off-set-4"
>
  <!-- navbar start -->
  <div on:click={() => (location.href = "/")} class=" flex justify-start w-1/4">
    <!-- left side -->
    <button class=" px-9 text-2xl text-[#ff3e00] font-thin border-none ml-11"
      >IOTAHEROES</button
    >
  </div>
  <div class="flex justify-end w-3/4">
    <!-- right side -->
    <button
      on:click={() => (location.href = "/upgrade")}
      class="mr-3 h-16 w-24 border-none text-lg hover:underline">UPGRADE</button
    >
    {#await inventoryPromise}
      ...
    {:then inventory}
      {#await uriPromise}
        ...
      {:then _uri}
        <button
          on:click={() => toggleInventory(inventory, _uri)}
          class="mr-3 h-16 w-24 border-none text-lg hover:underline"
          >INVENTORY</button
        >
      {/await}
    {/await}

    <button
      on:click={() => (location.href = "/trade")}
      class="mr-3 h-16 w-24 border-none text-lg hover:underline">TRADE</button
    >
    <button
      on:click={() => (location.href = "/shop/0")}
      class=" mr-[12%] h-16 w-24 border-none text-lg hover:underline"
      >SHOP</button
    >
    <div class="h-16 w-18 border-none text-lg hover:underline items-center">
      <AccountInfo />
    </div>
  </div>
</div>
