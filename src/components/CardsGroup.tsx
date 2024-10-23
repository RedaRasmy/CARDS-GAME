import React from 'react'
import { cards } from '../../public/cards'
import { CardType } from '@/library/types'
import Card from './Card/Card'

export default function CardsGroup({cardsIds}:{cardsIds:number[]}) {
    return (
        <div className='flex gap-1 flex-wrap'>
            {cardsIds.map(id=>{
                const card:CardType = cards[id]
                return <Card {...card }key={id} />
            }
            )}
        </div>
    )
}
