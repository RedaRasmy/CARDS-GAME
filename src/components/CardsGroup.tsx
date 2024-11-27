import React, { useEffect, useRef,  WheelEvent } from 'react'
import Card from './Card/Card'
import {horizontalListSortingStrategy, SortableContext} from '@dnd-kit/sortable';
import { SortableItem } from '@/library/dnd-kit/sortable';
import Clickable from './settings/Clickable';
import {AnimatePresence, motion} from 'motion/react'
import { useAppSelector } from '@/library/redux/store';
import Draggable from '@/library/dnd-kit/draggable';
import { DragOverlay } from '@dnd-kit/core';

export default function CardsGroup({cardsIds,activeId}:{cardsIds:number[],activeId:number}) {
    const scrollIntoLastCard = useAppSelector(state=>state.cardsFlow.scrollIntoLastCard)
    const {dragging} = useAppSelector(state=>state.settings)
    const scrollRef = useRef<HTMLDivElement>(null)
    // const cardsRef = useRef<HTMLDivElement>(null)

    function handleScroll(e:WheelEvent<HTMLDivElement>) {
        if (scrollRef.current && e.deltaY > 0 ){
            scrollRef.current.scrollLeft += 50
        }else if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 50
        }
    }

    useEffect(()=>{
        if (scrollIntoLastCard) {
            const newLastCard = scrollRef.current?.lastChild as HTMLElement
            newLastCard?.scrollIntoView({
                behavior:'smooth',
            })
        }
    },)

    return (
        <>
            <div 
            ref={scrollRef}
            onWheel={e=>handleScroll(e)}
            className='flex sm:gap-1  gap-0 p-5 space-x-1 overflow-scroll scrollbar-hide'>
                    <SortableContext
                    items={cardsIds} strategy={horizontalListSortingStrategy} >
                            {cardsIds.map((id)=>
                            // <div key={id} className={`${(i===cardsIds.length-1 && isAnimating) && 'opacity-0'}`}>
                                <Draggable key={id} id={id}>
                                    <SortableItem  id={id} >
                                        <Clickable id={id} >
                                            <AnimatePresence>
                                                <motion.div
                                                exit={{opacity:0}}
                                                transition={{duration:0.5}}
                                                >
                                                    <Card id={id} />
                                                </motion.div>
                                            </AnimatePresence>
                                        </Clickable>
                                    </SortableItem>
                                </Draggable>
                            // </div>
                            )}
                    </SortableContext>
                
            </div>
            {dragging && 
                <DragOverlay dropAnimation={{duration:100,easing:'cubic-bezier(0.18, 0.67, 0.6, 1.22)'}}>
                {activeId  ? (
                    <Card id={activeId} />
                    // <div className='w-[72px] h-[104px] border'></div>
                ) : null}
                </DragOverlay>
            }
            
        </>
    )
}
