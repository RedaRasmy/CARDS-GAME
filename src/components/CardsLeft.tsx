
import React from 'react'
import Card from './Card/Card'
import { cards } from '../../public/cards'

export default function CardsLeft() {
    

    return (
        <div>
            {cards.map((c)=>{
                return (
                    <div key={c.id} className='absolute'>
                        <Card id={c.id} number={c.number} color={c.color} power={c.power}></Card>
                    </div>
                )
            })
            }
        </div>
    )
}
