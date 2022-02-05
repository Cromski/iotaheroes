<script>
  import StatPie from "./statPie.svelte";
  export let facility;
  export let canUpgradeAt;
  export let upgradeFunction;
  export let basePrice;
  let totalStats =
    (+facility.consGain +
      +facility.strGain +
      +facility.agiGain +
      +facility.intGain) *
    facility.level;
  $: readyToUpgrade = canUpgradeAt > Date.now() / 1000;

  console.log(basePrice);
</script>

<div class="grid justify-items-center">
  <img
    class="outline outline-offset-2 outline-4 justify-self-auto"
    src="https://www.gravatar.com/avatar/{facility.id}?s=150&d=identicon"
    alt="avatar"
    style="border-style:solid"
  />
  <ul style="list-style:none;padding:25px">
    <li>Name: {facility.name}</li>
    <li>Current Level: {facility.level}</li>

    <li>
      <StatPie
        str={facility.strGain}
        agi={facility.agiGain}
        int={facility.intGain}
        level={facility.level}
      />
    </li>
    <li>
      Total: {totalStats}
    </li>
    <li>
      <strong
        >Cost to upgrade: {Number(basePrice) *
          (Number(facility.level) + 1)}</strong
      >
    </li>
  </ul>

  <button
    disabled={readyToUpgrade ? "disabled" : ""}
    class="btn btn-orange"
    on:click={() => upgradeFunction(facility.id, facility.level)}
    >Upgrade!</button
  >
</div>
