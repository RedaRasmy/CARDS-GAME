
import { changeUsername, selectUserData, selectUserError, selectUserStatus, updateUserData } from "../redux/slices/userInfos";
import { useAppDispatch, useAppSelector } from "../redux/store";


export default function useUserData() {
    const dispatch = useAppDispatch()

    const data = useAppSelector(selectUserData)
    const status = useAppSelector(selectUserStatus)
    const error = useAppSelector(selectUserError)

    const userWins = ()=>{
        dispatch(updateUserData({win:true}))
    }
    const userLoses = () => {
        dispatch(updateUserData({win:false}))
    }

    const changeName = (newUsername : string)=>{
        dispatch(changeUsername({newUsername}))
    }
    return {data,status,error,userWins,userLoses,changeName}
}
