import React, { ReactNode } from 'react'
import {motion,AnimatePresence} from 'motion/react'


export default function Letter({children}:{
    children?:ReactNode
}) {
    
    return (
        <motion.div 
            exit={{opacity:0,scale:0}}
            initial={{opacity:0,scale:0}}
            animate={{opacity:1,scale:1}}
            transition={{duration:0.3}}
            className=' bg-[url("/images/letter.png")] bg-transparent bg-no-repeat bg-contain 
            w-[50%] h-[100%] flex justify-center items-center bg-center '>
                <div className='w-[max(290px,27%)] h-[65%]  flex justify-center items-center flex-col '>
                    {children}
                </div>
        </motion.div>
    )
}
