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

<img
  alt="IotaHeroes"
  src="/logo.PNG"
  class="w-1/2 mx-auto text-2xl text-[#ff3e00] font-thin border-none"
/>
<div id="signupContainer" class="">
  <div class="">
    <h1>Start your journey today!</h1>
    <h2>Just enter a username to create a user!</h2>
    <input bind:value={username} type="text" placeholder=" Enter username..." />
    <button class="m-2 btn-sm btn-orange" on:click={() => signUpAux()}
      >Sign up</button
    >
  </div>
</div>
