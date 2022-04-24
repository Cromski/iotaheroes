<script>
  export let item;
</script>

<div class="m-[10px]">
  <span><strong>{item.amount} {item.name}</strong></span>
  <img
    class="border-solid mx-auto"
    width="50px"
    alt={item.description}
    src={"items/" + item.id + ".png"}
  />
</div>
