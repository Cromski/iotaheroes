<script>
  import { Router } from "svelte-router-spa";
  import { routes } from "./routes";
  import { getUsername } from "./contractHelpers/accountFunctions";
  import { hero } from "./contract_stores";
  import { selectedAccount, web3 } from "svelte-web3";

  $: getUsernamePromise = $hero ? getUsername($hero, $selectedAccount) : "";
  $: userBalancePromise = $web3.eth.getBalance($selectedAccount);
</script>

<Router {routes} />
{#await getUsernamePromise then username}
  <div class=" absolute text-right top-[15px] right-7">
    <div>
      Welcome, <strong
        >{username} ({$selectedAccount.substring(0, 6) + "..."})</strong
      >
    </div>
    {#await userBalancePromise then userBalance}
      <div>
        Balance: <strong
          >{Number($web3.utils.fromWei(userBalance)).toFixed(4)}</strong
        >
      </div>
    {/await}
  </div>
{/await}
