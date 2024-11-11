import React from 'react'

export default function SignInForm({onToggle}:{
    onToggle:()=>void
}
) {
    return (
        <div className='w-full'>
            <button 
            className='flex w-full justify-end underline' 
            onClick={onToggle}>
                Register
            </button>
        </div>
    )
}
