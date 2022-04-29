<script>
  import { searchUser } from "../contractHelpers/accountFunctions";
  import { hero } from "../stores/contract_stores";
  export let onClick;
  export let userSearchTerm;
  $: userPromise = $hero ? searchUserAux(userSearchTerm) : "";

  const searchUserAux = async (userSearch) => {
    return await searchUser(userSearch, $hero);
  };
</script>

{#await userPromise then user}
  <span
    on:click={() => onClick(user.username)}
    class="cursor-pointer underline"
  >
    <strong>{user.username}</strong>
  </span>
{/await}
