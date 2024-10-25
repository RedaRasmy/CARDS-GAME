import { createSlice } from "@reduxjs/toolkit";

const settings = createSlice({
    name:'settings',
    initialState:{
        sorting:false,
        dragging:false,
        clicking:true
    },
    reducers:{
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
export const  {toggleSorting,toggleDragging,toggleClick} = settings.actions