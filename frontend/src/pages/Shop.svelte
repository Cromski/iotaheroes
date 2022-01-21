<script>
  import { shop, token } from "../contract_stores";
  import { selectedAccount } from "svelte-web3";
  import { buyProduct, getProducts } from "../contractHelpers/storeFunctions";
  import { getTokenUri } from "../contractHelpers/tokenFunctions";
  import ShopItem from "../components/ShopItem.svelte";

  export let currentRoute;
  let id = currentRoute.namedParams.id;
  $: tokenUri = $token ? getTokenUri($token) : "";
  $: productsPromise = $shop ? getProducts(id, $shop) : "";

  async function buy(productId, amount, price) {
    await buyProduct(productId, id, amount, price, $shop, $selectedAccount);
    productsPromise = getProducts(id, $shop);
  }
</script>

<h2>The shop</h2>

{#await tokenUri}
  <p>Getting token uri...</p>
{:then uri}
  {#await productsPromise}
    <p>Getting sale items..</p>
  {:then products}
    {#each products as product}
      <ShopItem
        {uri}
        qty={product.amount}
        itemId={product.tokenId}
        price={product.price}
        limit={product.limit}
        productId={product.id}
        buyAction={buy}
      />
    {/each}
  {/await}
{/await}
