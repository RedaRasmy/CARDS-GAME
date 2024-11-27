import Letter from '@/components/Letter'
import { Difficulty } from '@/library/functions/bot'
import useGame from '@/library/Hooks/useGame'
import { PlayersNumber } from '@/library/redux/slices/gameFlow'
import { AnimatePresence } from 'motion/react'
import React, { ChangeEvent, useState } from 'react'

export default function PreGame() {
    const {changeDifficulty,changePlayers,startGame,difficulty,playersNumber,isPreGame} = useGame()
    function handleChangeDiff(event:ChangeEvent<HTMLInputElement>) {
        changeDifficulty(event.target.value as Difficulty)
    }
    function handleChangeNumber(event:ChangeEvent<HTMLInputElement>) {
        changePlayers(Number(event.target.value) as PlayersNumber)
    }
    function handleStart() {
        startGame()
        setIsOpen(false)
    }
    const [isOpen, setIsOpen] = useState(isPreGame);

    return (
        <div className='backdrop-blur-[10px] w-full h-full flex justify-center items-center' >
            { isOpen && <Letter >
                <div className='text-center space-y-3'>
                    <div className=' bg-black bg-opacity-20 rounded-md p-3'>
                        <h1 className='text-xl text-black font-semibold uppercase'>Difficulty</h1>
                        <div className='flex justify-around gap-4   w-full '>
                            <Option label='easy' checked={difficulty === 'easy'} onChange={handleChangeDiff}/>
                            <Option label='medium' checked={difficulty === 'medium'} onChange={handleChangeDiff}/>
                            <Option label='hard' disabled checked={difficulty === 'hard'} onChange={handleChangeDiff}/>
                        </div>
                    </div>
                    <div className=' bg-black bg-opacity-20 rounded-md p-3 '>
                        <h1 className='text-xl text-black font-semibold'>PLAYERS NUMBER</h1>
                        <div className='flex justify-around gap-4 w-full '>
                            <Option label='2' checked={playersNumber === 2} onChange={handleChangeNumber}/>
                            <Option label='3' checked={playersNumber === 3} onChange={handleChangeNumber}/>
                            <Option label='4' checked={playersNumber === 4} onChange={handleChangeNumber}/>
                        </div>
                    </div>
                    <button 
                    className='btn btn-warning text-2xl w-full' 
                    onClick={handleStart} >START</button>
                </div>
            </Letter>}
        </div>
    )
}

type OptionProps = {
    label:string,
    checked:boolean,
    onChange:(event: ChangeEvent<HTMLInputElement>)=>void,
    disabled?:boolean
}
function Option({label,checked,onChange,disabled}:OptionProps) {
    return (
        <label className="cursor-pointer flex items-center gap-2">
            <span className="text-black font-semibold">{label}</span>
            <input type="checkbox" className="checkbox checkbox-xs checkbox-warning"
            disabled={disabled}
            value={label.toLowerCase()}
            checked={checked}
            onChange={onChange} />
        </label>
    )
}