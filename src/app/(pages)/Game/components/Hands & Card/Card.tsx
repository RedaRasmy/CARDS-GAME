import React from 'react'
import CardDesign from './CardDesign'
import {motion} from 'motion/react'
import useCard from '@/library/Hooks/useCard'

export default function Card({id,className,style}:{
    id:number,
    className?:string,
    style?:{
        x:number,
        y:number,
        d:number,
    }
}) {
    const {playWithClick } = useCard()
    return (
        <motion.div 

        whileHover={{zIndex:1000,scale:1.2}}
        onClick={()=>playWithClick(id)}
        // initial={{x:-200,y:-300}}
        animate={{
            x:style?.x,
            y:style?.y,
            rotateZ:style?.d,
            transformOrigin:'50% 100%'
        }}
        // layout
        // drag
        className={className + ' absolute cursor-pointer hover:border-2 border-green-600 rounded-md'}>
            <CardDesign id={id}/>
        </motion.div>
    )
}
