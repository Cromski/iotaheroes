<script>
  export let itemId;
  export let qty;
  export let uri;
  async function getMetadata() {
    const url = uri.replace("{id}", itemId);
    console.log(url);
    const resp = await fetch(url);
    const json = await resp.json();
    console.log(json);
    return json;
  }

  $: metadataPromise = getMetadata();
</script>

<div style={"margin:10px"}>
  {#await metadataPromise}
    <p>Grabbing metadata...</p>
  {:then data}
    <span><strong>{qty} {data.name}</strong></span>
    <img
      style={"border-style:solid;vertical-align:middle"}
      width="50px"
      alt={data.description}
      src={data.image}
    />
  {/await}
</div>
