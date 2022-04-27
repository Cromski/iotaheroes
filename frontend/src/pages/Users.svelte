<script>
  import { token, hero } from "../stores/contract_stores";
  import { getTopHoldersForItemId } from "../apiHelpers/Token";
  import {
    searchUser,
    getUserCount,
  } from "../contractHelpers/accountFunctions";
  import UserOverview from "../components/SearchUserDetails/UserOverview.svelte";
  import UserTag from "../components/UserTag.svelte";
  import HelpTooltip from "../components/General/HelpTooltip.svelte";
  import { slimscroll } from "svelte-slimscroll";

  export let params = {};
  let userSearchInput = params.id !== null ? params.id : "";
  $: selectedUserPromise = $hero
    ? searchUser(userSearchInput, $hero)
    : Promise.resolve([]);
  $: userCountPromise = $hero ? getUserCount($hero) : "0";
  $: topHoldersPromise = $hero ? getTopHoldersForItemId(0) : [];

  const searchUserAux = () => {
    selectedUserPromise = searchUser(userSearchInput, $hero);
  };
</script>

<div class="absolute left-0 top-0">
  {#await userCountPromise then userCount}
    Current users signed up: <strong>{userCount}</strong>.
  {/await}
  {#await topHoldersPromise then holders}
    <div
      class="p-2"
      use:slimscroll={{
        height: "170px",
        width: "200px",
        alwaysVisible: true,
        color: "#EA580C",
      }}
    >
      <div>Top Gold Farmers</div>
      <div>
        {#each holders as holder, i}
          <div>
            <UserTag
              onClick={(name) => (userSearchInput = name)}
              userSearchTerm={holder.address}
            />({holder.amount}g)
          </div>
        {/each}
      </div>
    </div>
    <HelpTooltip tip={"Gold is received as loot from adventuring."} />
  {/await}
</div>

<div>
  <div class="ml-20 m-3">
    <div class="text-lg ">Search for a user:</div>
    <input
      class="w-2/3"
      placeholder="Enter username or address"
      bind:value={userSearchInput}
      on:input={searchUserAux}
      type="text"
    />
  </div>
  {#await selectedUserPromise then selectedUser}
    {#if selectedUser !== undefined && selectedUser !== ""}
      <div class="mt-8">
        <UserOverview user={selectedUser} />
      </div>{/if}
  {/await}
</div>
