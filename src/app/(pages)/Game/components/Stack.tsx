import useCard from "@/library/Hooks/useCard"
import {  CSSProperties } from "react"
import {motion} from 'motion/react'
// import getStackPos from "@/library/functions/getStackPos"

export default function Stack() {
    const {cardsLeft,playerTakeCard} = useCard()
    if (cardsLeft.length) return (
        <motion.div
        id="stack"
        onClick={playerTakeCard}
        initial={{y:-500,x:-500}}
        animate={{
            y:0,x:0
        }}
        className={`bg-card-back bg-cover bg-center box-border lg:w-[72px] lg:h-[104px] w-[54px] h-[78px]
        rounded-[4px] border-[3px] shadow-2xl shadow-black 
        border-black border-opacity-15 touch-manipulation cursor-pointer
        `}>
        </motion.div>
    )
}

export function VertedCard({style}:{
    style?:CSSProperties
}) {
    // const {X,Y} = getStackPos()
    return (
        <motion.div
        // initial={{x:X,y:Y}}
        // animate={{x:0,y:0}}
        style={style}
        className={`bg-card-back bg-cover bg-center box-border lg:w-[72px] lg:h-[104px] w-[54px] h-[78px]
        rounded-[4px] border-[3px] shadow-2xl shadow-black absolute z-[-1]
        border-black border-opacity-15 
        `}>
        </motion.div>
    )
}