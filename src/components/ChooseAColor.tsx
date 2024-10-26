import useCard from '@/library/Hooks/useCard'
import React from 'react'

export default function ChooseAColor() {
    const {colorRef,chooseColor} = useCard()
    function handleChoose(str:string){
        chooseColor(str)
        colorRef.current?.close()
    }
    return (
        <dialog
        // open
        ref={colorRef}
        className='shadow-xl rounded-lg grid bg-transparent grid-cols-2 grid-rows-2 w-[300px] h-[300px] gap-2 z-50'
        >
            <div
            onClick={()=>handleChoose('red')}
            className="bg-red-900  rounded-lg hover:scale-[1.1] cursor-pointer"/>
            <div 
            onClick={()=>handleChoose('blue')}
            className="bg-blue-900 rounded-lg hover:scale-[1.1] cursor-pointer"/>
            <div 
            onClick={()=>handleChoose('yellow')}
            className="bg-yellow-700 rounded-lg hover:scale-[1.1] cursor-pointer"/>
            <div 
            onClick={()=>handleChoose('green')}
            className="bg-green-900 rounded-lg hover:scale-[1.1] cursor-pointer"/>
        </dialog>
    )
}
