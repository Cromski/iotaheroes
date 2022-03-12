import Overview from "./pages/Overview.svelte"
import HeroPage from "./pages/HeroPage.svelte"
import TradingPost from "./pages/TradingPost.svelte"
import Shop from "./pages/Shop.svelte"
import TrainingFacilities from "./pages/TrainingFacilities.svelte"
import HeroMarketplace from "./pages/HeroMarketplace.svelte"


const routes = [
    {
      name: '/',
      component: Overview,
    },
    { name: 'hero/:id', component: HeroPage },
    { name: 'trade', component: TradingPost},
    { name: 'heromarket', component: HeroMarketplace},
    { name: 'shop/:id', component: Shop},
    { name: 'upgrade', component: TrainingFacilities},

  ]
  
  export { routes }