import { CardType } from '@/library/types'
import React, { DragEvent } from 'react'
import Card from './Card/Card'
import { cards } from '../../public/cards'
import {  useSelector } from 'react-redux'
import {  RootState, useAppDispatch ,useAppSelector} from '@/library/store'
import { change } from '@/library/slices/currentCardIdSlice'
import isIdentical from '@/library/functions/isIdentical'
import CardBack from './Card/CardBack'
import { removeCard } from '@/library/slices/playerCardsSlice'

export default function Board() {
    const currentCardId = useSelector((state:RootState)=>state.currentCardId)
    const cardsLeftNumber = useAppSelector(state=>state.cardsLeft).length

    const currentCard:CardType = cards[currentCardId]
    const dispatch  = useAppDispatch()

    function handleDrop(e:DragEvent){
        const newId = Number(e.dataTransfer.getData('cardId'))
        // check if the card is good
        // use dispatch and set the new current card
        if (isIdentical(currentCardId,newId)){
            dispatch(change(newId))
            dispatch(removeCard(newId))
        }else{
            console.log('not identical')
            // handle UI error ?
        }
    }

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
            onDrop={e=>handleDrop(e)}
            onDragOver={e=>handleDragOver(e)}
            className='scale-[2] ml-10'>
                <Card {...currentCard}></Card>
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
