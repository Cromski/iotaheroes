<script>
  import { getUsername } from "../contractHelpers/accountFunctions";
  import { hero } from "../contract_stores";
  import { selectedAccount, web3 } from "svelte-web3";

  $: getUsernamePromise = $hero ? getUsername($hero, $selectedAccount) : "";
  $: userBalancePromise = $web3 ? $web3.eth.getBalance($selectedAccount) : "";
</script>

{#await getUsernamePromise then username}
  <div class="flex flex-col flex-nowrap whitespace-nowrap">
    <div class="text-sm">
      <span
        >Welcome, <strong
          >{username} ({$selectedAccount.substring(0, 6) + "..."})</strong
        ></span
      >
    </div>
    {#await userBalancePromise then userBalance}
      <div class="text-sm">
        Balance: <strong
          >{Number($web3.utils.fromWei(userBalance)).toFixed(4)}</strong
        >
      </div>
    {/await}
  </div>
{/await}
