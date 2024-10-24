'use client'
import { useAppDispatch, useAppSelector } from "../store"
import randomIdFrom from "../functions/randomIdFrom"
import isIdentical from "../functions/isIdentical"
import { DragEvent} from "react"
import { addCard, removeCard,changeCurrentCard,takeCard, } from "../slices/cardsFlow"

export default function useCard() {
    const dispatch = useAppDispatch()
    const cardsFlow = useAppSelector(state=>state.cardsFlow)
    const currentCardId = cardsFlow.currentCardId
    const cardsLeft = cardsFlow.cardsLeft
    const playerCards = cardsFlow.playerCards
    const botCards = cardsFlow.botCards

    //// FUNCTIONS


    function handleDrop(e:DragEvent){
        e.preventDefault()
        const newId = Number(e.dataTransfer.getData('cardId'))
        // check if the card is good and use dispatch to set the new current card
        if (isIdentical(currentCardId,newId) ){
            dispatch(changeCurrentCard(newId))
            dispatch(removeCard(newId))
        }else{
            console.log('not identical')
            console.log(currentCardId,newId)
            // handle UI error ?
        }
    }
    function playerTakeCard(){
        const randomId = randomIdFrom(cardsLeft) as number
        if (cardsLeft.length>0) {
            dispatch(addCard({cardId:randomId}))
            dispatch(takeCard(randomId))      
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
        handleDrop
    }
}