import { closestCenter, DndContext, PointerSensor,useSensor,useSensors  } from "@dnd-kit/core";
import Board from "./Board";
import CardBack from "./Card/CardBack";
import CardsGroup from "./CardsGroup";
import useCard from "@/library/Hooks/useCard";
import { useAppDispatch, useAppSelector } from "@/library/redux/store";
import StartButton from "./StartButton";
import { changeTheGameTo } from "@/library/redux/slices/cardsFlow";


export default function GameField() {
    const gameIsOn = useAppSelector(state=>state.cardsFlow.gameIsOn)
    const dipsatch = useAppDispatch()
    const {playerCards,botCards,handleDragEnd} = useCard()
    const cardsToMap = botCards.slice(0,4)
    const plus = botCards.length > 4 ? <i className='bx bx-plus text-5xl text-white'></i> : null 

    const startTheGame = () => {
        dipsatch(changeTheGameTo(true))
    }
    const win = playerCards.length === 0
    const lose = botCards.length ===0

    // if (win) {
    //     dipsatch(changeTheGameTo(false))
    // }

    // Define Sensors 
    const sensors = useSensors(
        useSensor(PointerSensor,{
            activationConstraint:{
                distance:10,
            }
        })
    )

    if (gameIsOn) return (
        <div className="w-full h-full flex flex-col justify-around items-center">
            <DndContext 
            collisionDetection={closestCenter} 
            onDragEnd={handleDragEnd}
            sensors={sensors}
            >
                {(botCards.length > 0) ? 
                    <div className="flex space-x-1 items-center">
                        {cardsToMap.map((e:number) => <div className="" key={e}><CardBack/></div>)}
                        {plus}
                    </div>
                    
                : <div className="h-[104px]"></div>}
                {win && <h1 className="text-7xl text-yellow-500 absolute">YOU WIN</h1>}
                {lose && <h1 className="text-7xl text-yellow-500 absolute">YOU LOSE</h1>}
                <Board/>
                {playerCards.length > 0 ? <CardsGroup cardsIds={playerCards} /> : <div className="h-[104px]"></div>}
            </DndContext>
            
        </div>
    )
    return (
        <div>
            {win && <h1 className="text-7xl text-yellow-500">YOU WIN</h1>}
            <StartButton handleClick={startTheGame}/>
        </div>
        )
    
}
