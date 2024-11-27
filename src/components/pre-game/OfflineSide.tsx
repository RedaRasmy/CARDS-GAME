import React, { ChangeEvent } from 'react'
import { Title } from './PlayOptions'
import { useAppDispatch, useAppSelector } from '@/library/redux/store'
import { changeDiff } from '@/library/redux/slices/gameFlow'
import { Difficulty } from '@/library/functions/bot'

export default function OfflineSide() {
    const dispatch = useAppDispatch()
    const {difficulty}= useAppSelector(state=>state.gameFlow)
    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        dispatch(changeDiff(event.target.value as Difficulty))
    }
    return (
        <div className=''>
            <Title title='OFFLINE'/>
            <div className='flex justify-center  gap-4  ml-5 flex-col w-1/2 h-[80%]'>
                <Option label='EASY' checked={difficulty === 'easy'} onChange={handleChange}/>
                <Option label='MEDIUM' checked={difficulty === 'medium'} onChange={handleChange}/>
                <Option label='HARD' checked={difficulty === 'hard'} onChange={handleChange}/>
            </div>
        </div>
    )
}


type OptionProps = {
    label:string,
    checked:boolean,
    onChange:(event: ChangeEvent<HTMLInputElement>)=>void
}
export function Option({label,checked,onChange}:OptionProps) {
    return (
        <label className="cursor-pointer flex items-center gap-5">
            <span className="label-text">{label}</span>
            <input type="checkbox" className="checkbox checkbox-sm checkbox-info"
            value={label.toLowerCase()}
            checked={checked}
            onChange={onChange} />
        </label>
    )
}