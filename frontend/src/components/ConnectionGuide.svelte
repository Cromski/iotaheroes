<script>
  export let hasWallet;
  export let error;
</script>

<!-- Was a browswer wallet found-->
{#if hasWallet}
  <!-- Wallet found, give network details-->
  <div>
    {#if error}
      <strong
        >There was an error connecting, are you using the correct RPC url in the
        metamask network?
      </strong>
    {:else}
      <strong
        >Browser wallet found, please connect to the Iota Test EVM network to
        continue</strong
      >
    {/if}
  </div>
  <div class="p-2 text-sm text-left border border-black bg-white">
    <p>
      First make sure you have made an account and logged into your MetaMask
      browser extension.
    </p>
    <p class="mt-2">
      Click on the Networks dropdown in the top and click the "Add Network"
      button, finally add the details below and save the network.
    </p>
    <p class="mt-2">
      Network Name: <strong>Iota EVM test</strong> (or choose another name)
    </p>
    <p>RPC URL: <strong>https://evm.wasp.sc.iota.org</strong></p>
    <p>Chain ID: <strong>1074</strong></p>
    <p>
      Currency Symbol: <strong>i</strong> (or choose another symbol)
    </p>
    <p>
      Block Explorer URL: <strong>https://explorer.wasp.sc.iota.org</strong> (optional)
    </p>
  </div>
{:else}
  <!-- no wallet found give metamask link-->
  <p>
    Please install <a href="https://metamask.io/">MetaMask</a> to continue..
  </p>
  <p class="mt-4">
    MetaMask is a cryptocurrency wallet that allows you to interact with this
    and many other decentralized applications through a browser extension.
  </p>
{/if}
