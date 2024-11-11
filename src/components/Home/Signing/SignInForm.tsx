import React from 'react'

export default function SignInForm({onToggle}:{
    onToggle:()=>void
}
) {
    return (
        <div className='w-full'>
            <button className='' onClick={onToggle}>Register</button>
        </div>
    )
}
