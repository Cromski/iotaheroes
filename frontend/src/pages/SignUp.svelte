<script>
  import { signUp, usernameExists } from "../contractHelpers/accountFunctions";
  import { hero } from "../contract_stores";
  import { selectedAccount } from "svelte-web3";
  export let fnCallback;
  let username;

  async function signUpAux() {
    const exists = await usernameExists(username, $hero);
    if (username.length < 3 || username.length > 13) {
      alert("username must be between 3 and 12 letters");
      return;
    }
    if (exists) {
      alert("Username is already taken");
    } else {
      await signUp(username, $hero, $selectedAccount);
      fnCallback();
    }
  }
</script>

<h1>Please sign up here</h1>
<p>Just enter a username to create a user!</p>
<input bind:value={username} type="text" />
<button on:click={() => signUpAux()}>Sign up</button>
