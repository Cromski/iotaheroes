<script>
  export let placeholderName;
  export let item;
  export let slotId;
</script>

{#if item === undefined}
  {placeholderName}
{:else}
  <img
    class="border-solid mx-auto"
    width="50px"
    alt={item.description}
    src={"items/" + item.id + ".png"}
  />
{/if}
