<script>
  import { defaultEvmStores, connected, selectedAccount } from "svelte-web3";
  import { onMount } from "svelte";
  import SignUp from "./pages/SignUp.svelte";
  import { isSignedUp } from "./contractHelpers/accountFunctions";
  import { hero } from "./contract_stores";
  import NavBar from "./components/NavBar.svelte";
  import { Modals, closeModal } from "svelte-modals";
  import { Router } from "svelte-router-spa";
  import { routes } from "./routes";

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

<main class="min-h-screen">
  <Modals>
    <div slot="backdrop" class="backdrop" on:click={closeModal} />
  </Modals>
  {#if $connected}
    {#await isSignedUpPromise}
      <p>Checking if you are signed in..</p>
    {:then isSignedUp}
      {#if isSignedUp}
        <NavBar />
        <div id="container">
          <Router {routes} />
        </div>
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

  @layer base {
    h1 {
      @apply text-2xl;
    }
    h2 {
      @apply text-xl;
    }
    h3 {
      @apply text-lg;
    }
    a {
      @apply text-blue-600 underline;
    }
  }

  #container {
    padding: 50px;
    padding-top: 100px;
    background-color: rgba(255, 255, 255, 0.7);
    margin-left: 20%;
    margin-right: 20%;
    border: 2px solid black;
  }
  main {
    background-image: url("/adventure1.PNG");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: lightgoldenrodyellow;

    text-align: center;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-sm {
    @apply py-1 px-2 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-orange {
    @apply bg-orange-400 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
  .btn-orange:hover {
    @apply bg-orange-600;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
