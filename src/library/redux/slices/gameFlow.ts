import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Turn } from "@/library/types";
import { Difficulty} from "@/library/functions/bot";

export type PlayersNumber = 2 | 3 |4

const gameFlow = createSlice({
    name:'gameFlow',
    initialState:{
        isPreGame: true,
        gameIsOn:false, // true only bewteen starting the game and win/lose
        currentPlayer: 0 ,
        modalOpen:false, // if true the player can choose color (JUDGE)
        turns:[] as Turn[] ,
        difficulty: 'easy' as Difficulty,
        playersNumber: 2 as PlayersNumber,
    },
    reducers:{
        finishTurn :(state)=>{
            if (state.currentPlayer < state.playersNumber-1) {
                return {
                    ...state,
                    currentPlayer: state.currentPlayer +1
                }
            }else {
                return {
                    ...state,
                    currentPlayer: 0
                }
            }
        },
        changePlayersNumber : (state,action:PayloadAction<PlayersNumber>)=>{
            return {
                ...state,
                playersNumber:action.payload
            }
        },
        setIsPreGame:(state,action:PayloadAction<boolean>) =>{
            return {
                ...state,
                isPreGame :action.payload
            }
        },
        toggleGame:(state)=>{
            return {
                ...state,
                gameIsOn:!state.gameIsOn
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
        },
        clearHistory:(state)=>{
            return {
                ...state,
                turns:[]
            }
        },
        changeDiff:(state,action:PayloadAction<Difficulty>)=>{
            return {
                ...state,
                difficulty:action.payload
            }
        }
    }
})


export default gameFlow.reducer
export const {
    toggleGame,
    toggleModal,
    finishTurn,
    addTurn,
    clearHistory,
    changeDiff,
    changePlayersNumber,
    setIsPreGame
} = gameFlow.actions