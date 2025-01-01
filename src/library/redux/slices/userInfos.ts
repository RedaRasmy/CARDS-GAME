// import { UserInfos } from "@/library/types";
import { auth, database } from "@/library/firebase/firebaseConfig";
import { UserInfos } from "@/library/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { RootState } from "../store";
import useFirebaseAuth from "@/library/Hooks/useFirebaseAuth";

export const fetchUserData = createAsyncThunk('userData/fetchUserData',async (_,{rejectWithValue}) => {
    const {user} = useFirebaseAuth()
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

export const changeUsername = createAsyncThunk('username/updateUsername',async (
    {newUsername}:{newUsername:string}, {rejectWithValue}
) =>{
    try {
        const user = auth.currentUser
        if(!user) {
            rejectWithValue('user not found')
        } else {
            const userRef = doc(database,'users',user.uid)
            await updateDoc(userRef,{
                username:newUsername
            })
        }
    } catch(err) {
        if (err instanceof Error) {
            rejectWithValue(err.message)
        } else {
            rejectWithValue('Unknown Error Happend')
        }
    }
    return newUsername
})


export const updateUserData = createAsyncThunk('userData/updateUserData',async (
    {win}:{win:boolean} ,{rejectWithValue}
)=>{
    const user = auth.currentUser
    if (!user) {
        return rejectWithValue("No authenticated user found")
    }
    const userRef = doc(database,'users',user.uid)
    // const userSnap = await getDoc(userRef)

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

// let storedData

// if (typeof window !== 'undefined') {
//     const stringData = localStorage.getItem('userData');
//     storedData = stringData && JSON.parse(stringData) 
// }

const initialUserData = {
    username:'',
    gamesPlayed:0,
    wins:0,
    lvl:1,
    xp:0,
}


const userInfos = createSlice({
    name:"userInfos",
    initialState:{
        data : initialUserData ,
        status: 'idle',
        error: null as string | null
    },
    reducers :{},
    extraReducers(builder) {
        builder
            .addCase(fetchUserData.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(fetchUserData.fulfilled,(state,action)=>{
                const userData = action.payload as UserInfos
                state.status = 'succeeded'
                state.data = userData
                // localStorage.setItem('userData', JSON.stringify(userData));
            })
            .addCase(fetchUserData.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.payload as string | null
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
                // localStorage.setItem('userData', JSON.stringify(state.data));
            })
            .addCase(updateUserData.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.payload as string | null
            })
            .addCase(changeUsername.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(changeUsername.fulfilled,(state,action)=>{
                state.status = 'succeeded'
                state.data.username = action.payload 
                // localStorage.setItem('userData', JSON.stringify(state.data));
            })
            .addCase(changeUsername.rejected,(state,action)=>{
                state.status = 'failed'
                state.error = action.payload as string | null
            })
    },
})

// Selectors :
export const selectUserData = (state:RootState) => state.userInfos.data
export const selectUserStatus = (state:RootState) => state.userInfos.status
export const selectUserError = (state:RootState) => state.userInfos.error

export default userInfos.reducer