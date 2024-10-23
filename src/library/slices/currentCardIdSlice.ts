import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const currentCardIdSlice = createSlice({
    name:"currentCardId",
    initialState:0
    ,
    reducers:{
        change:(state,action:PayloadAction<number>)=>{
            return action.payload
        }
    }
})

export default currentCardIdSlice.reducer
export const {change} = currentCardIdSlice.actions
