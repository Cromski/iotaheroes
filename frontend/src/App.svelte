<script>
  import { defaultEvmStores, connected, selectedAccount } from "svelte-web3";
  import { onMount } from "svelte";
  import SignUp from "./pages/SignUp.svelte";
  import { isSignedUp } from "./contractHelpers/accountFunctions";
  import { hero } from "./contract_stores";
  import AuthenticatedApp from "./AuthenticatedApp.svelte";

  $: isSignedUpPromise = $hero ? isSignedUp($hero, $selectedAccount) : "";

  onMount(async () => {
    await connect();
  });
  function signInCallback() {
    isSignedUpPromise = isSignedUp($hero, $selectedAccount);
  }
  async function connect() {
    await defaultEvmStores.setProvider();
  }
</script>

<main>
  <h1>IotaHeroes</h1>
  {#if $connected}
    {#await isSignedUpPromise}
      <p>Checking if you are signed in..</p>
    {:then isSignedUp}
      {#if isSignedUp}
        <AuthenticatedApp />
      {:else}
        <SignUp fnCallback={signInCallback} />
      {/if}
    {/await}
  {:else}
    <p>Please connect metamask..</p>
  {/if}
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
