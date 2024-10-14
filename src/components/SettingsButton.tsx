import React, { useRef, useState } from 'react'
import Option from './primary/Option'

export default function SettingsButton() {
    const dialogRef = useRef<HTMLDialogElement>(null)
    function open(){
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }
    function close(){
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }
    const [status,setStatus] = useState('home')

    return (
        <>
            <button 
            onClick={open}
            className='w-12 h-12  rounded-full absolute right-2 top-2 text-center '>
                <i 
                className='bx bxs-cog text-4xl text-white settings transition-transform hover:rotate-45'/>
            </button>
            <dialog 
            ref={dialogRef}
            className='
            w-[clamp(250px,80%,500px)] bg-zinc-800 p-2 rounded-md '>
                <div className='flex flex-col justify-between'>
                    <div className='w-full flex justify-between'>
                        {status !== 'home' ? <button
                        onClick={()=>{setStatus('home')}}>
                            <i className='bx bx-arrow-back text-2xl text-red-900 font-bold'></i>
                        </button> : <div/>
                        }
                        <button 
                        onClick={close}
                        className=''>
                            <i className='bx bxs-x-circle text-2xl text-red-900'></i>
                        </button>
                    </div>
                    {/* main content */}
                    <div className='border w-full flex-1 '>
                        {['home','rules','styles'].map((e,i)=>(
                            status===e && 
                            [<Home key={i}/>,<Rules key={i}/>,<Style key={i}/>][i]
                        ))
                        }
                    </div>
                </div>
                
            </dialog>
        </>
    )
}


function Home(){
    // use context api
    return (
        <div className='flex flex-col justify-center items-center gap-2 p-4'>
            <Option 
            
            >Rules</Option>
            <Option>Style</Option>
        </div>
    )
}
function Style(){
    return (
        <div>
            style
        </div>
    )
}
function Rules(){
    return (
        <div>
            rules
        </div>
    )
}



