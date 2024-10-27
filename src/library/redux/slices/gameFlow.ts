import { createSlice } from "@reduxjs/toolkit";

const gameFlow = createSlice({
    name:'gameFlow',
    initialState:{
        gameIsOn:false, // true only bewteen starting the game and win/lose
        playerTurn:true, // if true : player turn , if false : bot turn
        modalOpen:false, // if true the player can choose color (JUDGE)
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
    }
})


export default gameFlow.reducer
export const {toggleGame,toggleModal,toggleTurn} = gameFlow.actions