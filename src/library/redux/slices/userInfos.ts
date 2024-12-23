import { UserInfos } from "@/library/types";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const userInfos = createSlice({
    name:"userInfos",
    initialState:{
        username:'player',
        avatar:'',
        gamesPlayed:0,
        wins:0,
    },
    reducers :{
        lose :  (state)=>{
            return {
                ...state,
                gamesPlayed:state.gamesPlayed+1,
            }
        },
        win :  (state)=>{
            return {
                ...state,
                gamesPlayed:state.gamesPlayed+1,
                wins:state.wins +1
            }
        },
        reset : (state,action:PayloadAction<UserInfos>) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const {lose,win,reset} = userInfos.actions
export default userInfos.reducer