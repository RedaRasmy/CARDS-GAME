import React, { useState } from 'react'
import Card from './Card'
import { VertedCard } from '../Stack'
import {motion} from 'motion/react'

export default function Hand({cardsIds,num=0}:{
    cardsIds?:number[],
    num?:number
}) {
    const cards =  cardsIds || []
    const midle = cards.length > 0 ? Math.floor(cards.length/2) : Math.floor(num/2)
    const gapX = cards.length > 0 ? 20/cards.length : 100/num
    const gapY = cards.length > 0 ? 10/cards.length : 10/num
    console.log(midle,gapX)
    const initialPos = {
        gapX:gapX,
        gapY:gapY,
        deg:2,
    }
    const [position,setPosition] = useState(initialPos)
    function handleHover(){
        setPosition(prev => ({
            gapX:prev.gapX*10,
            gapY:prev.gapY*-15,
            deg:prev.deg
        }))
    }
    return (
        <div className='relative h-full w-full flex justify-center items-center'>
            <motion.div
            onHoverStart={handleHover}
            onHoverEnd={()=>setPosition(initialPos)}
            whileHover={{

            }}
            >
            {
                cards.map((id,i)=>(
                    <Card 
                    key={i}
                    id={id} 
                    style={{
                        x:(i - midle) * position.gapX,
                        y:Math.abs(midle-i)*position.gapY,
                        d:(i-midle) * position.deg
                    }}
                    />
                ))
            }
            </motion.div>
            {
                Array.from({length:num},(e,i)=>i).map((e)=>(
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
                ))
            }
        </div>
    )
}
