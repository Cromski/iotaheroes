<script>
  import {
    defaultEvmStores,
    connected,
    selectedAccount,
    chainId,
    chainData,
  } from "svelte-web3";
  import { onMount } from "svelte";
  import SignUp from "./pages/SignUp.svelte";
  import { isSignedUp } from "./contractHelpers/accountFunctions";
  import { hero } from "./stores/contract_stores";
  import NavBar from "./components/NavBar.svelte";
  import { Modals, closeModal } from "svelte-modals";
  import Router from "svelte-spa-router";
  import { routes } from "./routes";

  $: isSignedUpPromise = $hero ? isSignedUp($hero, $selectedAccount) : "";
  $: metamaskConnected = window.ethereum
    ? window.ethereum.isConnected()
    : false;

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
        <div class="flex w-full">
          <NavBar />
          <div id="container" class="">
            <Router {routes} />
          </div>
        </div>
      {:else}
        <SignUp fnCallback={signInCallback} />
      {/if}
    {/await}
  {:else}
    {#if window.Web3}
      <p>
        The Web3.js library has been injected in Global window Object (version: {window
          .Web3.version}).
      </p>
    {:else}
      <div class="notification is-warning">
        <strong
          >Error! The Web3.js library has not been detected in the Global window
          Object.</strong
        >
        Please check that Web3.js has been correctly added in
        <em class="is-family-code">public/index.html</em>
        with the line:
        <pre>
    &lt;script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js">&lt;/script>
    </pre>
      </div>
    {/if}
    <p>
      Browser wallet detected in Global Object window.ethereum : {window.ethereum
        ? "yes"
        : "no"}
    </p>
    {#if window.ethereum}
      <p>
        Browser wallet already connected to metamask : {metamaskConnected}
      </p>
    {/if}
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
    width: 100%;
    margin-top: 8%;
    padding: 50px;
    padding-top: 100px;
    background-color: rgba(255, 255, 255, 0.7);
    margin-left: 20%;
    margin-right: 20%;
    margin-bottom: 5%;
    border: 2px solid black;
  }
  #signupContainer {
    margin-top: 5%;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    margin-left: 25%;
    margin-right: 25%;
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
    color: #fb923c;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: bold;
  }
  h2 {
    font-size: 1em;
    font-weight: bold;
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
  @media (max-width: 640px) {
    h1 {
      font-size: 1rem;
    }
    h2 {
      font-size: 0.8em;
      font-weight: bold;
    }
  }
</style>
