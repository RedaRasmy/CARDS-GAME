import React, { useEffect, useRef, WheelEvent } from 'react'
import Card from './Card/Card'
import {horizontalListSortingStrategy, SortableContext} from '@dnd-kit/sortable';
import { SortableItem } from '@/library/dnd-kit/sortable';
import Clickable from './settings/Clickable';
import useCard from '@/library/Hooks/useCard';

export default function CardsGroup({cardsIds}:{cardsIds:number[]}) {
    const {scrollIntoView} = useCard()
    const scrollRef = useRef<HTMLDivElement>(null)

    function handleScroll(e:WheelEvent<HTMLDivElement>) {
        if (scrollRef.current && e.deltaY > 0 ){
            scrollRef.current.scrollLeft += 50
        }else if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 50
        }
    }

    useEffect(()=>{
        if (scrollIntoView) {
            const newLastCard = scrollRef.current?.lastChild as HTMLElement
            newLastCard?.scrollIntoView({
                behavior:'smooth',
            })
        }
    },)

    return (
        <div 
        ref={scrollRef}
        onWheel={e=>handleScroll(e)}
        className='flex space-x-1 overflow-hidden '>
            <SortableContext items={cardsIds} strategy={horizontalListSortingStrategy} >
                {cardsIds.map(id=>
                    <SortableItem key={id} id={id}>
                        <Clickable id={id} key={id}>
                            <Card id={id} />
                        </Clickable>
                    </SortableItem>
                )}
            </SortableContext>
        </div>
    )
}
