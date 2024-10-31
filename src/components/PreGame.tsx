import { changeMode, clearHistory, toggleGame } from '@/library/redux/slices/gameFlow'
import { useAppDispatch, useAppSelector } from '@/library/redux/store'
import React, { ChangeEvent } from 'react'
import StartButton from './StartButton'
import { Mode } from '@/library/functions/bot'

export default function PreGame() {

    const dispatch = useAppDispatch()
    const {mode}= useAppSelector(state=>state.gameFlow)

    function handleChange(event:ChangeEvent<HTMLSelectElement>) {
        dispatch(changeMode(event.target.value as Mode))
    }
    function handleStart(){
        dispatch(toggleGame())
        dispatch(clearHistory())
    }
    return (
        <div className='rounded-md  flex justify-center flex-col items-center gap-2 w-[100%]
        max-w-[500px] py-10 border-white  border-opacity-10 '>
            <select 
            value={mode}
            onChange={handleChange}
            className="select select-secondary w-[50%] max-w-xs">
                <option value={'easy'}>Easy</option>
                <option value={'medium'}>Medium</option>
            </select>
            <StartButton handleClick={handleStart} text='START'/>
        </div>
    )
}
