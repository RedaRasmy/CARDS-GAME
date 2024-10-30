import React, { useEffect, useRef, useState } from 'react'
import Option from '../primary/Option'
import Rules from './Rules'
import Style from './Style'
import SettingsToggle from './SettingsToggle'
import { useAppDispatch, useAppSelector} from '@/library/redux/store'
import { toggleClick, toggleDragging, toggleIndicators, toggleRequirements, toggleSorting } from '@/library/redux/slices/settings'

export default function SettingsButton() {
    const dialogRef = useRef<HTMLDialogElement>(null)
    function open(){
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
        setStatus('SETTINGS')
    }
    function close(){
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }
    const [status,setStatus] = useState('SETTINGS')

    return (
        <>
            <button 
            onClick={open}
            className='w-12 h-12 rounded-full absolute right-2 top-2 text-center '>
                <i 
                className='bx bxs-cog text-4xl text-white settings transition-transform hover:rotate-45'/>
            </button>
            <dialog 
            ref={dialogRef}
            className='
            w-[clamp(250px,80%,500px)] bg-zinc-800 p-2 rounded-md text-white'>
                <div className='flex flex-col justify-between'>
                    <div className='w-full flex justify-between'>
                        {status !== 'SETTINGS' ?
                        <button
                            onClick={()=>{setStatus('SETTINGS')}}>
                            <i className='bx bx-arrow-back text-2xl text-red-900 font-bold w-7'></i>
                        </button> 
                        : <div className='w-7'/>
                        }
                        <h1 className='text-2xl font-bold  '>{status}</h1>
                        <button 
                        onClick={close}
                        className=''>
                            <i className='bx bxs-x-circle text-2xl text-red-900'></i>
                        </button>
                    </div>
                    {/* main content */}
                    <div className=' w-full flex-1 p-2 max-h-[200px] overflow-y-scroll scrollbar-hide'>
                        {['SETTINGS','RULES','STYLE'].map((e,i)=>(
                            status === e &&
                            [
                            <Home key={i} goToRules={()=>{setStatus('RULES')}} goToStyle={()=>{setStatus('STYLE')}}/>,
                            <Rules key={i}/>,
                            <Style key={i}/>
                            ][i]
                        ))
                        }
                    </div>
                </div>
                
            </dialog>
        </>
    )
}

type HomeProps = {
    goToRules: () => void,
    goToStyle: () => void
}
function Home({goToRules,goToStyle}:HomeProps){
    const dispatch = useAppDispatch()
    const {sorting,dragging,clicking,alwaysShowRequirements,indicators} = useAppSelector(state=>state.settings)
    const handleToggleSort =()=>{
        dispatch(toggleSorting())
    }
    const handleToggleDrag =()=>{
        dispatch(toggleDragging())
    }
    const handleToggleClick =()=>{
        dispatch(toggleClick())
    }
    const handleReq =()=>{
        dispatch(toggleRequirements())
    }
    const handleIndicators =()=>{
        dispatch(toggleIndicators())
    }
    const [isTouchDevice,setIsTouchDevice] = useState(false) 
    useEffect(()=>{
        if (typeof window !== 'undefined') {
            setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches)
        }
    },[])
    
    return (
        <div className='flex flex-col justify-center items-center gap-2 p-4 '>
            <Option 
            onClick={goToRules}>
                Rules
            </Option>
            <Option onClick={goToStyle}>Style</Option>
            <div>
                {!isTouchDevice &&<SettingsToggle label='Cards Sorting' defaultValue={sorting} onToggle={handleToggleSort} />}
                {!isTouchDevice && <SettingsToggle label='Cards Dragging' defaultValue={dragging} onToggle={handleToggleDrag} />}
                {!isTouchDevice &&<SettingsToggle label='Cards Clicking' defaultValue={clicking} onToggle={handleToggleClick} />}
                <SettingsToggle label='Always Show Requirements' defaultValue={alwaysShowRequirements} onToggle={handleReq} />
                <SettingsToggle label='Indicators' defaultValue={indicators} onToggle={handleIndicators} />
            </div>
            
        </div>
    )
}







