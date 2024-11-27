import { ReactNode } from "react"

///////////// FIRST ROW
export function FirstCorner({children}:{children?:ReactNode}) {
    return (
        <div className="translate-x-[15%] translate-y-[55%] origin-bottom-left scale-y-[-1] -rotate-[60deg] flex justify-center items-center">
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
        <div className=" absolute left-0 bottom-0 flex justify-center items-center">
            {children}
        </div>
    )
}
export function SecondCorner({children}:{children?:ReactNode}) {
    return (
        <div className="translate-x-[-15%] translate-y-[55%] origin-bottom-right scale-y-[-1] rotate-[60deg] flex justify-center items-center">
            {children}
        </div>
    )
}
///////////// SECOND ROW
export function LeftName({children}:{children?:ReactNode}) {
    return (
        <div className=" flex justify-center items-center">
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
        <div className=" flex justify-center items-center">
            {children}
        </div>
    )
}
export function FourthCorner({children}:{children?:ReactNode}) {
    return (
        <div className=" p-5 flex justify-end">
            {children}
        </div>
    )
}
