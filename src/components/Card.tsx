import { Flag , Money, Star, Time ,  } from "./DefaultTypes"


type CartProps ={
    number : number,
    type: string
}


export default function Card({number,type}:CartProps) {
    let Element:JSX.Element
    if (type === 'Flag'){
        Element = <Flag/>
    }
    if (type === 'Time'){
        Element =  <Time/>
    }
    if (type === 'Money'){
        Element =  <Money/>
    }
    if (type === 'Star'){
        Element =  <Star/>
    }
    



    return (
        <div
        className='p-2 w-40 h-72 bg-neutral-400 rounded flex justify-between items-center flex-col 
        shadow-md shadow-slate-800 border-[3px] border-red-900
        '
        >
            <div className="w-full flex justify-end">
                <Number>{number}</Number>
            </div>
            <div className=" gap-2 space-y-0  flex justify-center items-center flex-wrap rotate-90">
                {Array.from({length:number} , (_,i) =>i ).map(()=>(
                    Element
                ))}
            </div>
            <div></div>
        </div>
    )
}


function Number({children}:{children:number}){
    return(
        <div className="bg-amber-400 rounded-full w-8 h-8 flex justify-center items-center">
            <h1 className="font-semibold text-xl">{children}</h1>
        </div>
    )
}
