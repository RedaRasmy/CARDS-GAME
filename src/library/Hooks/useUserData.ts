import { useEffect } from "react";
import { fetchUserData, selectUserData, selectUserError, selectUserStatus, updateUserData } from "../redux/slices/userInfos";
import { useAppDispatch, useAppSelector } from "../redux/store";


export default function useUserData() {
    const dispatch = useAppDispatch()
    const data = useAppSelector(selectUserData)
    const status = useAppSelector(selectUserStatus)
    const error = useAppSelector(selectUserError)

    useEffect(()=>{
        dispatch(fetchUserData())
    },[dispatch])

    const userWins = ()=>{
        dispatch(updateUserData({win:true}))
    }
    const userLoses = () => {
        dispatch(updateUserData({win:false}))
    }

    return {data,status,error,userWins,userLoses}
}
