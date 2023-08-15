import { $, component$, useContext } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemons-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {

  const pokemonGame = useContext(PokemonGameContext)

  // const pokemonId = useSignal<number>(1) // for primitives types, booleans, strings, numbers
  // const showBack = useSignal<boolean>(false) // for primitives types, booleans, strings, numbers
  // const visibility = useSignal<boolean>(true) // for primitives types, booleans, strings, numbers
  const nav = useNavigate()

  const changePokemonId = $((value: number) => {

    if(pokemonGame.pokemonId + value <= 0) return

    pokemonGame.pokemonId += value;

  })

  const gotToPokemon = $(async () => {
    await nav(`pokemon/${pokemonGame.pokemonId}`)
  })

  return (
    <>
      <span class="text-2xl" >Simple Search</span>
      <span class="text-9xl">{ pokemonGame.pokemonId }</span>


      <div onClick$={() => gotToPokemon()}>
        <PokemonImage 
          id={pokemonGame.pokemonId} 
          backImage={pokemonGame.showBack} 
          isVisible={pokemonGame.visibility}
        />
      </div>

      <div class="mt-2">
        <button onClick$={ () => changePokemonId(-1) } class="btn btn-primary mr-2">Prev</button>
        <button onClick$={ () => changePokemonId(+1) } class="btn btn-primary mr-2">Next</button>
        <button onClick$={ () => pokemonGame.visibility = !pokemonGame.visibility } class="btn btn-primary mr-2">{pokemonGame.visibility ? "Hide": "Show"}</button>
        <button onClick$={ () => pokemonGame.showBack = !pokemonGame.showBack } class="btn btn-primary">Flip</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Poke Qwik",
  meta: [
    {
      name: "description",
      content: "First qwik application",
    },
  ],
};
