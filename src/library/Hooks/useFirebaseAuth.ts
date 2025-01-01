import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, User,signOut, getAuth } from "firebase/auth"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import {  auth, database } from "../firebase/firebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "../redux/store"
import { fetchUserData } from "../redux/slices/userInfos"

export default function useFirebaseAuth() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    // Status States
    const [registerStatus,setRegisterStatus] = useState<'idle'|'loading'|'failed'|'succeeded'>('idle')
    const [signInStatus,setSignInStatus] = useState<'idle'|'loading'|'failed'|'succeeded'>('idle')
    // Errors States
    const [registerError,setRegisterError] = useState<string|null>(null)
    const [signInError,setSignInError] = useState<string|null>(null)
    // Initial States Values
    const initialSignInState = {email:'',password:'',}
    const initialRegisterState = {username:'',email:'',password:'',}
    // Forms Data
    const [registerData,setRegisterData] = useState(initialRegisterState)
    const [signInData,setSignInData] = useState(initialSignInState)
    // Changes Handlers
    const handleChangeRegisterData = (e:ChangeEvent<HTMLInputElement>) => {
        setRegisterData({...registerData,[e.target.name]:e.target.value})
    }
    const handleChangeSignInData = (e:ChangeEvent<HTMLInputElement>) => {
        setSignInData({...signInData,[e.target.name]:e.target.value})
    }
    // Helper Function
    const setError = (setErrorState: React.Dispatch<React.SetStateAction<string | null>>, err: unknown) => { 
        const error = err as FirebaseError
        if (error.code) { 
            setErrorState(getFirebaseErrorMessage(error.code));
        } else { 
            setErrorState('Unknown Error!'); 
        }
    }
    // Handle Register
    const register = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setRegisterStatus('loading')
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                registerData.email,
                registerData.password
            )
            await setDoc(doc(database,'users',userCredential.user.uid), {
                uid: userCredential.user.uid,
                username : registerData.username,
            })
            // auto signIn after register
            await signInWithEmailAndPassword(
                auth,
                registerData.email,
                registerData.password
            )
            setRegisterStatus('succeeded')
            setRegisterData(initialRegisterState)
            router.push('/Profile')
        } catch(err) {
            setRegisterStatus('failed')
            setError(setRegisterError,err)
        }
    }
    // Handle SignIn
    const signIn = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setSignInStatus('loading')
            await signInWithEmailAndPassword(
                auth,
                signInData.email,
                signInData.password
            )
            router.push('/Profile')
            setSignInStatus('succeeded')
            setSignInData(initialSignInState)
        } catch(err) {
            setSignInStatus('failed')
            setError(setSignInError,err)
        }
    }
    // Handle SignIn With Google
    const googleProvider = new GoogleAuthProvider();
    const handleGoogle = async () =>{
        try {
            setSignInStatus('loading')
            const userCredential = await signInWithPopup(auth,googleProvider)
            const userRef = doc(database,'users',userCredential.user.uid)
            const userSnapshot = await getDoc(userRef)
            if (!userSnapshot.exists()) {
                await setDoc(doc(database,'users',userCredential.user.uid), {
                    uid: userCredential.user.uid,
                    username : userCredential.user.displayName || 'player',
                })
            }
            dispatch(fetchUserData())
            router.push('/Profile')
            setSignInStatus('succeeded')
        } catch(err) {
            setSignInStatus('failed')
            setError(setSignInError,err)
        }
    }
    // Check the User
    const [user, setUser] = useState<User|null>(null);
    useEffect(() => {
        const auth2 = getAuth()
        const unsubscribe = onAuthStateChanged(auth2, (currentUser) => {
            setUser(currentUser);
        }); 
        return () => unsubscribe(); 
    }, []);

    // After SignIn/Register Fetch userData to sync the redux and firestore
    // useEffect(()=>{
    //     if(user){
    //         dispatch(fetchUserData())
    //     }
    // },[dispatch])

    // Logout 
    const logout = () => {
        if (user){signOut(auth).then(()=>{
            // localStorage.clear()
        })}
        router.push('/')
    }
    ///////////////////////////////////
    ///////////////////////////////////

    return {
        registerStatus,
        registerError,
        signInStatus,
        signInError,
        handleChangeRegisterData,
        handleChangeSignInData,
        register,
        registerData,
        signIn,
        signInData,
        handleGoogle,
        user,
        logout
    }
}

/// SOME FIREBASE-ERRORS STUFF 

interface FirebaseError extends Error { code?: string; }

export const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/email-already-in-use': 
            return 'The email address is already in use by another account.'; 
        case 'auth/invalid-email': 
            return 'The email address is not valid.'; 
        case 'auth/weak-password': 
            return 'The password is too weak.'; 
        case 'auth/user-not-found': 
            return 'There is no user record corresponding to this identifier.'; 
        case 'auth/wrong-password': 
            return 'The password is incorrect.'; 
        default: 
            return 'An unknown error occurred. Please try again later.';    
    }
}