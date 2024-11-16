import Image from 'next/image'
import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react'

export default function RegisterForm({onToggle}:{
    onToggle:()=>void
}) {
    // values state
    const [formValues,setFormValues] = useState({
        avatar: null as null | string,
        username:'',
        email:'',
        password:'',
    })
    // errors state
    const [formErrors,setFormErrors] = useState<{
        username?:string,
        email?:string,
        password?:string,
    }>({})
    // handle values's changing
    const handleImageChange = (event:ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormValues({...formValues, avatar : reader.result as string});
            };
            reader.readAsDataURL(file);
        }
    }
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues,[e.target.name]:e.target.value})
    }
    // handle submit
    const handleSubmit = () => {
        
    }

    return (
        <form 
        onSubmit={handleSubmit}
        className='flex flex-col items-center '>
            <button 
            onClick={onToggle} 
            className='flex w-full justify-end underline opacity-30'>
                Sign In
            </button>
            <div className='flex items-center flex-col gap-4 w-[clamp(250px,50%,500px)]'>
                <div className='flex items-center w-full -mb-4'>
                    <ImageInput name='avatar' onChange={handleImageChange} img={formValues.avatar}/>

                    <Input name='username' placeholder='Username' onChange={handleChange} value={formValues.username}/>
                </div>
                <Input name='email' placeholder='Email' onChange={handleChange} value={formValues.email}/>
                <Input type='password' name='Password' placeholder='password' onChange={handleChange} value={formValues.password}/>
            </div>
        </form>
    )
}




/// mini-components :

function ImageInput({img,...props}:{img:string|null} & InputHTMLAttributes<HTMLInputElement>){
    return (
        <label>
            <div className="avatar cursor-pointer">
                <div className="w-20 rounded-full">
                    <Image alt='' width={500} height={500} src={img || "/images/default-avatar.png"} />
                </div>
            </div>
            <input {...props} type='file' className='hidden' />
        </label>
    )
}

function Input(props:InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input 
        className='input w-full'
        {...props} />
    )
}