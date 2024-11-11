import Image from 'next/image'
import React, { InputHTMLAttributes } from 'react'

export default function RegisterForm({onToggle}:{
    onToggle:()=>void
}) {
    return (
        <div className=''>
            <button onClick={onToggle} >Sign In</button>
            <Input/>
            <ImageInput/>
        </div>
    )
}



function ImageInput(){
    return (
        <div className="avatar">
            <div className="w-24 rounded-full">
                <Image alt='' src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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