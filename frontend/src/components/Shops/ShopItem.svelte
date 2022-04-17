<script>
  import { web3 } from "svelte-web3";

  export let itemId;
  export let productId;
  export let qty;
  export let uri;
  export let limit;
  export let price;
  export let buyAction;

  async function getMetadata() {
    const url = uri.replace("{id}", itemId);
    const resp = await fetch(url);
    const json = await resp.json();
    return json;
  }

  $: metadataPromise = getMetadata();
</script>

<div style={"margin:10px;display:inline-block"}>
  {#await metadataPromise}
    <p>Grabbing metadata...</p>
  {:then data}
    <div style={"border: 2px solid black;padding:10px"}>
      <span><strong>{data.name}</strong></span>
      <img
        style={"border-style:solid;vertical-align:middle"}
        width="50px"
        alt={data.description}
        src={"items/" + data.id + ".png"}
      />
      <p>Quantity: <strong>{qty}</strong></p>
      <p>Price: <strong>{$web3.utils.fromWei(price)}</strong></p>
      <button
        class="btn-sm btn-orange"
        on:click={() => buyAction(productId, 1, price)}>Buy!</button
      >
    </div>
  {/await}
</div>
