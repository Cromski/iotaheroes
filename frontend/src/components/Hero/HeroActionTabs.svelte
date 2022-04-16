<script>
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
  import Training from "../../pages/Training.svelte";
  import Adventure from "../Adventure/Adventure.svelte";
  import ListHero from "../HeroesMarket/ListHero.svelte";
  export let hero;
  export let adventureFunction;
  export let refreshHeroData;
</script>

<Tabs>
  <TabList>
    <Tab>Adventure</Tab>
    <Tab>Training</Tab>
    <Tab>Sell</Tab>
  </TabList>

  <TabPanel>
    <Adventure {hero} {adventureFunction} />
  </TabPanel>

  <TabPanel>
    <Training {hero} {refreshHeroData} />
  </TabPanel>
  <TabPanel>
    <ListHero heroId={hero.id} />
  </TabPanel>
</Tabs>

<style>
  :global(.svelte-tabs li.svelte-tabs__tab) {
    width: 32%;
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
