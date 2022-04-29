<script>
  import { searchUser } from "../contractHelpers/accountFunctions";
  import { hero } from "../stores/contract_stores";
  import { push } from "svelte-spa-router";

  export let userSearchTerm;
  $: userPromise = $hero ? searchUserAux(userSearchTerm) : "";

  const searchUserAux = async (userSearch) => {
    return await searchUser(userSearch, $hero);
  };
</script>

{#await userPromise then user}
  <span
    class="cursor-pointer underline"
    on:click={() => push("/user/" + user.username)}
  >
    <strong>{user.username}</strong>
  </span>
{/await}
