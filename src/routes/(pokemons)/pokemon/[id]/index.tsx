import { component$, useContext, useTask$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemons-image';
import { PokemonGameContext } from '~/context';

export const usePokemonId = routeLoader$<number>(({params, redirect}) => {

  const id = Number(params.id)

  if(isNaN(id)){
    throw redirect(301, '/')
  }

  if(id <= 0 ) throw  redirect(301, '/')
  if(id > 1000 ) throw  redirect(301, '/')


  return id
})
export default component$(() => {


    // const id = useLocation().params.id;
    const pokemonUrlId = usePokemonId()
    const pokemonGame = useContext(PokemonGameContext)

    useTask$( ({track}) => {
      if(pokemonUrlId.value !== pokemonGame.pokemonId){
        pokemonGame.pokemonId = pokemonUrlId.value
      }

      track(() => pokemonUrlId)
    })

  return (
    <>
        {/* <span class="text-5xl">Pokemon: {id}</span> */}
        <span class="text-5xl">Pokemon: {pokemonGame.pokemonId}</span>


        <PokemonImage 
          id={pokemonGame.pokemonId}
          backImage={pokemonGame.showBack}
          isVisible={pokemonGame.visibility}
        />
    </>
  )
});

export const head: DocumentHead = {
  title: "Pokemon",
  meta: [
    {
      name: "description",
      content: "a individual pokemon",
    },
  ],
};
