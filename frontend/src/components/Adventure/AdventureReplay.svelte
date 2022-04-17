<script>
  import { slide, fly } from "svelte/transition";
  import RangeSlider from "svelte-range-slider-pips";
  import { getItem } from "../../contractHelpers/tokenFunctions";

  import Time from "svelte-time";
  import Item from "../Item.svelte";

  export let adventure;

  let isOpen = false;
  let replayComplete = false;
  let loot;
  const toggle = (playAdventure) => {
    if (isOpen) {
      reset();
      isOpen = false;
    } else {
      if (playAdventure) {
        play(1500);
      } else {
        play(1);
      }

      isOpen = true;
    }
  };
  $: itemsPromise = getLootItems();
  let getLootItems = async () => {
    let items = [];
    adventure.loot.tokenIds.forEach(async (itemId, i) => {
      let metadata = await getItem(itemId);
      let amount = adventure.loot.amounts[i];
      items.push({
        amount,
        ...metadata,
      });
    });
    return items;
  };

  let maxHeroHP = adventure.hero.constitution;
  let maxEncounterHP = adventure.encounters[0].attributes.constitution;
  let currentHeroHP = [adventure.hero.constitution];
  let currentEncounterHP = [adventure.encounters[0].attributes.constitution];
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

  function play(delay) {
    var logCount = adventure.encounters[0].encounterLogs.length;
    var iter = 0;
    loot = adventure.Loot;

    interval = setInterval(function () {
      var log = adventure.encounters[0].encounterLogs[iter];
      currentHeroHP[0] = log.heroConstitution;
      currentEncounterHP[0] = log.encounterConstitution;
      if (iter == logCount - 1) {
        replayComplete = true;
        // loot = adventure.Loot;
        if (currentHeroHP <= 0) {
          final = "You passed out :(";
        } else {
          final = "You won!";
        }
      } else {
        currentHeroRoll = log.heroRoll;
        currentEncounterRoll = log.encounterRoll;
      }

      iter++;
      if (iter == logCount) {
        clearInterval(interval);
      }
    }, delay);
  }
  function reset() {
    clearInterval(interval);
    replayComplete = false;
    currentHeroHP = [adventure.hero.constitution];
    currentEncounterHP = [adventure.encounters[0].attributes.constitution];
  }
</script>

<div>
  Adventure Id: {adventure.id}
  {#if adventure.completedAt}
    (<Time live={1 * 1000} relative timestamp={adventure.completedAt} />)
  {/if}
  <strong style="cursor:pointer" on:click={() => toggle(true)}>Replay</strong> |
  <strong style="cursor:pointer" on:click={() => toggle(false)}>Summary</strong>
</div>
{#if isOpen}
  <div transition:slide={{ duration: 300 }}>
    <div class="outline outline-offset-2 outline-4 grid grid-cols-6 gap-4">
      {#if replayComplete}
        <div class="grow row-span-full col-start-3 col-span-2 self-center">
          <strong>{final}</strong>
          {#if adventure.loot.tokenIds.length > 0}
            {#await itemsPromise}
              <p>Grabbing item data..</p>
            {:then items}
              <div
                transition:slide={{ duration: 300 }}
                class="outline outline-offset-2 outline-4 grid grid-cols-3"
              >
                <div class="col-span-3">You looted these items:</div>
                {#each adventure.loot.tokenIds as lootItem, i}
                  <Item item={items[i]} />
                {/each}
              </div>
            {/await}
          {/if}
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
