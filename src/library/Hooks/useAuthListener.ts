
import { useEffect } from 'react'
import { useAppDispatch } from '../redux/store'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { fetchUserData } from '../redux/slices/userInfos'

export default function useAuthListener() {
    const dispatch = useAppDispatch()
    const auth = getAuth()

    useEffect(()=>{
        // console.log("current user: ",auth.currentUser)
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if (user) {
                dispatch(fetchUserData())
            }
        })
        return () => unsubscribe()
    },[dispatch,auth])
}
