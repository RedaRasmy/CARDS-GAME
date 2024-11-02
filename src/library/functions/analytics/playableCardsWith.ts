import { cards } from "../../../../public/cards"

export default function playableCardsWith(id:number):number[]{
    // the output is an array of 12 id or 9 (if special card)
    // (the first 9 playable with color) and (the last 3 playable with number or 0)
    const output:number[] = []
    for (const card of cards) {
        if (card.id !== id) {
            if (card.color === cards[id].color){
                output.unshift(card.id)
            }
            if ( (id%10 < 7) && card.number === cards[id].number ){
                output.push(card.id)
            }
        }
    }
    return output
}