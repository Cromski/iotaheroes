<script>
  import { onMount } from "svelte";

  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
  import { selectedAccount } from "svelte-web3";
  import {
    getAddressForUsername,
    searchUser,
  } from "../../contractHelpers/accountFunctions";
  import { token, hero } from "../../stores/contract_stores";
  import { sendItem } from "../../contractHelpers/tokenFunctions";
  import ItemStatLabels from "../Items/ItemStatLabels.svelte";
  export let item;
  let validRecipient = false;
  let amountToSend = 0;
  let recipientInput = "";
  let recipientAddress = "";
  $: getUsernamePromise = $hero ? searchUserAux(recipientInput) : "";

  const searchUserAux = async (userSearchTerm) => {
    var user = await searchUser(userSearchTerm, $hero);
    if (user.username === "") {
      validRecipient = false;
    } else {
      recipientAddress = user.address;
      validRecipient = true;
    }
    return user;
  };
</script>

<div>
  <Tabs>
    <TabList>
      {#if item.attributes !== undefined}
        <Tab>Stats</Tab>
      {/if}
      <Tab>Send</Tab>
    </TabList>

    {#if item.attributes !== undefined}
      <TabPanel>
        {#if item.attributes.boost !== undefined}
          <ItemStatLabels
            label={"Boost"}
            attributesObj={item.attributes.boost}
          />
        {/if}
        {#if item.attributes.requirement !== undefined}
          <ItemStatLabels
            label={"Level Requirement"}
            attributesObj={item.attributes.requirement}
          />
        {/if}
      </TabPanel>
    {/if}
    <TabPanel>
      <div class="text-sm">Send this item to another user</div>
      <div class="text-left mt-4">
        <div class="text-sm"><strong>Amount to send:</strong></div>
        <div>
          <input
            bind:value={amountToSend}
            type="number"
            min={0}
            max={item.amount}
            placeholder="Amount"
          />
        </div>
        <div class="text-sm"><strong>to:</strong></div>
        <div>
          <input
            bind:value={recipientInput}
            type="text"
            placeholder="Username or address"
          />
        </div>
      </div>
      {#await getUsernamePromise}
        Checking addresss..
      {:then username}
        {#if username !== ""}
          <div>Sending to.. <strong>{username.username}</strong></div>
        {:else}
          <div class="text-xs">Enter a valid username or address!</div>
        {/if}
      {/await}
      <button
        on:click={() =>
          sendItem(
            item.id,
            amountToSend,
            recipientAddress,
            $token,
            $selectedAccount
          )}
        disabled={amountToSend <= 0 ||
          amountToSend > item.amount ||
          !validRecipient}
        class="mt-4 btn-sm btn-orange">Send</button
      >
    </TabPanel>
  </Tabs>
</div>
