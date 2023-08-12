import { $, component$, useOnDocument, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemons-image';
import { getPokemons } from '~/helpers/getPokemons';
import type { SmallPokemon } from '~/interfaces';

interface PokemonPageState {
  currentPage: number;
  pokemons: SmallPokemon[];
  isLoading: boolean;
  isFinished: boolean;
}

export default component$(() => {

  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: [],
    isLoading: false,
    isFinished: false
  })

  // useVisibleTask$(async ({track}) => {
  //   track(() => pokemonState.currentPage)

  //   const pokemons = await getPokemons(pokemonState.currentPage*10)
  //   pokemonState.pokemons = [...pokemonState.pokemons,...pokemons]

  // })

  useOnDocument('scroll', $((event) => {
    console.log(event)
    const maxScroll = document.body.scrollHeight
    const currentScroll = window.scrollY + window.innerHeight

    if((currentScroll + 200 >= maxScroll) && (!pokemonState.isLoading)) {
      pokemonState.isLoading = true
      pokemonState.currentPage++
    }
  }))

  useTask$(async ({track}) => {
    track(() => pokemonState.currentPage)
    pokemonState.isLoading = true

    const pokemons = await getPokemons(pokemonState.currentPage*10, 30)
    pokemonState.pokemons = [...pokemonState.pokemons,...pokemons]

    pokemonState.isLoading = false
  })

    return (<>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Actual Page: {pokemonState.currentPage}</span>
        <span>Is loading page: </span>
      </div>

      <div class="mt-10">
        {/* <button  
          onClick$={() => pokemonState.currentPage--}        
          class="btn btn-primary mr-2">
            Prev
        </button> */}
        <button           
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary mr-2">
            Next
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-7 mt-5">
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