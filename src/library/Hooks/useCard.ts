'use client'
import { useAppDispatch,useAppSelector } from "../redux/store"
import randomIdFrom from "../functions/randomIdFrom"
import isIdentical from "../functions/isIdentical"
import { addCard, removeCard,changeCurrentCard,takeCard, changeCardOrder, } from "../redux/slices/cardsFlow"
import { DragEndEvent } from "@dnd-kit/core"

export default function useCard() {
    const dispatch = useAppDispatch()
    const cardsFlow = useAppSelector((state)=>state.cardsFlow)
    const currentCardId = cardsFlow.currentCardId
    const cardsLeft = cardsFlow.cardsLeft
    const playerCards = cardsFlow.playerCards
    const botCards = cardsFlow.botCards
    const isSortable = useAppSelector(state=>state.settings.sorting)

    //// FUNCTIONS
    function BotPlay(currentCard:number){
        for (const card of botCards){
            if (isIdentical(card,currentCard)){
                dispatch(changeCurrentCard(card))
                dispatch(removeCard({cardId:card,player:'bot'}))
                return;
            }
        }
        const randomId = randomIdFrom(cardsLeft) as number
        dispatch(takeCard(randomId))
        dispatch(addCard({cardId:randomId,player:'bot'}))
    }

    function playWithClick(id:number){
        if(isIdentical(id,currentCardId)){
            dispatch(changeCurrentCard(id))
            dispatch(removeCard({cardId:id,player:'player'}))
            return true
        }
        return false
    }
    
    function playerTakeCard(){
        const randomId = randomIdFrom(cardsLeft) as number
        if (cardsLeft.length>0) {
            dispatch(addCard({cardId:randomId,player:'player'}))
            dispatch(takeCard(randomId))
            return true  
        }
        return false
    }
    const getCardIndex = (id:number) => playerCards.findIndex(cardId=> cardId === id)

    const handleDragEnd = (event:DragEndEvent)=>{
        // Sorting Logic
        const {active,over} = event
        const i1 = getCardIndex(Number(active.id))
        const i2 = getCardIndex(Number(over?.id))
        
        if (isSortable && (active.id !== over?.id)){
            dispatch(changeCardOrder({index1:i1,index2:i2}))
        }
        // Dropping Logic
        if (over && (over.id === 'droppable')){
            // Test
            const cardIdToTest = Number(active.id)
            if(isIdentical(cardIdToTest,currentCardId)){
                dispatch(changeCurrentCard(cardIdToTest))
                dispatch(removeCard({cardId:cardIdToTest,player:'player'}))
                // BotPlay()
            }
        }
    }
    return {
        // infos
            cardsLeft,
            playerCards,
            botCards,
            currentCardId,
        // functions
            playerTakeCard,
            playWithClick,
            BotPlay,
            handleDragEnd
    }
}