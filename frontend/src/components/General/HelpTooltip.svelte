<script>
  import Info from "svelte-icons/md/MdHelp.svelte";
  import SvelteTooltip from "svelte-tooltip";
  export let tip;
</script>

<div class="tooltip-wrapper">
  <SvelteTooltip color="#ff9933" {tip}>
    <div class="cursor-help icon-sm">
      <Info />
    </div>
  </SvelteTooltip>
</div>
