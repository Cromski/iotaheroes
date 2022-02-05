import Overview from "./pages/Overview.svelte"
import HeroPage from "./pages/HeroPage.svelte"
import TradingPost from "./pages/TradingPost.svelte"
import Shop from "./pages/Shop.svelte"
import TrainingFacilities from "./pages/TrainingFacilities.svelte"
import Training from "./pages/Training.svelte"


const routes = [
    {
      name: '/',
      component: Overview,
    },
    { name: 'hero/:id', component: HeroPage },
    { name: 'trade', component: TradingPost},
    { name: 'shop/:id', component: Shop},
    { name: 'upgrade', component: TrainingFacilities},
    { name: 'train/:id', component: Training}

  ]
  
  export { routes }