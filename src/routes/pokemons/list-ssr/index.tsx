import { component$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$ } from '@builder.io/qwik-city';
import { type PokemonsInfo, type PokemonListResponse } from "../../../interfaces/pokemon-list-response";


export const usePokemonList = routeLoader$<PokemonsInfo[]>(async () => {

  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)
  const data = await resp.json() as PokemonListResponse

  return data.results

})

export default component$(() => {

    const pokemonData = usePokemonList()

    return (<>
                <div class="flex flex-col">
                  <span class="my-5 text-5xl">Status</span>
                  <span>Current Offset: xxxx</span>
                  <span>Is loading page: xxxx</span>
                </div>

                <div class="mt-10">
                  <Link class="btn btn-primary mr-2">Prev</Link>
                  <Link class="btn btn-primary mr-2">Next</Link>
                </div>

                <div class="grid grid-cols-6 mt-5">
                  <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
                  {
                    pokemonData.value.map((pokemon)=> (
                      <div class="m-5 flex flex-col justify-center items-center" key={pokemon.name}><span class="capitalize">{pokemon.name}</span></div>
                    ))
                  }
                </div>
            </>)          
});


export const head: DocumentHead = {
    title: "SSR-List",
    meta: [
      {
        name: "description",
        content: "First qwik application",
      },
    ],
  };