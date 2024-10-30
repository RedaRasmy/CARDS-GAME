import { createSlice } from "@reduxjs/toolkit";

let isTouchDevice = false
if (typeof window !== 'undefined') {
    isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
}

const settings = createSlice({
    name:'settings',
    initialState:{
        sorting:!isTouchDevice,
        dragging:!isTouchDevice,
        clicking:true,
        alwaysShowRequirements:true,
        indicators:true,
    },
    reducers:{
        toggleIndicators:(state)=>{
            return {
                ...state,
                indicators:!state.indicators
            }
        },
        toggleRequirements:(state)=>{
            return {
                ...state,
                alwaysShowRequirements:!state.alwaysShowRequirements
            }
        },
        toggleSorting:(state)=>{
            return {
                ...state,
                sorting: !state.sorting
            }
        },
        toggleDragging:(state)=>{
            if (state.clicking === false){
                return {
                    ...state,
                    dragging:!state.dragging,
                    clicking:true
                }
            }
            return {
                ...state,
                dragging:!state.dragging
            }
        },
        toggleClick:(state)=>{
            if (state.dragging === false){
                return {
                    ...state,
                    clicking:!state.clicking,
                    dragging:true
                }
            }
            return {
                ...state,
                clicking:!state.clicking
            }
        }
    }
})


export default settings.reducer
export const  {
    toggleSorting,
    toggleDragging,
    toggleClick,
    toggleRequirements,
    toggleIndicators
} = settings.actions