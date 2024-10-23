import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cardsLeft = createSlice({
    name:'cardsLeft',
    initialState:Array.from({length:40},(_,i)=>i),
    reducers:{
        takeCard:(state,action:PayloadAction<number>)=>{
            return state.filter(id=>id!==action.payload)
        }
    }
})


export const {takeCard} = cardsLeft.actions
export default cardsLeft.reducer