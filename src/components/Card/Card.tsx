import { CardType, PowerType } from "@/library/types"
import { Flag , Money, Star, Time ,  } from "./DefaultTypes"
import { Container } from "./Container"





export default function Card({number,power,color}:CardType) {
    let Element = <Star/>
    if (color === 'red'){
        Element = <Flag/>
    }if (color === 'blue'){
        Element =  <Time/>
    }if (color === 'yellow'){
        Element =  <Money/>
    }


    const colorClasses: { [key: string]: string } = {
        red: 'bg-red-900',
        blue: 'bg-blue-900',
        yellow: 'bg-yellow-700',
        green: 'bg-green-900', // Default background
        black : 'bg-black'
    };
    const backgroundColor = colorClasses[color];

    return (
        <div
        className={ `${backgroundColor} p-[2px] w-[72px] h-[104px] rounded-[4px] flex justify-between items-center flex-col 
        shadow-md shadow-slate-800 border-[3px] border-black border-opacity-15
        `}
        >
            <div className="w-full flex justify-end">
                {number && <Number>{number}</Number>}
            </div>
            {
                number ?
                <Container element={Element} number={number}/> :
                <Power power={power} />
            }   
            {
                color === 'black' && <h1 className="text-6xl opacity-60 font-serif select-none">?</h1>
            }
            <div></div>
        </div>
    )
}


function Number({children}:{children:number|undefined}){
    return(
        <div className="bg-white bg-opacity-15 border-[2px] border-white border-opacity-5 
        rounded-full w-4 h-4 flex justify-center items-center">
            <h1 className="font-extrabold opacity-40 text-[14px] font-mono">{children}</h1>
        </div>
    )
}

function Power({power}:{power:PowerType|undefined}) {

    if (power === 'JUDGE') return <Judge/>
    if (power === 'SKIP') return <i className='bx bx-block text-[60px] opacity-50 rotate-90 font-bold text-black'/>
    if (power === '+3') return <h1 className="font-bold text-4xl text-black  text-opacity-50 -rotate-3">+3</h1>
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