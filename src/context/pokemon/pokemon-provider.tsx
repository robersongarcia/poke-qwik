import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { PokemonGameContext, type pokemonGameState, PokemonListContext, type PokemonListState  } from "~/context";


export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<pokemonGameState>({
    pokemonId: 1,
    showBack: false,
    visibility: true
  })

    const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    isFinished: false,
    pokemons: []
  })

    useContextProvider(PokemonGameContext, pokemonGame)
    useContextProvider(PokemonListContext, pokemonList)

  useVisibleTask$(() => {

    if(localStorage.getItem('pokemonGame') !== null) {
      const data = JSON.parse(localStorage.getItem('pokemonGame')!)
      pokemonGame.pokemonId = data.pokemonId
      pokemonGame.showBack = data.showBack
      pokemonGame.visibility = data.visibility
    }

  })
    //save to local storage
  useVisibleTask$(({track}) => {

    track(() => [pokemonGame.pokemonId, pokemonGame.showBack, pokemonGame.visibility])

    localStorage.setItem('pokemonGame', JSON.stringify(pokemonGame))

  })

  

  return <Slot />
});