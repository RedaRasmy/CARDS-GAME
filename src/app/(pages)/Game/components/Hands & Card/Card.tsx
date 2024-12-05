import React, { useState } from 'react'
import CardDesign from './CardDesign'
import {AnimatePresence, motion} from 'motion/react'
import useCard from '@/library/Hooks/useCard'
// import Draggable from '@/library/dnd-kit/draggable'
// import isIdentical from '@/library/functions/isIdentical'
// import requirements from '@/library/functions/requirements'
import useGame from '@/library/Hooks/useGame'
import getStackPos from '@/library/functions/getStackPos'

export default function Card({id,className,style}:{
    id:number,
    className?:string,
    style?:{
        x:number,
        y:number,
        d:number,
        delay:number
    }
}) {
    const {playWithClick,} = useCard()
    const {gameIsOn} = useGame()
    // const stackPos = document.getElementById('stack')?.getBoundingClientRect()
    const grid = document.getElementById('grid')?.getBoundingClientRect()
    const center = grid && {y : -grid.height*0.35}
    // const Y = (stackPos && grid) &&  (-stackPos.y +grid.height*0.15 -104 ) 
    // const X = (grid) &&  (-  grid.width/6 -36)
    const {X,Y} = getStackPos()
    const [isVisible, ] = useState(true);
    const handlePlay = () => {
        if (gameIsOn) {
            playWithClick(id)
            // const isGood = isIdentical(id,requirements(currentCardId))
            // setIsVisible(!isGood)
        }
    }
    return (
        // i think i should use presense to animate play card while exit
        <AnimatePresence> 
            {isVisible && 
            // <Draggable id={id}>
                <motion.div 
                key={id}
                whileHover={{zIndex:1000,scale:1.1,}}
                onClick={handlePlay}
                exit={{
                    x:0,
                    y:center?.y,
                    transition:{duration:0.5},
                    scale:1.5
                }}
                initial={{x:X,y:Y}}
                animate={{
                    x:style?.x,
                    y:style?.y,
                    rotateZ:style?.d,
                    transformOrigin:'50% 100%',
                    translate:'-50% -50%',
                }}
                transition={{duration:0.2,delay:style?.delay}}
                layout
                // drag
                className={className + ' absolute left-1/2 top-1/2  cursor-pointer hover:border-2 border-green-600 rounded-md'}>
                    <CardDesign id={id}/>
                </motion.div>
            // </Draggable>
            }
        </AnimatePresence>
    )
}
