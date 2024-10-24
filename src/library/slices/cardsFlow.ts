import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import startTheGame from "../functions/startTheGame";


const {initialCurrentCard,initialPayerCards,initialBotCards,initialCardsLeft} = startTheGame()

const cardsFlow = createSlice({
    name:'cardsFlow',
    initialState:{
        currentCardId: initialCurrentCard,
        playerCards: initialPayerCards ,
        botCards: initialBotCards ,
        cardsLeft: initialCardsLeft,
    },
    reducers:{
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
        addCard:(state,action:PayloadAction<{cardId:number,player?:boolean}>)=>{
            const {cardId,player=true} = action.payload
            if (player){
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
        removeCard:(state,action:PayloadAction<number>,player=true)=>{
            if (player){
                const newCards = state.playerCards.filter(id=>id!==action.payload)
                return {
                    ...state,
                    playerCards:newCards
                }
            }else {
                const newCards = state.botCards.filter(id=>id!==action.payload)
                return {
                    ...state,
                    botCards:newCards
                }
            }
        }
    }
})


export const {takeCard,changeCurrentCard,addCard,removeCard} = cardsFlow.actions
export default cardsFlow.reducer