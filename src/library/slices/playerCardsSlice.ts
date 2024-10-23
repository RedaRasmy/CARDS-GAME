import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const palyerCards = createSlice({
    name:"playerCards",
    initialState:[] as number[] ,
    reducers:{
        addCard:(state,action:PayloadAction<number>)=>{
            state.push(action.payload)
        },
        removeCard:(state,action:PayloadAction<number>)=>{
            return state.filter(id=>id!==action.payload)
        }
    }
})

export const {addCard, removeCard} = palyerCards.actions
export default palyerCards.reducer
