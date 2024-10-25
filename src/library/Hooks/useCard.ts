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
    function playWithClick(id:number){
        if(isIdentical(id,currentCardId)){
            dispatch(changeCurrentCard(id))
            dispatch(removeCard(id))
        }
    }
    
    function playerTakeCard(){
        const randomId = randomIdFrom(cardsLeft) as number
        if (cardsLeft.length>0) {
            dispatch(addCard({cardId:randomId}))
            dispatch(takeCard(randomId))      
        }
    }
    const getCardIndex = (id:number) => playerCards.findIndex(cardId=> cardId === id)

    const handleDragEnd = (event:DragEndEvent)=>{
        // Sorting Logic
        const {active,over} = event
        const i1 = getCardIndex(Number(active.id))
        const i2 = getCardIndex(Number(over?.id))
        // if ((active.id === over?.id) || !isSortable ) return;
        if (isSortable && (active.id !== over?.id)){
            dispatch(changeCardOrder({index1:i1,index2:i2}))
        }
        // Dropping Logic
        if (over && (over.id === 'droppable')){
            // Test
            const cardIdToTest = Number(active.id)
            if(isIdentical(cardIdToTest,currentCardId)){
                dispatch(changeCurrentCard(cardIdToTest))
                dispatch(removeCard(cardIdToTest))
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
            handleDragEnd
    }
}