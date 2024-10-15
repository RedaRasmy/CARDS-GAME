import { CardType } from '@/library/types'
import React from 'react'
import Card from './Card/Card'

export default function Board() {
    const currentCard:CardType = {
        id:0,
        power:'JUDGE',
        color:'red',
    }

    return (
        <div className='sm:w-[clamp(300px,70%,1000px)] w-full sm:h-[40%] h-1/3 sm:border-2
        border-white border-opacity-20 bg-gray-900 sm:rounded-[10px]
        flex justify-between items-center py-4 px-6 border-y-2 text-white
        '>
            <div className='sm:block hidden'></div>
            <div className='scale-[2] ml-10'>
                <Card {...currentCard}></Card>
            </div>
            <div className=' flex flex-col items-center mt-2'>
                <Card id={-1} color='black'/>
                <p className='opacity-50 mt-1' title='Cards left'>&lt; <span>31</span> &gt;</p>
            </div>
        </div>
    )
}
