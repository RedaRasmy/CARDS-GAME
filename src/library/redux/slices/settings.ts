import { createSlice } from "@reduxjs/toolkit";

const settings = createSlice({
    name:'settings',
    initialState:{
        sorting:false,
        dragging:false,
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
            return {
                ...state,
                dragging:!state.dragging
            }
        },
        toggleClick:(state)=>{
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