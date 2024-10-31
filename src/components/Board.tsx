// import React, { DragEvent} from 'react'
import { useAppSelector } from '@/library/redux/store'
import Card from './Card/Card'
import CardBack from './Card/CardBack'
import useCard from '@/library/Hooks/useCard'
import Droppable from '@/library/dnd-kit/droppable'
import GameHistory from './GameHistory'

export default function Board() {
    const {cardsLeft,currentCardId,requirementsValue,playerCards,botCards} = useCard()
    const pCards = playerCards.length
    const bCards = botCards.length
    const showReqSetting = useAppSelector(state=>state.settings.alwaysShowRequirements)
    const showReq = showReqSetting || (currentCardId % 10 === 8) // only if is a judge card

    const cardsLeftNumber = cardsLeft.length
    const ReqMsg = `${requirementsValue[0]} ${requirementsValue[1] ?" | "+ requirementsValue[1]:'' } `
    // Weird 
    // function handleDragOver(e:DragEvent){
    //     e.preventDefault()
    // }


    return ( // create board container , ...
        <div className='board sm:w-[clamp(300px,70%,1000px)] w-full sm:min-h-[40%] min-h-[30%]
        sm:border-2 border-white border-opacity-10 sm:rounded-[10px] 
        flex justify-between items-center  px-6 border-y-2 text-white flex-wrap
        '>
            <div className='sm:block hidden lg:hidden'/>
            <div className='hidden lg:block'>
                <GameHistory/>
            </div>
            <div 
            className='lg:-ml-32 sm:ml-28 ml-10 scale-[1.8]  flex flex-col justify-center items-center'>
                {showReq && <p className='font-mono opacity-50 text-[12px]'>{ReqMsg}</p>}
                {currentCardId !== null &&
                <Droppable>
                    <Card id={currentCardId} ></Card>
                </Droppable>
                }
            </div>
            
            <div className=' flex flex-col items-center mt-2 justify-between py-2 h-full'>
                <div className='h-[50px]'/>
                <div className='flex flex-col items-center'>
                    <div className='cursor-pointer'>
                        <CardBack/>
                    </div>
                    <p className='opacity-50 mt-1' title='Cards left'>&lt; <span>{cardsLeftNumber}</span> &gt;</p>
                </div>
                <div className='flex justify-end flex-col h-[50px] opacity-50 py-[5px]'>
                    <p>bot : {bCards} card{bCards > 1 && 's'}</p>
                    <p>player : {pCards} card{pCards > 1 && 's'}</p>
                </div>
            </div>
        </div>
    )
}

// function CardsIndicator