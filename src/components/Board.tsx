
import { useAppSelector } from '@/library/redux/store'
import Card from './Card/Card'
import CardBack from './Card/CardBack'
import useCard from '@/library/Hooks/useCard'
import Droppable from '@/library/dnd-kit/droppable'
import GameHistory from './GameHistory'
import { ReactNode } from 'react'
import Image from 'next/image'

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
        <BoardContainer>
            <div className='sm:block hidden lg:hidden'/>
            <div className='hidden lg:block'>
                <GameHistory/>
            </div>

            <div 
            className=' scale-[1.8]  flex flex-col justify-center items-center'>
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
        </BoardContainer>
    )
}




function BoardContainer({children}:{
    children:ReactNode
}) {
    return (
        <div className='board sm:w-[clamp(300px,70%,1000px)] w-full sm:min-h-[40%] min-h-[30%]
        sm:border-2 border-white border-opacity-10 sm:rounded-[10px] 
        justify-between items-center  px-6 border-y-2 text-white flex-wrap
        grid sm:grid-cols-3 grid-cols-2
        '>
            {children}
            {/* <div className='flex items-center'>
                <Infos type='player' infos={{name:'reda'}}/>
                <VS/>
                <Infos type='enemey' infos={{name:'bot'}} />
            </div> */}
        </div>
    )
}

function VS(){
    return (
        <p className='font-bold text-[30px] text-yellow-500 rotate-6'>VS</p>
    )
}

function Infos({type,infos}:{
    type: 'player' | 'enemey',
    infos:{
        src?:string,
        name:string
    }
}) {
    if (type ==='player') return (
        <div className='flex -space-x-10 items-center'>
            <Avatar src={infos.src} />
            <NameField name={infos.name} />
        </div>
    )
    return (
        <div className='flex -space-x-10 items-center'>
        <NameField name={infos.name} />
        <Avatar src={infos.src} />
    </div>
    )
}

export function Avatar({src}:{
    src?:string
}) {
    return (
        <div className="avatar  rounded-full">
            <div className=" rounded-full bg-opacity-20  bg-white">
                <Image alt='' src={src || '/images/default-avatar.png'} width={40}height={40} />
            </div>
        </div>
    )
}

function NameField({name}:{
    name:string
}) {
    return (
        <div className='min-w-[100px] px-12 h-[33px] bg-opacity-20  bg-white rounded-md '>
            <p className='text-[20px] font-bold text-center'>{name}</p>
        </div>
    )
}