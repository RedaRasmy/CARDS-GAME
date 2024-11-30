import { PlayersNumber } from "../redux/slices/gameFlow"
import randomIdFrom from "./randomIdFrom"

export default function startTheGame(playersNumber:PlayersNumber=2){
    const initialArray = Array.from({length:40},(_,i)=>i)
    const randomIds = randomIdFrom(initialArray,(1+playersNumber*4)) as number[]
    const initialCurrentCard = randomIds[0]
    const initialCardsLeft = initialArray.filter(id=>!randomIds.includes(id))

    let hands = [] as number[][]
    if (playersNumber === 2 ) {
        hands = [
            randomIds.slice(1,5),
            randomIds.slice(5,9)
        ]
    } else if (playersNumber === 3 ) {
        hands = [
            randomIds.slice(1,5),
            randomIds.slice(5,9),
            randomIds.slice(9,13),
        ]
    } else  {
        hands = [
            randomIds.slice(1,5),
            randomIds.slice(5,9),
            randomIds.slice(9,13),
            randomIds.slice(13,17),
        ]
    }

    return {
        initialCurrentCard,
        hands,
        initialCardsLeft,
    }
}