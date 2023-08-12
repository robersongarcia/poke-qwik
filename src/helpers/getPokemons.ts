import type { PokemonListResponse, SmallPokemon } from "~/interfaces";

export const getPokemons = async (offsetNumber: number, limit: number = 10): Promise<SmallPokemon[]> => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offsetNumber}`)
    const data = await resp.json() as PokemonListResponse    

    const pokemons: SmallPokemon[] = data.results.map((pokemon) => {
        const urlParts = pokemon.url.split('/')
        const id = urlParts[urlParts.length - 2]
        return {
            id,
            name: pokemon.name
        }
    })

    return pokemons
}