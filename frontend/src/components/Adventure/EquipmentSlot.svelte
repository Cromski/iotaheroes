<script>
  export let placeholderName;
  export let item;
</script>

{#if item === undefined}
  {placeholderName}
{:else}
  <img
    class="border-solid mx-auto"
    width="50px"
    alt={item.metadata.description}
    src={"process.env.API_URL" + "/Item/" + item.itemId + ".png"}
  />
{/if}
