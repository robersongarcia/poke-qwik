import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import Navbar from "~/components/shared/navbar/navbar";
import Footer from "~/components/shared/footer/footer";

import styles from "./styles.css?inline";
import { PokemonProvider } from "~/context";


export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {

  // const pokemonGame = useStore<pokemonGameState>({
  //   pokemonId: 1,
  //   showBack: false,
  //   visibility: true
  // })

  // const pokemonList = useStore<PokemonListState>({
  //   currentPage: 0,
  //   isLoading: false,
  //   isFinished: false,
  //   pokemons: []
  // })

  // useContextProvider(PokemonGameContext, pokemonGame)
  // useContextProvider(PokemonListContext, pokemonList)

  useStyles$(styles);
  return (
    <PokemonProvider>
      <Navbar/>
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
      <Footer />
    </PokemonProvider>
  );
});
