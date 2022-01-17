<script>
  export let itemId;
  export let clickItem;
  export let qty;
  export let uri;

  async function getMetadata() {
    const url = uri.replace("{id}", itemId);
    const resp = await fetch(url);
    const json = await resp.json();
    return json;
  }

  $: metadataPromise = getMetadata();
</script>

<div class="m-[10px]">
  {#await metadataPromise}
    <p>Grabbing metadata...</p>
  {:then data}
    <span><strong>{qty} {data.name}</strong></span>
    <img
      on:click={() => clickItem(itemId)}
      class="border-solid mx-auto"
      width="50px"
      alt={data.description}
      src={data.image}
    />
  {/await}
</div>
