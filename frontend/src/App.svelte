<script>
  import { Router } from "svelte-router-spa";
  import { routes } from "./routes";
  import {
    defaultEvmStores,
    connected,
    web3,
    makeContractStore,
  } from "svelte-web3";
  import { onMount } from "svelte";
  import Overview from "./pages/Overview.svelte";

  onMount(async () => {
    await connect();
  });
  async function connect() {
    await defaultEvmStores.setProvider();
  }
</script>

<main>
  <h1>IotaHeroes</h1>
  {#if $connected}
    <Router {routes} />
  {:else}
    <p>Please connect metamask..</p>
  {/if}
  <!-- {#if window.ethereum}
    <p>Browser wallet already connected to metamask: {metamaskConnected}</p>
  {/if}
  {#if window.ethereum && !metamaskConnected}
    <button on:click={onClickConnectWallet}>Connect now!</button>
  {:else}
    <Router {routes} />
    <ContractStores />
  {/if} -->
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  main {
    background: lightgoldenrodyellow;
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
