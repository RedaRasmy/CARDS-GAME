import Board from "./Board";
import CardBack from "./Card/CardBack";
import CardsGroup from "./CardsGroup";
import useCard from "@/library/Hooks/useCard";

export default function GameField() {
    const {playerCards,botCards} = useCard()
    const cardsToMap=botCards.slice(0,4)

    const plus = botCards.length > 4 ? <i className='bx bx-plus text-5xl text-white'></i> : null 

    return (
        <div className="w-full h-full flex flex-col justify-around items-center">
            {(botCards.length > 0) ? 
                <div className="flex space-x-1 items-center">
                    {cardsToMap.map(e=><CardBack key={e}/>)}
                    {plus}
                </div>
                
            : <div className="h-[104px]"></div>}
            <Board/>
            {playerCards.length > 0 ? <CardsGroup cardsIds={playerCards} /> : <div className="h-[104px]"></div>}
        </div>
    )
}
