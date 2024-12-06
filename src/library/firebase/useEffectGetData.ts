import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { database } from "./firebaseConfig"


export default function useEffectGetData() {
    const user = getAuth().currentUser
    const [userInfos,setUserInfos] = useState<
    {username:string,avatar?:string,gamesPlayed:number,wins:number}
    >({
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
                        setUserInfos({
                            username:userData.username,
                            gamesPlayed:userData.gamesPlayed,
                            wins:userData.wins
                        })
                    }else {
                        console.log('document dont exist')
                    }
                } catch (err) {
                    console.error('Error while fetching user data:',err)
                }
            }else {console.log('user dont exist')}
        }
        getData()
    },[user])

    return userInfos
}
