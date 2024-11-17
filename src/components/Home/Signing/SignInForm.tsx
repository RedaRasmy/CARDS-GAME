import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from './RegisterForm'

export default function SignInForm({onToggle}:{
    onToggle:()=>void
}
) {
    // values state
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
        // I must check if the username have been already used
        // I must return a notification (toast) about the response,errors
    }
    return (
        <form 
        onSubmit={handleSubmit}
        className='flex flex-col items-center'>
            <button 
            className='flex w-full justify-end underline opacity-30 mb-2' 
            onClick={onToggle}>
                Register
            </button>
            <div className='flex items-center flex-col gap-4 w-[clamp(250px,50%,500px)]'>
                <Input  required type='email' name='email' placeholder='Email' onChange={handleChange} value={formValues.email}/>
                <Input required type='password' name='password' placeholder='Password' onChange={handleChange} value={formValues.password}/>
                <button className='btn btn-accent btn-outline w-full'>Sign In</button>
            </div>
        </form>
    )
}
