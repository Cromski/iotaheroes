<script>
  import Canvas2 from "./Canvas2.svelte";

  export let name;
</script>

<main>
  <Canvas2 />
</main>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
