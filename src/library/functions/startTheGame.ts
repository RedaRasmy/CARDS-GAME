import { PlayersNumber } from "../redux/slices/gameFlow"
import randomIdFrom from "./randomIdFrom"

export default function startTheGame(playersNumber:PlayersNumber=2){
    const initialArray = Array.from({length:40},(_,i)=>i)
    const randomIds = randomIdFrom(initialArray,(1+playersNumber*4)) as number[]
    const initialCurrentCard = randomIds[0]
    const initialPayerCards = randomIds.slice(1,5)
    const initialBotCards = randomIds.slice(5,9)
    const initialCardsLeft = initialArray.filter(id=>!randomIds.includes(id))

    return {
        initialCurrentCard,
        initialPayerCards,
        initialBotCards,
        initialCardsLeft,
    }
}