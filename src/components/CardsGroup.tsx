import React, { useEffect, useRef, WheelEvent } from 'react'
import Card from './Card/Card'

export default function CardsGroup({cardsIds}:{cardsIds:number[]}) {
    const scrollRef = useRef<HTMLDivElement>(null)

    function handleScroll(e:WheelEvent<HTMLDivElement>) {
        if (scrollRef.current && e.deltaY > 0 ){
            scrollRef.current.scrollLeft += 50
        }else if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 50
        }
    }

    useEffect(()=>{
        const newLastCard = scrollRef.current?.lastChild as HTMLElement
        newLastCard?.scrollIntoView({
            behavior:'smooth',
        })
    },)

    return (
        <div 
        ref={scrollRef}
        onWheel={e=>handleScroll(e)}
        className='flex space-x-1 max-w-[90%] sm:max-w-[50%] overflow-x-scroll scrollbar-hide'>
            {cardsIds.map(id=>
                <Card id={id} isDraggable={true} key={id}/>
            )}
        </div>
    )
}
