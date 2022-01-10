import Overview from "./pages/Overview.svelte"
import HeroPage from "./pages/HeroPage.svelte"
import TradingPost from "./pages/TradingPost.svelte"

const routes = [
    {
      name: '/',
      component: Overview,
    },
    { name: 'hero/:id', component: HeroPage },
    { name: 'trade', component: TradingPost}
  ]
  
  export { routes }