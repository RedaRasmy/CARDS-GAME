import React, { DragEvent} from 'react'
import Card from './Card/Card'
import CardBack from './Card/CardBack'
import useCard from '@/library/Hooks/useCard'

export default function Board() {
    const {cardsLeft,handleDrop,currentCardId} = useCard()
    const cardsLeftNumber = cardsLeft.length


    // Weird 
    function handleDragOver(e:DragEvent){
        e.preventDefault()
    }


    return (
        <div className='sm:w-[clamp(300px,70%,1000px)] w-full sm:h-[40%] h-1/3 sm:border-2
        border-white border-opacity-20 bg-gray-900 sm:rounded-[10px]
        flex justify-between items-center py-4 px-6 border-y-2 text-white
        '>
            <div className='sm:block hidden'></div>
            <div 
            onDragOver={e=>handleDragOver(e)}
            onDrop={e=>handleDrop(e)}
            className='scale-[2] ml-10'>
                {currentCardId !== null && <Card id={currentCardId} isDraggable={false} ></Card>}
            </div>
            <div className=' flex flex-col items-center mt-2'>
                <div className='cursor-pointer'>
                    <CardBack/>
                </div>
                <p className='opacity-50 mt-1' title='Cards left'>&lt; <span>{cardsLeftNumber}</span> &gt;</p>
            </div>
        </div>
    )
}
