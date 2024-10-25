import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Board from "./Board";
import CardBack from "./Card/CardBack";
import CardsGroup from "./CardsGroup";
import useCard from "@/library/Hooks/useCard";
import { useAppDispatch } from "@/library/store";
import { changeCardOrder } from "@/library/slices/cardsFlow";

export default function GameField() {
    const dispatch = useAppDispatch()
    const {playerCards,botCards} = useCard()
    const cardsToMap=botCards.slice(0,4)
    const plus = botCards.length > 4 ? <i className='bx bx-plus text-5xl text-white'></i> : null 
    const getCardIndex = (id:number) => playerCards.findIndex(cardId=> cardId === id)

    const handleDragEnd = (event:DragEndEvent)=>{
        const {active,over} = event
        const i1 = getCardIndex(Number(active.id))
        const i2 = getCardIndex(Number(over?.id))
        if (active.id === over?.id) return;
        dispatch(changeCardOrder({index1:i1,index2:i2}))
    }

    return (
        <div className="w-full h-full flex flex-col justify-around items-center">
            <DndContext onDragEnd={handleDragEnd}>
                {(botCards.length > 0) ? 
                    <div className="flex space-x-1 items-center">
                        {cardsToMap.map(e => <div className="pointer-events-none"key={e}><CardBack/></div>)}
                        {plus}
                    </div>
                    
                : <div className="h-[104px]"></div>}
                <Board/>
                {playerCards.length > 0 ? <CardsGroup cardsIds={playerCards} /> : <div className="h-[104px]"></div>}
            </DndContext>
            
        </div>
    )
}
