import Image from 'next/image'
import React, { InputHTMLAttributes } from 'react'

export default function RegisterForm({onToggle}:{
    onToggle:()=>void
}) {
    return (
        <div className=' '>
            <button 
            onClick={onToggle} 
            className='flex w-full justify-end underline'>
                Sign In
            </button>
            <Input/>
            <ImageInput/>
        </div>
    )
}



function ImageInput(){
    return (
        <div className="avatar">
            <div className="w-24 rounded-full">
                <Image alt='' width={50} height={50} src="" />
            </div>
        </div>
    )
}

function Input(props:InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input 
        className='input'
        {...props} />
    )
}