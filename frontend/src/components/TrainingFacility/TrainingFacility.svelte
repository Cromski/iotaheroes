<script>
  import StatPie from "../StatPie.svelte";
  export let facility;

  let totalStats =
    (+facility.consGain +
      +facility.strGain +
      +facility.agiGain +
      +facility.intGain) *
    facility.level;
</script>

<div class="flex-auto">
  <img
    class="outline outline-offset-2 outline-4 justify-self-auto"
    src="https://www.gravatar.com/avatar/{facility.id}?s=150&d=identicon"
    alt="avatar"
    style="border-style:solid"
  />
  <div>Name: {facility.name}</div>
  <div>Current Level: <strong>{facility.level}</strong></div>
  <div style="max-width:150px">
    <StatPie
      str={facility.strGain * facility.level}
      agi={facility.agiGain * facility.level}
      int={facility.intGain * facility.level}
    />
  </div>
  Total: {totalStats}
</div>
