<script>
  import { selectedAccount } from "svelte-web3";
  import { trade, token } from "../contract_stores";

  // setup trade form with binding to inputs
  $: getTradesPromise = $trade ? getPastTrades() : "";

  // TODO
  async function createTrade() {
    await $trade.methods.setTradeOffer().send({ from: $selectedAccount });
    heroesPromise = getHeroes();
  }

  // TODO CHECK FOR APPROVAL, IF NOT APPROVED START APPROVE

  async function getPastTrades() {
    const response = await $trade.getPastEvents("TradeCreated", {
      fromBlock: 0,
      toBlock: "latest",
    });
    console.log(response);
    return response;
  }
</script>

<h1>IotaHeroes Trading Post</h1>
