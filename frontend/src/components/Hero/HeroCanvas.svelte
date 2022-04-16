<script>
  import { onMount } from "svelte";
  import { HeroParts } from "./HeroPartEnum";
  // parts
  export let body = 4,
    face = 3,
    hair = 20,
    armDecor = 1,
    chestDecor = 6,
    pants = 1,
    shirt = 0,
    boots = 1,
    legDecor = -1,
    feet = 0,
    weapon = 3;

  $: body, handleBody("hero/body/", body);
  $: face, handle("hero/face/neutral/", face, HeroParts.FACE);
  $: hair, handle("hero/hair/hairstyle/", hair, HeroParts.HAIR);
  $: armDecor,
    handle(
      "hero/body_decoration/left_arm/",
      armDecor,
      HeroParts.BODY_DECORATION_LEFT_ARM
    );
  $: chestDecor,
    handle(
      "hero/body_decoration/chest/",
      chestDecor,
      HeroParts.BODY_DECOARTION_CHEST
    );
  $: pants, handle("hero/legwear/", pants, HeroParts.PANTS);
  $: shirt, handleShirt("hero/torso/", shirt);
  $: feet, handle("hero/feet/", feet, HeroParts.BOOTS);
  $: weapon, handle("hero/weapon/", weapon, HeroParts.WEAPON);
  let canvas;
  let context;
  let images = new Map();

  onMount(() => {
    context = canvas.getContext("2d");
    draw();
  });
  function handleBody(path, id) {
    let imgBody = new Image();
    imgBody.src = path + "body/" + id + ".PNG";
    imgBody.onload = () => {
      images.set(HeroParts.BODY, imgBody);
      draw();
    };
    imgBody.onerror = () => {
      images.delete(HeroParts.BODY);
      draw();
    };
    let imgHead = new Image();
    imgHead.src = path + "head/" + id + ".PNG";
    imgHead.onload = () => {
      images.set(HeroParts.HEAD, imgHead);
      draw();
    };
    imgHead.onerror = () => {
      images.delete(HeroParts.HEAD);
      draw();
    };
    let imgLeftArm = new Image();
    imgLeftArm.src = path + "left_arm/" + id + ".PNG";
    imgLeftArm.onload = () => {
      images.set(HeroParts.LEFT_ARM, imgLeftArm);
      draw();
    };
    imgLeftArm.onerror = () => {
      images.delete(HeroParts.LEFT_ARM);
      draw();
    };
    let imgRightArm = new Image();
    imgRightArm.src = path + "right_arm/" + id + ".PNG";
    imgRightArm.onload = () => {
      images.set(HeroParts.RIGHT_ARM, imgRightArm);
      draw();
    };
    imgRightArm.onerror = () => {
      images.delete(HeroParts.RIGHT_ARM);
      draw();
    };
  }
  function handleShirt(path, id) {
    let imgBody = new Image();
    imgBody.src = path + "body/" + id + ".PNG";
    imgBody.onload = () => {
      images.set(HeroParts.SHIRT_TORSO, imgBody);
      draw();
    };
    imgBody.onerror = () => {
      images.delete(HeroParts.SHIRT_TORSO);
      draw();
    };
    let imgLeftArm = new Image();
    imgLeftArm.src = path + "left_sleeve/" + id + ".PNG";
    imgLeftArm.onload = () => {
      images.set(HeroParts.SHIRT_LEFT_ARM, imgLeftArm);
      draw();
    };
    imgLeftArm.onerror = () => {
      images.delete(HeroParts.SHIRT_LEFT_ARM);
      draw();
    };
    let imgRightArm = new Image();
    imgRightArm.src = path + "right_sleeve/" + id + ".PNG";
    imgRightArm.onload = () => {
      images.set(HeroParts.SHIRT_RIGHT_ARM, imgRightArm);
      draw();
    };
    imgRightArm.onerror = () => {
      images.delete(HeroParts.SHIRT_RIGHT_ARM);
      draw();
    };
  }
  function handle(path, id, z) {
    if (id === null) {
      return;
    }
    let img = new Image();
    img.src = path + id + ".PNG";

    img.onload = () => {
      images.set(z, img);
      draw();
    };
    img.onerror = () => {
      images.delete(z);
      draw();
    };
  }
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var drawOrder = new Map([...images.entries()].sort((a, b) => a[0] - b[0]));
    drawOrder.forEach((i) => {
      context.drawImage(i, 0, 0);
    });
  }
</script>

<canvas bind:this={canvas} width={1766} height={1469} />

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
