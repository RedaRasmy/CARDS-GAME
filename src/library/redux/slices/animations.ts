import { createSlice,  } from "@reduxjs/toolkit";

const init = {
    startTaking:false,
    endTaking:false
}
const animations = createSlice({
    name:'animations',
    initialState: init,
    reducers:{
        startTakingCard:(state)=>{
            return {
                ...state,
                startTaking:true
            }
        },
        endTakingCard:(state)=>{
            return {
                ...state,
                endTaking: true
            }
        },
        stopAnimations:()=>{
            return init
        }
    }
})

export default animations.reducer
export const {startTakingCard,endTakingCard} = animations.actions