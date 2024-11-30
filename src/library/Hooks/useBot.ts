
import { useEffect } from "react"
import bot, { botJudge,  Difficulty } from "../functions/bot"
// import isIdentical from "../functions/isIdentical"
import randomIdFrom from "../functions/randomIdFrom"
import requirements, { Requirements } from "../functions/requirements"
import { addCard, changeCurrentCard, changeRequirements, removeCard, takeCard } from "../redux/slices/cardsFlow"
import { addTurn, finishTurn,  } from "../redux/slices/gameFlow"
import { useAppDispatch} from "../redux/store"
import useCard from "./useCard"
import { playSound } from "../functions/playSounds"

export default function useBot(diff:Difficulty) {
    const dispatch = useAppDispatch()
    const {Add3CardsTo,hands,cardsLeft,currentPlayer,requirementsValue} = useCard()


    function BotPlay(requ:Requirements,botId:number){
        const botCards = hands[botId]
        const card = bot(botCards,requ,diff,hands[0].length)
        if (card===undefined){
            playSound('/sounds/takeCardSound.wav')
            const randomId = randomIdFrom(cardsLeft) as number
            dispatch(takeCard(randomId))
            dispatch(addCard({cardId:randomId,playerId:botId}))
            dispatch(finishTurn())
            // save turn's data
            dispatch(addTurn({
                player: botId as 0 | 1 | 2 | 3,
                action: '+Card',
                cardId: randomId,
            }))
        }else {
            playSound('/sounds/playCardSound.wav')
            dispatch(changeCurrentCard(card))
            dispatch(changeRequirements(requirements(card)))
            dispatch(removeCard({cardId:card,playerId:botId}))
            // save turn's data
            dispatch(addTurn({
                player: botId as 0 | 1 | 2 | 3,
                action: '-Card',
                cardId: card,
            }))
            /// if +3 Card
            if (card%10 === 7){
            Add3CardsTo(botId+1)
            }
            /// if Judge Card
            else if (card%10 === 8){
                const color = botJudge(botCards,diff) as string
                dispatch(changeRequirements([color]))
            }
            // skip Card
            else if (card % 10 === 9) {
                BotPlay(requirements(card),botId)
            }
            dispatch(finishTurn())
            return;
        }
    }
    useEffect(()=>{
        const play = setTimeout(()=>{
            if(currentPlayer !== 0) {
                BotPlay(requirementsValue,currentPlayer)
            }
        },5000)
        return () => clearTimeout(play);
    },[currentPlayer,BotPlay])

    useEffect(()=>{
        console.log('current player :',currentPlayer)
        if(currentPlayer !== 0) {
            setTimeout(() => {
                BotPlay(requirementsValue,currentPlayer)
            }, (2000));
        }
        const timer = setTimeout(()=>{
            dispatch(finishTurn())
        },10000)
        return () => clearTimeout(timer);
    },[currentPlayer,dispatch,BotPlay])

    return {
        BotPlay,
    }
}