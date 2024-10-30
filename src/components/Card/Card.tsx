import { PowerType } from "@/library/types";
import { cards } from "../../../public/cards";




export default function Card({id}:{id:number}) {
    const {number,power,color} = cards[id]

    const colorClasses: { [key: string]: string } = {
        red: 'bg-red-900',
        blue: 'bg-blue-900',
        yellow: 'bg-yellow-700',
        green: 'bg-green-900',
    };
    const backgroundColor = colorClasses[color];

    return (
        <div
        className={ `${backgroundColor}  p-[2px] w-[72px] h-[104px] 
        rounded-[4px] flex justify-center items-center flex-col 
        shadow-slate-800 border-[3px] border-black border-opacity-15 shrink-0
        `}>
            {
                number ?
                <Number>{number}</Number> :
                <Power power={power} />
            }  
            <div/>
        </div>
    )
}



function Number({children}:{children:number|undefined}){
    return(
        <div className=" bg-opacity-15 border-[3px] border-white border-opacity-5 
        rounded-full
        w-14 h-[70px] flex justify-center items-center">
            <h1 className="font-extrabold opacity-50 text-[50px] font-mono select-none">{children}</h1>
        </div>
    )
}

function Power({power}:{power:PowerType|undefined}) {

    if (power === 'JUDGE') return <Judge/>
    if (power === 'SKIP') return <i className='bx bx-block text-[60px] opacity-50 rotate-90 font-bold text-black'/>
    if (power === '+3') return <h1 className="font-bold text-4xl text-black  text-opacity-50 -rotate-3 select-none">+3</h1>
}


function Judge(){
    return (
        <div className="border-2 rounded-[2px] border-black border-opacity-20 w-12 h-12 grid grid-cols-2 grid-rows-2">
            <div className="bg-red-900 w-full h-full"></div>
            <div className="bg-blue-900 w-full h-full"></div>
            <div className="bg-yellow-700 w-full h-full"></div>
            <div className="bg-green-900 w-full h-full relative">
                <h1 className=" pointer-events-none select-none absolute text-3xl -top-[18px] -left-[12px] font-extrabold text-black opacity-50 font-serif">X</h1>
            </div>
            
        </div>
    )
}