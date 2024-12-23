import {motion} from 'motion/react'
import Image from 'next/image'

export default function Label({className,image,name,cardsNumber,direction,timer=false}:{
    image?:string,
    name:string,
    cardsNumber:number,
    className?:string,
    direction?:string,
    timer?:boolean
}) {
    const imageSrc = image || '/images/default-avatar.png'
    const initial = {x:0,y:0}
    if (direction === 'left'){
        initial.x = -300
    } else if (direction === 'top') {
        initial.y = -300
    } else if (direction === 'right') {
        initial.x = 300
    } else if (direction === 'bottom') {
        initial.y = 300
    }
    const timerClass = timer ? 'timer' : ''
    return (
        <motion.div 
        initial={initial}
        animate={{x:0,y:0}}
        // transition={{duration:1}}
        className={`${className} lg:scale-100 scale-50 justify-center items-center top-0 left-full w-[300px] h-[116px] 
        bg-[url('/images/CadrePlayerName.png')] bg-cover bg-no-repeat`}
        >
            <div className="relative w-full h-full">
                {/* PIC AND TIMER */}
                <div className={`bg-black size-[51px] top-[43px] left-[28px] rounded-full 
                absolute flex justify-center items-center ${timerClass}`}>
                    <div className='size-[85%] bg-black rounded-full '>
                        <Image  className='bg-cover rounded-full p-1' fill src={imageSrc}  alt='' />
                    </div>
                </div>
                {/* NAME */}
                <p className="absolute top-[46px] left-[90px] flex justify-center w-[120px] h-[24px]">
                    {name}
                </p>
                <p
                className="text-white font-sans font- text-sm absolute p-2 top-[78px] left-[63px] bg-red-900 rounded-full size-5 border border-black flex justify-center items-center"
                >
                    {cardsNumber}
                </p>
            </div>
        </motion.div>
    )
}
