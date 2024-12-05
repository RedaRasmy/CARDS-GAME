
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
import useGame from "./useGame"

export default function useBot(diff:Difficulty) {
    const {gameIsOn,playersNumber} = useGame()
    const dispatch = useAppDispatch()
    const {
        Add3CardsTo,
        hands,
        cardsLeft,
        currentPlayer,
        requirementsValue,
        
    } = useCard()


    function BotPlay(requ:Requirements,botId:number){
        if (!gameIsOn) return;
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
            const victim = (botId === playersNumber-1) ? 0 : botId+1
            Add3CardsTo(victim)
            }
            /// if Judge Card
            else if (card%10 === 8){
                const color = botJudge(botCards,diff) as string
                dispatch(changeRequirements([color]))
            }
            // skip Card
            else if (card % 10 === 9) {
                dispatch(finishTurn())
            }
            dispatch(finishTurn())
            return;
        }
    }


    useEffect(()=>{
        if (!gameIsOn) return ;
        if(currentPlayer !== 0) {
            const rarity = Math.random() < 0.01
            const delay = Math.random()*(rarity ? 8500 : 2000) + 1000
            setTimeout(() => {
                BotPlay(requirementsValue,currentPlayer)
            }, (delay));
        }
        const timer = setTimeout(()=>{
            dispatch(finishTurn())
        },10000)
        return () => clearTimeout(timer);
    },[currentPlayer,dispatch,BotPlay,gameIsOn])

    return {
        BotPlay,
    }
}