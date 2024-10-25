import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import startTheGame from "../../functions/startTheGame";
import { arrayMove } from "@dnd-kit/sortable";


const {initialCurrentCard,initialPayerCards,initialBotCards,initialCardsLeft} = startTheGame()

const cardsFlow = createSlice({
    name:'cardsFlow',
    initialState:{
        currentCardId: initialCurrentCard,
        playerCards: initialPayerCards ,
        botCards: initialBotCards ,
        cardsLeft: initialCardsLeft,
        gameIsOn:false
    },
    reducers:{
        changeTheGameTo:(state,action:PayloadAction<boolean>)=>{
            return {
                ...state,
                gameIsOn:action.payload
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
                currentCardId : action.payload
            }
        },
        addCard:(state,action:PayloadAction<{cardId:number,player:'player'|'bot'}>)=>{
            const {cardId,player} = action.payload
            if (player === 'player'){
                return {
                    ...state,
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


export const {takeCard,changeCurrentCard,addCard,removeCard,changeCardOrder,changeTheGameTo} = cardsFlow.actions
export default cardsFlow.reducer