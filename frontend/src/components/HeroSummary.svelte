<script>
  import Time from "svelte-time";
  export let id;
  export let dna;
  export let xp;
  export let mental;
  export let physical;
  export let level;
  export let restingTill;
  export let debug;
</script>

<img
  src="https://www.gravatar.com/avatar/{dna}?s=150&d=identicon"
  alt="avatar"
  style="border-style:solid"
/>
<ul style="list-style:none;padding:25px">
  <li>id: {id}</li>
  <li>dna: {dna}</li>
  <li>xp: {xp}</li>
  <li>mental: {mental}</li>
  <li>physical: {physical}</li>
  <li>level: {level}</li>
  <li>
    Ready: <strong
      ><Time live={1 * 1000} relative timestamp={restingTill * 1000} /></strong
    >
  </li>
  <li>debug: {debug}</li>
</ul>
