import React from 'react'
import Card from './Card'
import { VertedCard } from '../Stack'
import {motion} from 'motion/react'

export default function Hand({cardsIds}:{
    cardsIds:number[],
}) {
    const midle =  Math.floor(cardsIds.length/2) 
    // const gapX = cardsIds.length > 0 ? 200/cardsIds.length : 0
    const gapX = window.matchMedia('(min-width: 1024px)').matches ? 50 : 38
    // const gapY = cardsIds.length > 0 ? 10/cardsIds.length :0
    const gapY = 1

    return (
        <>
            <motion.div
            className='relative flex  w-full h-full'
            transition={{duration:1}}
            >
            {
                cardsIds.map((id,i)=>(
                    <Card 
                    key={i}
                    id={id} 
                    style={{
                        x:(i - midle) * gapX,
                        y:Math.abs(midle-i)*gapY,
                        // d:5,
                        d:(i-midle) * 0.5,
                        delay:i/100
                    }}
                    />
                ))
            }
            </motion.div>
        </>
    )
}


export function OpponentHand({num}:{
    num:number
}) {
    const midle = Math.floor(num/2)
    const gapX = 100/num
    const gapY = 10/num
    return (
        <>
            { Array.from({length:num},(e,i)=>i).map((e)=>(
                <VertedCard 
                style={{
                    display:'absolute',
                    transformOrigin:'50% 100%',
                    transform:`
                        translate(
                            ${(e - midle) * gapX}px ,
                            ${Math.abs(midle-e)*gapY}px
                        )
                        rotate(${(e-midle) * 10}deg)
                    `
                }}
                key={e}/>
            ))}
        </>
    )
}