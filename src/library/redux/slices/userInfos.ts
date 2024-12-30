// import { UserInfos } from "@/library/types";
import { auth, database } from "@/library/firebase/firebaseConfig";
import { UserInfos } from "@/library/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { RootState } from "../store";

export const fetchUserData = createAsyncThunk('userData/fetchUserData',async (_,{rejectWithValue}) => {
    const user = auth.currentUser
    if (!user) {
        return rejectWithValue("No authenticated user found")
    }
    const userRef = doc(database,'users',user.uid)
    const userSnapshot = await getDoc(userRef)
    if (!userSnapshot.exists()) {
        return rejectWithValue("User data not found")
    }
    return userSnapshot.data()
})

export const updateUserData = createAsyncThunk('userData/updateUserData',async (
    {win}:{win:boolean} ,{rejectWithValue}
)=>{
    const user = auth.currentUser
    if (!user) {
        return rejectWithValue("No authenticated user found")
    }
    const userRef = doc(database,'users',user.uid)
    if (win) {
        await updateDoc(userRef,{
            wins:increment(1),
            gamesPlayed:increment(1)
        })
    } else {
        await updateDoc(userRef,{
            gamesPlayed:increment(1)
        })
    }
    return win
})

const userInfos = createSlice({
    name:"userInfos",
    initialState:{
        data : {
            username:'player',
            gamesPlayed:0,
            wins:0,
            lvl:1,
            xp:0,
        },
        status: 'idle',
        error: undefined as string | undefined 
    },
    reducers :{},
    extraReducers(builder) {
        builder
            .addCase(fetchUserData.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(fetchUserData.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.data = action.payload as UserInfos
            })
            .addCase(fetchUserData.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.payload as string | undefined
            })
            .addCase(updateUserData.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(updateUserData.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                const win = action.payload
                if (win) {
                    state.data.wins++
                    state.data.gamesPlayed++
                } else {
                    state.data.gamesPlayed++
                }
            })
            .addCase(updateUserData.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.payload as string | undefined
            })
    },
})

// Selectors :
export const selectUserData = (state:RootState) => state.userInfos.data
export const selectUserStatus = (state:RootState) => state.userInfos.status
export const selectUserError = (state:RootState) => state.userInfos.error

export default userInfos.reducer