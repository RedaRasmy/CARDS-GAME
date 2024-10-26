import { closestCenter, DndContext, PointerSensor,useSensor,useSensors  } from "@dnd-kit/core";
import Board from "./Board";
import CardBack from "./Card/CardBack";
import CardsGroup from "./CardsGroup";
import useCard from "@/library/Hooks/useCard";
import { useAppDispatch, useAppSelector } from "@/library/redux/store";
import StartButton from "./StartButton";
import { changeTheGameTo, restartTheGame } from "@/library/redux/slices/cardsFlow";
import { useEffect, useState } from "react";


export default function GameField() {
    const gameIsOn = useAppSelector(state=>state.cardsFlow.gameIsOn)
    const dipsatch = useAppDispatch()
    const {playerCards,botCards,handleDragEnd} = useCard()
    const cardsToMap = botCards.slice(0,4)
    const plus = botCards.length > 4 ? <i className='bx bx-plus text-5xl text-white'></i> : null 

    const startTheGame = () => {
        dipsatch(changeTheGameTo(true))
    }
    const restart = ()=>{
        dipsatch(restartTheGame())
    }

    const win = playerCards.length === 0
    const lose = botCards.length ===0

    if (win || lose) {
        // dipsatch(changeTheGameTo(false))
    }

    // Define Sensors 
    const sensors = useSensors(
        useSensor(PointerSensor,{
            activationConstraint:{
                distance:10,
            }
        })
    )
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (win || lose) {
                setIsVisible(false);
            }
        }, 2000); // 2000ms = 2 seconds
    
        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [lose,win]);
    

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
                {win && <WinOrLoseMessage msg="YOU WIN" isVisible={isVisible}/> }
                {lose && <WinOrLoseMessage msg="YOU LOSE" isVisible={isVisible}/>}
                <Board/>
                {(win || lose) && <StartButton handleClick={restart}/>}
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

function WinOrLoseMessage({msg,isVisible}:{
        msg:string,
        isVisible:boolean
    }){
    return (
        <h1 
        className={`text-7xl font-extrabold text-yellow-500 
        absolute transition-opacity duration-1000
        ${isVisible ? "opacity-100" : "opacity-0"}
        `}>
            {msg}
        </h1>
    )
}
