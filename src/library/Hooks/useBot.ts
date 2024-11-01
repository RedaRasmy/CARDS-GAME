
import bot, { botJudge,  Difficulty } from "../functions/bot"
// import isIdentical from "../functions/isIdentical"
import randomIdFrom from "../functions/randomIdFrom"
import requirements, { Requirements } from "../functions/requirements"
import { addCard, changeCurrentCard, changeRequirements, removeCard, takeCard } from "../redux/slices/cardsFlow"
import { addTurn, toggleTurn } from "../redux/slices/gameFlow"
import { useAppDispatch, useAppSelector } from "../redux/store"
import useCard from "./useCard"

export default function useBot(diff:Difficulty) {
    const dispatch = useAppDispatch()
    const {Add3CardsTo,playerCards} = useCard()
    const {
        // requirements:requirementsValue, // to not conflect with requirements() fct
        botCards,
        cardsLeft,
    } = useAppSelector((state)=>state.cardsFlow)


    function BotPlay(requ:Requirements){
        const card = bot(botCards,requ,diff,playerCards.length)
        if (card===undefined){
            const randomId = randomIdFrom(cardsLeft) as number
            dispatch(takeCard(randomId))
            dispatch(addCard({cardId:randomId,player:'bot'}))
            dispatch(toggleTurn())
            // save turn's data
            dispatch(addTurn({
                player: 'bot',
                action: '+Card',
                cardId: randomId,
            }))
        }else {
            dispatch(changeCurrentCard(card))
            dispatch(changeRequirements(requirements(card)))
            dispatch(removeCard({cardId:card,player:'bot'}))
            // save turn's data
            dispatch(addTurn({
                player: 'bot',
                action: '-Card',
                cardId: card,
            }))
            /// if +3 Card
            if (card%10 === 7){
            Add3CardsTo("player")
            // setscrollIntoView(true)
            }
            /// if Judge Card
            else if (card%10 === 8){
                const color = botJudge(botCards,diff) as string
                dispatch(changeRequirements([color]))
            }
            // skip Card
            else if (card % 10 === 9) {
                return true
            }
            dispatch(toggleTurn())
            return;
        }
    }


    return {
        BotPlay,
    }
}