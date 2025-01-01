import { useEffect, useState } from 'react'

export default function useDevice() {
    const [touchDevice,setTouchDevice] = useState(false)
    const [landscape ,setLandscape] = useState(false)
    const [screen,setScreen] = useState<undefined | {width:number,height:number}>(undefined)
    const [screenRatio,setScreenRatio] = useState<number|undefined>(undefined)

    useEffect(()=>{
        const updateOrientation = () => {
            setScreenRatio(window.innerWidth/window.innerHeight)
            setScreen({width:window.innerWidth,height:window.innerHeight})
            if (window.innerHeight < window.innerWidth) {
                setLandscape(true);
            } else {
                setLandscape(false);
            }
        };

        if(typeof window !== 'undefined'){
            if (window.matchMedia("(pointer: coarse)").matches){
                setTouchDevice(true)
            }
            updateOrientation()
            window.addEventListener('resize', updateOrientation)
        }
        return () => {
            window.removeEventListener('resize' , updateOrientation)
        }
    },[])

    // console.log('landscape:',landscape)
    // console.log('touch:',touchDevice)

    return {
        touchDevice,
        landscape,
        screenRatio,
        screen
    }
}
