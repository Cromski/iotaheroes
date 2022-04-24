import Overview from "./pages/Overview.svelte"
import HeroPage from "./pages/HeroPage.svelte"
import TradingPost from "./pages/TradingPost.svelte"
import Inventory from "./pages/Inventory.svelte"
import Shop from "./pages/Shop.svelte"
import TrainingFacilities from "./pages/TrainingFacilities.svelte"
import HeroMarketplace from "./pages/HeroMarketplace.svelte"

const routes = {
    '/hero/:id': HeroPage,
    '/inventory': Inventory,
    '/trade': TradingPost,
    '/heromarket': HeroMarketplace,
    '/heromarket/:id?': HeroMarketplace,
    '/shop/:id': Shop,
    '/upgrade': TrainingFacilities,
    '/': Overview,

}

  /* Old routes
  const routes = [
    {
      name: '/',
      component: Overview,
    },
    { name: 'hero/:id', component: HeroPage },
    { name: 'trade', component: TradingPost},
    { name: 'heromarket', component: HeroMarketplace},
    { name: 'heromarket/:id', component: HeroListingDetailed},

    { name: 'shop/:id', component: Shop},
    { name: 'upgrade', component: TrainingFacilities},

  ]

  */
  
  export { routes }