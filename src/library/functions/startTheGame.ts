import randomIdFrom from "./randomIdFrom"

export default function startTheGame(){
    const initialArray = Array.from({length:40},(_,i)=>i)
    const randomIds = randomIdFrom(initialArray,9) as number[]
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