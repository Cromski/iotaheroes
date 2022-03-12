<script>
  export let heroId;
  export let listHeroFunction;
  export let update;
  let price = 0;
</script>

<div>
  {#if update}
    <p>Update your listing:</p>
  {:else}
    <p>List your hero for sale:</p>
  {/if}
  <input
    type="number"
    class=" min-w-[20%] h-9 my-auto text-center text-xl"
    min="0"
    placeholder="Price"
    bind:value={price}
  />
  <button
    disabled={price <= 0 ? true : false}
    class="btn-sm btn-orange"
    on:click={() => listHeroFunction(heroId, price)}
  >
    {#if update}
      <p>Update price!</p>
    {:else}
      <p>Create trade!</p>
    {/if}
  </button>
</div>
