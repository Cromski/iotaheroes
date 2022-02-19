<script>
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
  import Training from "../pages/Training.svelte";
  export let hero;
  export let adventureFunction;
  export let refreshHeroData;
  function goTrain() {
    location.href = "/train/" + hero.id;
  }
</script>

<Tabs>
  <TabList>
    <Tab>Adventure</Tab>
    <Tab>Training</Tab>
  </TabList>

  <TabPanel>
    <button
      disabled={hero.isAdventuring ? "disabled" : ""}
      class="btn btn-orange"
      on:click={adventureFunction}>Go adventure!</button
    >
  </TabPanel>

  <TabPanel>
    <Training {hero} {refreshHeroData} />
  </TabPanel>
</Tabs>

<style>
  :global(.svelte-tabs li.svelte-tabs__tab) {
    width: 49%;
    font-weight: bold;
    font-size: larger;
    color: rgb(251 146 60);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  :global(.svelte-tabs li.svelte-tabs__selected) {
    border-bottom: 2px solid rgb(251 146 60);
  }
</style>
