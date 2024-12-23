import { onAuthStateChanged, User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { database ,auth} from "./firebaseConfig"
import { reset} from "../redux/slices/userInfos"
import { UserInfos } from "../types"
import { useAppDispatch } from "../redux/store"



export default function useUserData() {
    const dispatch = useAppDispatch()
    const [user,setUser] = useState<User|null>(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {setUser(user)}); 
    }, []);

    const [userInfos,setUserInfos] = useState<UserInfos>({
        username:'player',
        avatar:'',
        gamesPlayed:0,
        wins:0
    })

    useEffect(()=>{
        async function getData() {
            console.log('getting data...')
            if (user) {
                try {
                    const docRef = doc(database,'users',user.uid)
                    console.log(user.uid)
                    const docSnap = await getDoc(docRef)
                    if (docSnap.exists()) {
                        const userData = docSnap.data()
                        console.log('data fetched : ',userData)
                        const dataToStore = {
                            username:userData.username,
                            gamesPlayed:userData.gamesPlayed,
                            wins:userData.wins
                        }
                        setUserInfos(dataToStore)
                        dispatch(reset(dataToStore))
                    }else {
                        console.log('document dont exist')
                    }
                } catch (err) {
                    console.error('Error while fetching user data:',err)
                }
            }else {console.log('user dont exist')}
        }
        getData()
    },[user,dispatch])

    return userInfos
}
