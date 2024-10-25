// import React, { DragEvent} from 'react'
import Card from './Card/Card'
import CardBack from './Card/CardBack'
import useCard from '@/library/Hooks/useCard'
import Droppable from '@/library/dnd-kit/droppable'

export default function Board() {
    const {cardsLeft,currentCardId} = useCard()
    const cardsLeftNumber = cardsLeft.length

    // Weird 
    // function handleDragOver(e:DragEvent){
    //     e.preventDefault()
    // }


    return (
        <div className='sm:w-[clamp(300px,70%,1000px)] w-full sm:h-[40%] h-1/3 sm:border-2
        border-white border-opacity-20 bg-gray-900 sm:rounded-[10px]
        flex justify-between items-center py-4 px-6 border-y-2 text-white flex-wrap
        '>
            <div className='sm:block hidden'></div>
            <div 
            // onDragOver={e=>handleDragOver(e)}
            
            className=' ml-10'>
                {currentCardId !== null && 
                <Droppable>
                    <Card id={currentCardId} ></Card>
                </Droppable>
                }
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
