<script>
  import { hero, adventure } from "../../contract_stores";
  import { getHero } from "../../contractHelpers/heroFunctions";

  export let tradeId;
  export let heroId;
  export let price;
  export let buyFunction;

  $: heroPromise = $hero ? getHeroAux() : "";
  let getHeroAux = async () => getHero(heroId, $hero, $adventure);
</script>

{#await heroPromise}
  <h2>Getting hero...</h2>
{:then hero}
  <div class="flex flex-wrap">
    <div class="">
      <img
        class="outline outline-offset-2 outline-4 justify-self-auto w-24"
        src="https://www.gravatar.com/avatar/{hero.dna}?s=150&d=identicon"
        alt="avatar"
        style="border-style:solid"
      />
      <ul style="list-style:none;padding:5px">
        <li>id: {hero.id}</li>
        <li>price: {price}</li>
      </ul>
      <button
        class="btn btn-orange"
        on:click={() => buyFunction(tradeId, price)}>Buy!</button
      >
    </div>
  </div>
{/await}
