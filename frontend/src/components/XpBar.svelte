<script>
  import ProgressBar from "@okrad/svelte-progressbar";
  export let perc;
  export let color;

  let progressBarWidth = 250;
</script>

<div class="border-1 border-black w-full">
  <ProgressBar
    series={[{ perc: perc, color: color }]}
    textSize={82}
    width={progressBarWidth}
    height={20}
  />
</div>
