import { $, component$, useComputed$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$, useLocation, useNavigate } from '@builder.io/qwik-city';
import { type SmallPokemon } from '~/interfaces';
import { getPokemons } from '~/helpers/getPokemons';
import { PokemonImage } from "../../../components/pokemons/pokemons-image";


export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({query, redirect, pathname}) => {

  const offset = query.get('offset')

  const offsetNumber = offset===null ? 0 : Number(offset)

  if(isNaN(offsetNumber)){
    throw redirect(301, pathname)
  }

  if(offsetNumber < 0 ){ 
    throw redirect(301, pathname)
  }

  return await getPokemons(offsetNumber)

})

export default component$(() => {

    const pokemonData = usePokemonList()
    const location = useLocation()
    const navigate = useNavigate()
    
    const currentOffset = useComputed$(() => {
      // return location.url.searchParams.get('offset')
      const offsetString = new URLSearchParams(location.url.search)
      const offset = Number(offsetString.get('offset'))
      return offset
    })

    const onClickNav = $((value: number) => {   
      if(value < 0) return   
      navigate(`/pokemons/list-ssr?offset=${value}`, {forceReload: true})
    })

    // console.log(location.url.searchParams.get('offset'))

    return (<>
                <div class="flex flex-col">
                  <span class="my-5 text-5xl">Status</span>
                  <span>Current Offset: {currentOffset}</span>
                  <span>Is loading page: {location.isNavigating ? 'yes' : 'no'}</span>
                </div>

                <div class="mt-10">
                  <button 
                    onClick$={() => onClickNav(currentOffset.value-10)}
                    class="btn btn-primary mr-2">
                      Prev
                  </button>
                  <button 
                    onClick$={() => onClickNav(currentOffset.value+10)}
                    class="btn btn-primary mr-2">
                      Next
                  </button>
                </div>

                <div class="grid grid-cols-5 mt-5">
                  {
                    pokemonData.value.map((pokemon)=> (
                      <div class="m-5 flex flex-col justify-center items-center" key={pokemon.name}><span class="capitalize">{pokemon.name}</span>
                      <PokemonImage id={pokemon.id}/>
                      </div>                      
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