import isIdentical from "../isIdentical"
import { Requirements } from "../requirements"

export default function getGoodCards(cards:number[],requ:Requirements) {
    const output:number[] = []
    for (const card of cards){
        if (isIdentical(card,requ)){
            output.push(card)
        }
    }
    return output
}