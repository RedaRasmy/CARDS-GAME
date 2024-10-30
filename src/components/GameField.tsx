import { closestCenter, DndContext, PointerSensor,useSensor,useSensors  } from "@dnd-kit/core";
import Board from "./Board";
import CardBack from "./Card/CardBack";
import CardsGroup from "./CardsGroup";
import useCard from "@/library/Hooks/useCard";
import { useAppDispatch, useAppSelector } from "@/library/redux/store";
import StartButton from "./StartButton";
import { useEffect, useState } from "react";
import ChooseAColor from "./ChooseAColor";
import { redistribute } from "@/library/redux/slices/cardsFlow";
import { toggleGame, toggleModal } from "@/library/redux/slices/gameFlow";


export default function GameField() {
    const [firstGame,setFirstGame]= useState(false)
    const gameIsOn = useAppSelector(state=>state.gameFlow.gameIsOn)
    const dispatch = useAppDispatch()
    const {playerCards,botCards,handleDragEnd,cardsLeft} = useCard()
    const cardsToMap = botCards.slice(0,4)
    const plus = botCards.length > 4 ? <i className='bx bx-plus text-5xl text-white'></i> : null 
    const [win,setWin] = useState(false)
    const [lose,setLose] = useState(false)
    const modalOpen = useAppSelector(state=>state.gameFlow.modalOpen)

    useEffect(()=>{
        if(cardsLeft.length===0){
            if(playerCards.length > botCards.length){
                setLose(true)
                setFirstGame(true)
                dispatch(toggleGame())
            }else{
                setWin(true)
                setFirstGame(true)
                dispatch(toggleGame())
            }
        }
        if(playerCards.length === 0){
            setWin(true)
            setFirstGame(true)
            dispatch(toggleGame())
        }
        if(botCards.length === 0){
            setLose(true)
            setFirstGame(true)
            dispatch(toggleGame())
        }
    },[playerCards.length,botCards.length,dispatch,cardsLeft.length])



    const startTheGame = () => {
        dispatch(toggleGame())
    }
    const [isVisible, setIsVisible] = useState(true);

    const restart = ()=>{
        dispatch(redistribute())
        dispatch(toggleGame())
        setWin(false)
        setLose(false)
        setIsVisible(true)
    }

    // Define Sensors 
    const sensors = useSensors(
        useSensor(PointerSensor,{
            activationConstraint:{
                distance:10,
            }
        })
    )
    useEffect(() => {
        const timer = setTimeout(() => {
            if (win || lose) {
                setIsVisible(false);
            }
        }, 2000); // 2000ms = 2 seconds
    
        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [lose,win]);
    
    if (gameIsOn || firstGame) return (
        <div className="w-full h-full flex flex-col justify-around items-center">
            {modalOpen && <ChooseAColor onClose={()=>dispatch(toggleModal())} />}
            <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            >
                {(botCards.length > 0) ? 
                    <div className="flex space-x-1 items-center pointer-events-none">
                        {cardsToMap.map((e:number) => <div className="" key={e}><CardBack toTake={false}/></div>)}
                        {plus}
                    </div>
                : <div className="h-[104px]"></div>}
                {win && <WinOrLoseMessage msg="YOU WIN" isVisible={isVisible}/> }
                {lose && <WinOrLoseMessage msg="YOU LOSE" isVisible={isVisible}/>}
                <Board/>
                <div className="max-w-[90%] sm:max-w-[70%] h-[30%]">
                    <div className="flex w-full justify-center items-center h-[20%] mb-6 -mt-2">
                        {(win || lose) && <StartButton handleClick={restart} text="REPLAY"/>}
                    </div>
                    <div className="h-[50%]">
                        {playerCards.length > 0 ? <CardsGroup cardsIds={playerCards} /> : <div className="h-[104px]"></div>}
                    </div>
                </div>
                
            </DndContext>
        </div>
    )
    return (
        <div>
            {/* {win && <h1 className="text-7xl text-yellow-500">YOU WIN</h1>} */}
            <StartButton handleClick={startTheGame} text={"PLAY"}/>
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
        absolute transition-opacity duration-1000 z-50
        ${isVisible ? "opacity-100" : "opacity-0"}
        `}>
            {msg}
        </h1>
    )
}
