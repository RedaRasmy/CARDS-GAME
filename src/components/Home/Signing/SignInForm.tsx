import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from './RegisterForm'
import {app} from '../../../library/firebase/firebaseConfig'
import {getAuth,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'

export default function SignInForm({onToggle}:{
    onToggle:()=>void
}
) {
    // values state
    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider();
    const [formValues,setFormValues] = useState({
        email:'',
        password:'',
    })
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues,[e.target.name]:e.target.value})
    }
    // handle submit
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signInWithEmailAndPassword(
            auth,
            formValues.email,
            formValues.password
        )
        // I must check if the username have been already used
        // I must return a notification (toast) about the response,errors
    }
    const handleGoogle = () =>{
        signInWithPopup(auth,googleProvider)
    }
    return (
        <form 
        onSubmit={handleSubmit}
        className='flex flex-col items-center'>
            <div className='w-full flex justify-end'>
                <button 
                className=' underline opacity-30 mb-2' 
                onClick={onToggle}>
                    Register
                </button>
            </div>
            <div className='flex items-center flex-col gap-4 w-[85%]'>
                <Input  required type='email' name='email' placeholder='Email' onChange={handleChange} value={formValues.email}/>
                <Input required type='password' name='password' placeholder='Password' onChange={handleChange} value={formValues.password}/>
                <button className='btn btn-accent w-full'>Sign In</button>
            </div>
            <button onClick={handleGoogle}>Google</button>
        </form>
    )
}
