import { useEffect, useState } from 'react'

export default function useDevice() {
    const [touchDevice,setTouchDevice] = useState(false)
    const [landscape ,setLandscape] = useState(false)

    useEffect(()=>{
        const updateOrientation = () => {
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

    console.log('landscape:',landscape)
    console.log('touch:',touchDevice)


    return {
        touchDevice,
        landscape
    }
}
