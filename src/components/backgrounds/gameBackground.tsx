import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { ReactNode, useEffect } from "react"
import {Stars} from '@react-three/drei'
import { Canvas } from "@react-three/fiber"

const colors = ['#DD335C','#13FFAA','#CE84CF','#1E67C6']
export default function GameBackground({children}:{children:ReactNode}) {
    const color = useMotionValue(colors[0])
    const backgroundImage = useMotionTemplate`radial-gradient(115% 125% at 50% 0%,#020617 50%,${color})`
    useEffect(()=>{
        animate(color,colors, {
            ease:'easeInOut',
            duration:10,
            repeat:Infinity,
            repeatType:"mirror"
        })
    },[color])
    return (
        <motion.div style={{
            backgroundImage,
        }}
        className="relative grid w-full min-h-screen py-10 bg-gray-950"
        >

            <div className="absolute inset-0 ">
            <Canvas>
                <Stars radius={50} count={2500} factor={4} fade speed={2}/>
            </Canvas>
            </div>
            {children}
        </motion.div>
    )
}
