import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemons-image';
import { getPokemons } from '~/helpers/getPokemons';
import type { SmallPokemon } from '~/interfaces';

interface PokemonPageState {
  currentPage: number;
  pokemons: SmallPokemon[];
}

export default component$(() => {

  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: []
  })

  useVisibleTask$(async ({track}) => {
    track(() => pokemonState.currentPage)

    const pokemons = await getPokemons(pokemonState.currentPage*10)
    pokemonState.pokemons = pokemons

  })

    return (<>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Actual Page: {pokemonState.currentPage}</span>
        <span>Is loading page: </span>
      </div>

      <div class="mt-10">
        <button  
          onClick$={() => pokemonState.currentPage--}        
          class="btn btn-primary mr-2">
            Prev
        </button>
        <button           
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2">
            Next
        </button>
      </div>

      <div class="grid grid-cols-5 mt-5">
        {
          pokemonState.pokemons.map((pokemon)=> (
            <div class="m-5 flex flex-col justify-center items-center" key={pokemon.name}><span class="capitalize">{pokemon.name}</span>
            <PokemonImage id={pokemon.id}/>
            </div>                      
          ))
        }
      </div>
  </>)
});

export const head: DocumentHead = {
    title: "Client-List",
    meta: [
      {
        name: "description",
        content: "First qwik application",
      },
    ],
  };