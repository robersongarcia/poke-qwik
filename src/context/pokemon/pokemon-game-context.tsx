import { createContextId } from "@builder.io/qwik";

export interface pokemonGameState {
    pokemonId: number
    showBack: boolean
    visibility: boolean    
}

export const PokemonGameContext = createContextId<pokemonGameState>('pokemon.game-context')