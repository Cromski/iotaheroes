<script>
  import { Canvas, Layer, t } from "svelte-canvas";
  let images = [];
  let body = async ({ context, width, height }) => {
    let img = new Image();
    img.src = "hero/body/body/1.PNG";
    img.onload = () => context.drawImage(img, 0, 0);
  };
  let head = async ({ context, width, height }) => {
    let img = new Image();
    img.src = "hero/body/head/1.PNG";
    img.onload = () => context.drawImage(img, 0, 0);
  };
  let handle = (path) => {
    let img = new Image();
    img.src = path;
    img.onload = () => {
      images.push(img);
      draw();
    };
  };

  $: draw = ({ context, width, height }) => {
    images.forEach((i) => context.drawImage(i, 0, 0));
  };
</script>

<Canvas width={1766} height={1469}>
  <Layer render={draw} />
</Canvas>

<button on:click={() => handle("hero/body/body/1.PNG")}>Body </button>
<button on:click={() => handle("hero/body/head/1.PNG")}>Head </button>
<button on:click={handle}>Arms </button>
<button on:click={handle}>Face </button>
