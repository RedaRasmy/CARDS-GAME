import useCard from "@/library/Hooks/useCard"
import {  CSSProperties } from "react"
import {motion} from 'motion/react'

export default function Stack() {
    const {cardsLeft,playerTakeCard} = useCard()
    if (cardsLeft.length) return (
        <motion.div
        onClick={playerTakeCard}
        initial={{y:-500,x:-500}}
        animate={{
            y:0,x:0
        }}
        className={`bg-card-back bg-cover bg-center box-border w-[72px] h-[104px]
        rounded-[4px] border-[3px] scale-125 shadow-2xl shadow-black 
        border-black border-opacity-15 touch-manipulation cursor-pointer
        `}>
        </motion.div>
    )
}

export function VertedCard({style}:{
    style?:CSSProperties
}) {
    return (
        <div
        style={style}
        className={`bg-card-back bg-cover bg-center box-border w-[72px] h-[104px]
        rounded-[4px] border-[3px] shadow-2xl shadow-black absolute
        border-black border-opacity-15 
        `}>
        </div>
    )
}