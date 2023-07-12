import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemons-image";

export default component$(() => {

  const pokemonId = useSignal<number>(1) // for primitives types, booleans, strings, numbers
  const showBack = useSignal<boolean>(false) // for primitives types, booleans, strings, numbers
  const visibility = useSignal<boolean>(true) // for primitives types, booleans, strings, numbers

  const changePokemonId = $((value: number) => {

    if(pokemonId.value + value <= 0) return

    pokemonId.value += value;

  })

  return (
    <>
      <span class="text-2xl" >Simple Search</span>
      <span class="text-9xl">{ pokemonId }</span>

      <PokemonImage id={pokemonId.value} backImage={showBack.value} isVisible={visibility.value}/>

      <div class="mt-2">
        <button onClick$={ () => changePokemonId(-1) } class="btn btn-primary mr-2">Prev</button>
        <button onClick$={ () => changePokemonId(+1) } class="btn btn-primary mr-2">Next</button>
        <button onClick$={ () => visibility.value = !visibility.value } class="btn btn-primary mr-2">{visibility.value ? "Hide": "Show"}</button>
        <button onClick$={ () => showBack.value = !showBack.value } class="btn btn-primary">Flip</button>
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
