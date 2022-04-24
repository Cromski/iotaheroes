<script>
  export let attributesObj;
  export let label;

  let attributes = [];
  $: attributesObj,
    (attributes = []),
    Object.keys(attributesObj).forEach((key) => {
      if (attributesObj[key] !== 0) {
        attributes = [...attributes, { name: key, value: attributesObj[key] }];
      }
    });
</script>

<div><strong>{label}</strong></div>
<div class="">
  {#each attributes as attribute}
    <div class="text-sm">
      {attribute.name.charAt(0).toUpperCase() + attribute.name.slice(1)}:
      <span class="underline">{attribute.value}</span>
    </div>
  {/each}
</div>
