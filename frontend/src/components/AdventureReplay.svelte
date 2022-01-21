<script>
  import { slide, fly } from "svelte/transition";
  import RangeSlider from "svelte-range-slider-pips";

  import Time from "svelte-time";
  import Item from "./Item.svelte";

  export let adventure;
  export let tokenUri;

  let isOpen = false;
  let replayComplete = false;
  let loot;
  const toggle = () => {
    if (isOpen) {
      reset();
      isOpen = false;
    } else {
      play();
      isOpen = true;
    }
  };
  let maxHeroHP = adventure.Hero.Constitution;
  let maxEncounterHP = adventure.Encounters[0].Attributes.Constitution;
  let currentHeroHP = [adventure.Hero.Constitution];
  let currentEncounterHP = [adventure.Encounters[0].Attributes.Constitution];
  let currentHeroRoll = 0;
  let currentEncounterRoll = 0;
  let interval;
  let final = "";

  $: heroColorNormalized = [Math.round((currentHeroHP / maxHeroHP) * 100)];
  $: encounterColorNormalized = [
    Math.round((currentEncounterHP / maxEncounterHP) * 100),
  ];

  $: heroColor = `hsl(${heroColorNormalized[0]}, 100%, 60%)`;
  $: heroLightColor = `hsl(${heroColorNormalized[0]}, 65%, 80%)`;

  $: encounterLightColor = `hsl(${encounterColorNormalized[0]}, 65%, 80%)`;
  $: encounterColor = `hsl(${encounterColorNormalized[0]}, 100%, 60%)`;

  function play() {
    var logCount = adventure.Encounters[0].EncounterLogs.length;
    var iter = 0;
    loot = adventure.Loot;

    interval = setInterval(function () {
      var log = adventure.Encounters[0].EncounterLogs[iter];
      currentHeroHP[0] = log.HeroConstitution;
      currentEncounterHP[0] = log.EncounterConstitution;
      if (iter == logCount - 1) {
        replayComplete = true;
        // loot = adventure.Loot;
        if (currentHeroHP == 0) {
          final = "You passed out :(";
        } else {
          final = "You won!";
        }
      } else {
        currentHeroRoll = log.HeroRoll;
        currentEncounterRoll = log.EncounterRoll;
      }

      iter++;
      if (iter == logCount) {
        clearInterval(interval);
      }
    }, 1500);
  }
  function reset() {
    clearInterval(interval);
    replayComplete = false;
    currentHeroHP = [adventure.Hero.Constitution];
    currentEncounterHP = [adventure.Encounters[0].Attributes.Constitution];
  }
</script>

<div>
  Adventure Id: {adventure.Id}
  {#if adventure.CompletedAt}
    (<Time live={1 * 1000} relative timestamp={adventure.CompletedAt} />)
  {/if}
  <strong on:click={toggle}>Replay</strong>
</div>
{#if isOpen}
  <div transition:slide={{ duration: 300 }}>
    <div class="outline outline-offset-2 outline-4 grid grid-cols-6 gap-4">
      {#if replayComplete}
        <div class="grow row-span-full col-start-3 col-span-2 self-center">
          <strong>{final}</strong>
          <div
            transition:slide={{ duration: 300 }}
            class="outline outline-offset-2 outline-4 grid grid-cols-3"
          >
            <div class="col-span-3">You looted these items:</div>
            {#each loot.TokenIds as lootItem, i}
              <Item
                uri={tokenUri}
                itemId={loot.TokenIds[i]}
                qty={loot.Amounts[i]}
              />
            {/each}
          </div>
        </div>
      {/if}
      <div
        class="row-span-full col-start-2 col-span-4 self-center grid grid-cols-4"
      >
        <div
          class="grid grid-cols-1 justify-items-center"
          style="--range-range-inactive: {heroColor};--range-range: {heroColor}; --range-slider: {heroLightColor}"
        >
          <span>Hero</span>
          <RangeSlider
            float
            id="heroHealthBar"
            disabled
            vertical
            values={currentHeroHP}
            range="min"
            min={0}
            max={maxHeroHP}
          />
        </div>
        {#if !replayComplete}
          {#key currentHeroRoll}
            <div in:fly={{ y: 25, duration: 1500 }} class="">
              Roll: {currentHeroRoll}
            </div>

            <div in:fly={{ y: 25, duration: 1500 }} class="">
              Roll: {currentEncounterRoll}
            </div>
          {/key}
        {:else}
          <div />
          <div />
        {/if}
        <div
          class="grid grid-cols-1 justify-items-center"
          style="--range-range-inactive: {encounterColor};--range-range: {encounterColor}; --range-slider: {encounterLightColor}"
        >
          <span>Encounter</span>
          <RangeSlider
            id="encounterHealthBar"
            float
            disabled
            vertical
            values={currentEncounterHP}
            range="min"
            min={0}
            max={maxEncounterHP}
          />
        </div>
      </div>
    </div>
  </div>
{/if}
