import { ReactNode } from "react"


type ContainerProps = {
    element: ReactNode,
    number:number|undefined,
}
export function Container({element,number}:ContainerProps){
    
    if (number===1) return (
        <div className="flex justify-center items-center">
            <div className="scale-[3.3]">
                {element}
            </div>
        </div>
    )
    if (number===2) return (
        <div className="flex justify-center items-center flex-col gap-6 pb-1">
            <div className="scale-[2]">
                {element}
            </div>
            <div className="scale-[2]">
                {element}
            </div>
        </div>
    )
    if (number===3) return (
        <div className="grid grid-cols-3 grid-rows-2 flex-col gap-y-2 pb-1">
            <div></div>
            <div className="scale-[1.5]">
                {element}
            </div>
            <div></div>
            <div className="scale-[1.5]">
                {element}
            </div>
            <div></div>
            <div className="scale-[1.5]">
                {element}
            </div>
        </div>
    )
    if (number===4) return (
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <div className="scale-[1.5]">{element}</div>
                <div className="scale-[1.5]">{element}</div>
                <div className="scale-[1.5]">{element}</div>
                <div className="scale-[1.5]">{element}</div>
            </div>
    )
    const EmptyDiv = <div></div>
    if (number===5) return (
        <div className="grid grid-cols-3 grid-rows-3 h-2/3">
            {
                [
                    element,EmptyDiv,element,
                    EmptyDiv,element,EmptyDiv,
                    element,EmptyDiv,element,
                ].map((e,i)=>{
                    return (
                        <div key={i} className="scale-[1.4] flex justify-center items-center ">
                            {e}
                        </div>
                    )
                })
            }
        </div>
    )
    if (number===6) return (
        <div className="grid grid-cols-2 grid-rows-3 h-2/3 gap-2">
            {
                Array.from({length:6},(_,i)=>i).map((e)=> (
                        <div key={e} className="scale-[1.3] flex justify-center items-center">
                            {element}
                        </div>
                    )
                )
            }
        </div>
    )
    if (number===7) return (
        <div className="grid grid-cols-3 grid-rows-3 h-2/3 gap-y-2 gap-x-[5px] ">
            {
                [
                    element,EmptyDiv,element,
                    element,element,element,
                    element,EmptyDiv,element,
                ].map((e,i)=>{
                    return (
                        <div key={i} className="scale-[1.17] flex justify-center items-center">
                            {e}
                        </div>
                    )
                })
            }
        </div>
    )
}