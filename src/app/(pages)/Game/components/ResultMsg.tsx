export default function ResultMsg({result,isVisible}:{
    result:string,
    isVisible:boolean
}){
    const color = (result === 'win') ? 'text-yellow-500' : 'text-red-500'
    const msg = (result === 'win') ? 'YOU WIN' : 'YOU LOSE'
    return (
        <h1 
        className={`text-9xl font-extrabold ${color} 
        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 z-50
        ${isVisible ? "inline" : "hidden"}
        `}>
            {msg}
        </h1>
    )
}