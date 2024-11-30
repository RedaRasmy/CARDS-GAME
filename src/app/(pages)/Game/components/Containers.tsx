import { ReactNode } from "react"

export default function GameContainer({children}:{
    children:ReactNode
}) {
    return (
        <div className='game-grid  w-full h-full'>
            {children}
        </div>
    )
}
///////////// FIRST ROW
export function FirstCorner({children}:{children?:ReactNode}) {
    return (
        <div className=" translate-y-[25%] origin-bottom-left scale-y-[-1] -rotate-[60deg] flex justify-center items-center">
            {children}
        </div>
    )
}
export function Midle({children}:{children?:ReactNode}) {
    return (
        <div className="translate-y-[-15%] rotate-[180deg] flex justify-center items-center relative">
            {children}
        </div>
    )
}
export function MidleName({children}:{children?:ReactNode}) {
    return (
        <div className=" absolute rotate-180 right-[-50px] top-0 flex justify-center items-center">
            {children}
        </div>
    )
}
export function SecondCorner({children}:{children?:ReactNode}) {
    return (
        <div className=" translate-y-[25%] origin-bottom-right scale-y-[-1] rotate-[60deg] flex justify-center items-center">
            {children}
        </div>
    )
}
///////////// SECOND ROW
export function LeftName({children}:{children?:ReactNode}) {
    return (
        <div className="flex justify-center items-center">
            {children}
        </div>
    )
}
export function Table({children}:{children?:ReactNode}) {
    return (
        <div 
        className='grid grid-cols-3'
        >
            {children}
        </div>
    )
}
export function StackContainer({children}:{children?:ReactNode}) {
    return (
        <div className=" flex justify-center items-center">
            {children}
        </div>
    )
}
export function Center({children}:{children?:ReactNode}) {
    return (
        <div className=" flex justify-center items-center">
            {children}
        </div>
    )
}
export function RightName({children}:{children?:ReactNode}) {
    return (
        <div className=" flex justify-center items-center">
            {children}
        </div>
    )
}
///////////// THIRD ROW
export function ThirdCorner({children}:{children?:ReactNode}) {
    return (
        <div className=" p-5">
            {children}
        </div>
    )
}
export function Player({children}:{children?:ReactNode}) {
    return (
        <div className="relative flex justify-center items-center">
            {children}
        </div>
    )
}
export function FourthCorner({children}:{children?:ReactNode}) {
    return (
        <div className="flex">
            {children}
        </div>
    )
}
