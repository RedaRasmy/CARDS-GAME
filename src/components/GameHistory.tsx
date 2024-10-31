import requirements from '@/library/functions/requirements'
import { useAppSelector } from '@/library/redux/store'
import React, { useEffect, useRef } from 'react'
import { cards } from '../../public/cards'

export default function GameHistory() {
    const turns = useAppSelector(state=>state.gameFlow.turns)

    function cardToString(id:number){
        if (id%10<7) {
            return `${requirements(id)[0]}_${requirements(id)[1]}`
        } else {
            const power = cards[id].power
            return `${requirements(id)[0]}_${power}`
        }
    }
    const list = useRef<HTMLUListElement>(null)
    
    useEffect(()=>{
        if (list.current) {
            const lastTurn = list.current.lastChild as HTMLElement
            lastTurn?.scrollIntoView()
        }
    })

    return (
        <ul ref={list} className=' text-xs
        max-h-[200px] overflow-y-scroll scrollbar-hide opacity-50 space-y-2'>
            {turns.map((turn,i)=>
                <li key={i} className='flex'> 
                    &gt; Turn {i+1} --{ }
                    [{turn.player}] --
                    {
                        turn.action === '+Card' 
                        ? <p> take card </p>
                        : 
                        <p>
                            played : {cardToString(turn.cardId)}
                        </p>
                    }
                </li>
            )}
        </ul>
    )
}
