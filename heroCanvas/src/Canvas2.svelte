<script>
  import { onMount } from "svelte";
  import { HeroParts } from "./HeroPartEnum";
  // parts
  let body = 4,
    face = 3,
    hair = 20,
    bodyDecArm = 1,
    bodyDecChest = 6,
    pants = 1,
    shirt = 0,
    boots = 1,
    weapon = 3;
  $: body, handleBody("hero/body/", body);
  $: face, handle("hero/face/neutral/", face, HeroParts.FACE);
  $: hair, handle("hero/hair/hairstyle/", hair, HeroParts.HAIR);
  $: bodyDecArm,
    handle(
      "hero/body_decoration/left_arm/",
      bodyDecArm,
      HeroParts.BODY_DECORATION_LEFT_ARM
    );
  $: bodyDecChest,
    handle(
      "hero/body_decoration/chest/",
      bodyDecChest,
      HeroParts.BODY_DECOARTION_CHEST
    );
  $: pants, handle("hero/legwear/", pants, HeroParts.PANTS);
  $: shirt, handleShirt("hero/torso/", shirt);
  $: boots, handle("hero/feet/", boots, HeroParts.BOOTS);
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
    imgBody.src = path + "body/" + id + ".png";
    imgBody.onload = () => {
      images.set(HeroParts.BODY, imgBody);
      draw();
    };
    imgBody.onerror = () => {
      images.delete(HeroParts.BODY);
      draw();
    };
    let imgHead = new Image();
    imgHead.src = path + "head/" + id + ".png";
    imgHead.onload = () => {
      images.set(HeroParts.HEAD, imgHead);
      draw();
    };
    imgHead.onerror = () => {
      images.delete(HeroParts.HEAD);
      draw();
    };
    let imgLeftArm = new Image();
    imgLeftArm.src = path + "left_arm/" + id + ".png";
    imgLeftArm.onload = () => {
      images.set(HeroParts.LEFT_ARM, imgLeftArm);
      draw();
    };
    imgLeftArm.onerror = () => {
      images.delete(HeroParts.LEFT_ARM);
      draw();
    };
    let imgRightArm = new Image();
    imgRightArm.src = path + "right_arm/" + id + ".png";
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
    imgBody.src = path + "body/" + id + ".png";
    imgBody.onload = () => {
      images.set(HeroParts.SHIRT_TORSO, imgBody);
      draw();
    };
    imgBody.onerror = () => {
      images.delete(HeroParts.SHIRT_TORSO);
      draw();
    };
    let imgLeftArm = new Image();
    imgLeftArm.src = path + "left_sleeve/" + id + ".png";
    imgLeftArm.onload = () => {
      images.set(HeroParts.SHIRT_LEFT_ARM, imgLeftArm);
      draw();
    };
    imgLeftArm.onerror = () => {
      images.delete(HeroParts.SHIRT_LEFT_ARM);
      draw();
    };
    let imgRightArm = new Image();
    imgRightArm.src = path + "right_sleeve/" + id + ".png";
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
    let img = new Image();
    img.src = path + id + ".png";

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
  let random = (min, max) => {
    return Math.floor(Math.random() * max) + min;
  };
  let randomize = () => {
    (body = random(1, 7)),
      (face = random(1, 7)),
      (hair = random(0, 21)),
      (bodyDecArm = random(0, 12)),
      (bodyDecChest = random(0, 10)),
      (pants = random(0, 2)),
      (shirt = random(0, 2)),
      (boots = random(0, 2)),
      (weapon = random(1, 5));
  };
</script>

<div style="max-width:800px;">
  <canvas bind:this={canvas} width={1766} height={1469} />
  <div id="selectors">
    <div class="canvasControl">
      <div>Hair ({hair})</div>
      <input type="range" bind:value={hair} min="0" max="20" />
    </div>
    <div class="canvasControl">
      <div>Body ({body})</div>
      <input type="range" bind:value={body} min="0" max="7" />
    </div>
    <div class="canvasControl">
      <div>Face ({face})</div>
      <input type="range" bind:value={face} min="0" max="7" />
    </div>
    <div class="canvasControl">
      <div>Arm decor ({bodyDecArm})</div>
      <input type="range" bind:value={bodyDecArm} min="0" max="11" />
    </div>
    <div class="canvasControl">
      <div>Chest decor ({bodyDecChest})</div>
      <input type="range" bind:value={bodyDecChest} min="0" max="10" />
    </div>
    <div class="canvasControl">
      <div>Pants ({pants})</div>
      <input type="range" bind:value={pants} min="0" max="1" />
    </div>
    <div class="canvasControl">
      <div>Shirt ({shirt})</div>
      <input type="range" bind:value={shirt} min="0" max="1" />
    </div>
    <div class="canvasControl">
      <div>Boots ({boots})</div>
      <input type="range" bind:value={boots} min="0" max="1" />
    </div>
    <div class="canvasControl">
      <div>Weapon ({weapon})</div>
      <input type="range" bind:value={weapon} min="0" max="5" />
    </div>
    <button on:click={() => randomize()}>RANDOMIZE</button>
  </div>
</div>

<style>
  canvas {
    width: 100%;
    height: 100%;
    background-color: #999;
  }
</style>
