import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import startTheGame from "../../functions/startTheGame";
import { arrayMove } from "@dnd-kit/sortable";
import requirements, { Requirements } from "@/library/functions/requirements";



const {initialCurrentCard,initialPayerCards,initialBotCards,initialCardsLeft} = startTheGame()

const cardsFlow = createSlice({
    name:'cardsFlow',
    initialState:{
        currentCardId: initialCurrentCard,
        requirements:requirements(initialCurrentCard),
        playerCards: initialPayerCards ,
        botCards: initialBotCards ,
        cardsLeft: initialCardsLeft,
    },
    reducers:{
        redistribute:(state)=>{
            const {initialCurrentCard,initialPayerCards,initialBotCards,initialCardsLeft} = startTheGame(playersNumber)
            return {
                ...state,
                currentCardId: initialCurrentCard,
                requirements:requirements(initialCurrentCard),
                playerCards: initialPayerCards ,
                botCards: initialBotCards ,
                cardsLeft: initialCardsLeft,
            }
        },
        takeCard:(state,action:PayloadAction<number>)=>{
            const newCards = state.cardsLeft.filter(id=>id!==action.payload)
            return {
                ...state,
                cardsLeft : newCards
            }
        },
        changeCurrentCard:(state,action:PayloadAction<number>)=>{
            return {
                ...state,
                cardsLeft:[...state.cardsLeft,state.currentCardId],
                currentCardId : action.payload,
                // requirements:requirements(action.payload),
            }
        },
        changeRequirements:(state,action:PayloadAction<Requirements>)=>{
            return {
                ...state,
                requirements:action.payload
            }
        },
        addCard:(state,action:PayloadAction<{cardId:number,player:'player'|'bot'}>)=>{
            const {cardId,player} = action.payload
            if (player === 'player'){
                return {
                    ...state,
                    scrollIntoLastCard:true,
                    playerCards:[...state.playerCards,cardId]
                }
            } else {
                return {
                    ...state,
                    botCards:[...state.botCards,cardId]
                }
            }
        },
        removeCard:(state,action:PayloadAction<{cardId:number,player:'player'|'bot'}>)=>{
            const {cardId,player} = action.payload
            if (player === 'player'){
                const newCards = state.playerCards.filter(id=>id!==cardId)
                return {
                    ...state,
                    scrollIntoLastCard:false,
                    playerCards: newCards
                }
            }else {
                const newCards = state.botCards.filter(id=>id!==cardId)
                return {
                    ...state,
                    botCards: newCards
                }
            }
        },
        changeCardOrder:(state,action:PayloadAction<{index1:number,index2:number}>)=>{
            return {
                ...state,
                playerCards:arrayMove(state.playerCards,action.payload.index1,action.payload.index2)
            }
        }
    }
})


export const {
    changeRequirements,
    redistribute,
    takeCard,
    changeCurrentCard,
    addCard,
    removeCard,
    changeCardOrder,
} = cardsFlow.actions

export default cardsFlow.reducer