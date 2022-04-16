<script>
  export let item;
  export let clickItem;
</script>

<div class="m-[10px]">
  <span><strong>{item.amount} {item.name}</strong></span>
  <img
    on:click={() => clickItem(item)}
    class="border-solid mx-auto"
    width="50px"
    alt={item.description}
    src={"process.env.API_URL" + "/Item/" + item.id + ".png"}
  />
</div>
