import {  MouseEventHandler, ReactNode } from "react"


type OptionProps = {
    children? : ReactNode,
    onClick? : MouseEventHandler<HTMLButtonElement>
}
export default function Option({children,onClick}:OptionProps){
    return (
        <button onClick={onClick} className='text-white hover:text-orange-300 duration-300'>
            --{children}--
        </button>
    )
}