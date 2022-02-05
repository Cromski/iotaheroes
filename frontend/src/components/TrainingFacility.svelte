<script>
  import StatPie from "./StatPie.svelte";
  export let facility;

  let totalStats =
    (+facility.consGain +
      +facility.strGain +
      +facility.agiGain +
      +facility.intGain) *
    facility.level;
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
  </ul>
</div>
