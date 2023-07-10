import { component$ } from "@builder.io/qwik"

interface Props {
    id: number
    size?: number
    backImage?: boolean
}

export const PokemonImage = component$(({id,size = 150, backImage = false}: Props) => {


    return <img 
                width={size}
                height={size}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${backImage?"/back":""}/${id}.png`} 
                alt="Pokemon Sprite" 
            />
})