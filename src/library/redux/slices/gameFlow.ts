import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Turn } from "@/library/types";

const gameFlow = createSlice({
    name:'gameFlow',
    initialState:{
        gameIsOn:false, // true only bewteen starting the game and win/lose
        playerTurn:true, // if true : player turn , if false : bot turn
        modalOpen:false, // if true the player can choose color (JUDGE)
        turns:[] as Turn[] ,
    },
    reducers:{
        toggleGame:(state)=>{
            return {
                ...state,
                gameIsOn:!state.gameIsOn
            }
        },
        toggleTurn:(state)=>{
            return {
                ...state,
                playerTurn:!state.playerTurn
            }
        },
        toggleModal:(state)=>{
            return {
                ...state,
                modalOpen:!state.modalOpen
            }
        },
        addTurn:(state,action:PayloadAction<Turn>)=>{
            return {
                ...state,
                turns:[...state.turns,action.payload]
            }
        }
    }
})


export default gameFlow.reducer
export const {
    toggleGame,
    toggleModal,
    toggleTurn,
    addTurn,
} = gameFlow.actions