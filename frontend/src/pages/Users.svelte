<script>
  import { token, hero } from "../stores/contract_stores";
  import {
    searchUser,
    getUserCount,
  } from "../contractHelpers/accountFunctions";
  import UserOverview from "../components/SearchUserDetails/UserOverview.svelte";
  export let params = {};
  let userSearchInput = params.id !== null ? params.id : "";
  $: selectedUserPromise = $hero
    ? searchUser(userSearchInput, $hero)
    : Promise.resolve([]);
  $: userCountPromise = $hero ? getUserCount($hero) : "0";

  const searchUserAux = () => {
    selectedUserPromise = searchUser(userSearchInput, $hero);
  };
</script>

{#await userCountPromise then userCount}
  <div class="absolute left-0 top-0">
    Current users signed up: <strong>{userCount}</strong>.
  </div>
{/await}
<div>
  <div class="m-3">
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
