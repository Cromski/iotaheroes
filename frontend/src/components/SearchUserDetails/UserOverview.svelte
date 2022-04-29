<script>
  export let user;
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";

  import { getHeroes } from "../../contractHelpers/heroFunctions";
  import { getInventory } from "../../contractHelpers/tokenFunctions";
  import { adventure, hero, token } from "../../stores/contract_stores";
  import HeroSummarySmall from "../../components/Hero/HeroSummarySmall.svelte";
  import InventoryItem from "../Inventory/InventoryItem.svelte";
  import { push } from "svelte-spa-router";
  $: heroesPromise = $hero ? getHeroesAux() : "";
  $: inventoryPromise = $token ? getInventoryAux() : "";

  let getHeroesAux = async () => getHeroes($hero, $adventure, user.address);
  let getInventoryAux = async () => getInventory($token, user.address);
</script>

<Tabs>
  <TabList>
    <Tab>Heroes</Tab>
    <Tab>Inventory</Tab>
  </TabList>
  <TabPanel>
    {#await heroesPromise}
      <h3>Getting hero data....</h3>
    {:then heroes}
      <div class="flex flex-wrap justify-center mt-10">
        {#each heroes as hero, i}
          <div>
            <HeroSummarySmall {hero} />
            <button
              class="btn-sm btn-orange"
              on:click={() => push("/hero/" + hero.id)}>Select hero</button
            >
          </div>
        {/each}
      </div>
    {/await}
  </TabPanel>

  <TabPanel>
    {#await inventoryPromise}
      <h3>Getting item data...</h3>
    {:then inventory}
      <div class="flex">
        {#each inventory as item, i}
          <div>
            <InventoryItem {item} />
          </div>
        {/each}
      </div>
    {/await}
  </TabPanel>
</Tabs>
