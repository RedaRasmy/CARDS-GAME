// import { Difficulty } from '@/library/functions/bot'
// import { changeDiff } from '@/library/redux/slices/gameFlow'
// import { useAppDispatch, useAppSelector } from '@/library/redux/store'
// import React, { ChangeEvent } from 'react'
import { useAppDispatch } from '@/library/redux/store'
import OfflineSide from './OfflineSide'
import { clearHistory, toggleGame } from '@/library/redux/slices/gameFlow'


export default function PlayOptions() {

    return (
        <div 
        style={{
            gridTemplateColumns:'1fr 100px 1fr'
        }}
        className='grid grid-cols-3 h-[200px] w-full'>
            <OfflineSide/>
            <Median/>
            <OnlineSide/>
        </div>
    )
}

function Median(){
    const dispatch = useAppDispatch()
    function handleStart(){
        dispatch(toggleGame())
        dispatch(clearHistory())
    }
    return (
        <div className='flex flex-col h-full justify-center items-center'>
            <div className='border-l-2 border-sky-600 h-full'></div>
            <StartButton onClick={handleStart} />
            <div className='border-l-2 border-sky-600 h-full'></div>
        </div>
    )
}

function StartButton({onClick}:{onClick:()=>void}) {
    return (
        <button 
        onClick={onClick}
        className='btn btn-circle w-[60px] h-[60px] font-sans border-sky-600 border-2 bg-transparent btn-info'>
            START
        </button>
    )
}


function OnlineSide() {
    return (
        <div>
            <Title title='ONLINE'/>
        </div>
    )
}

export function Title({title}:{title:string}){
    return (
        <h1
        className='font-bold bg-opacity-50 text-white bg-sky-500
        py-2 px-[15%] rounded-md text-center'
        >{title}</h1>
    )
}