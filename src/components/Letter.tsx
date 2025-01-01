import React, { ReactNode,  } from 'react'
import {motion,} from 'motion/react'
import useDevice from '@/library/Hooks/useDevice'


export default function Letter({children}:{
    children?:ReactNode
}) {
    // const [isHidden,setIsHidden] = useState(false)
    // useEffect(()=>{
    //     setIsHidden(window.innerWidth/window.innerHeight < 1)
    // },[])

    const {landscape} = useDevice()

    return (
        <motion.div 
            exit={{opacity:0,scale:0}}
            initial={{opacity:0,scale:0}}
            animate={{opacity:1,scale:1}}
            transition={{duration:0.3}}
            className={` ${!landscape ? 'bg-transparent' : 'bg-[url("/images/letter.png")]'}  bg-transparent bg-no-repeat bg-contain 
            w-[50%] h-[100%] flex justify-center items-center bg-center `}>
                <div className='w-[max(290px,27%)] h-[65%]  flex justify-center items-center flex-col '>
                    {children}
                </div>
        </motion.div>
    )
}
