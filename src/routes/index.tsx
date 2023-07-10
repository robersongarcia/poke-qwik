import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemons-image";

export default component$(() => {

  const pokemonId = useSignal<number>(1); // for primitives types, booleans, strings, numbers

  const changePokemonId = $((value: number) => {

    if(pokemonId.value + value <= 0) return

    pokemonId.value += value;

  })

  return (
    <>
      <span class="text-2xl" >Simple Search</span>
      <span class="text-9xl">{ pokemonId }</span>

      <PokemonImage id={pokemonId.value} backImage/>

      <div class="mt-2">
        <button onClick$={ () => changePokemonId(-1) } class="btn btn-primary mr-2">Prev</button>
        <button onClick$={ () => changePokemonId(+1) } class="btn btn-primary">Next</button>
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
