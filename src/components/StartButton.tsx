export default function StartButton({handleClick,text}:{handleClick:()=>void,text:string}) {
    return (
        <button 
        onClick={handleClick}
        className=" btn max-w-[20%] z-10  btn-warning px-7 w-[50%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        cursor-pointer
        ">
            {text}
        </button>
    )
}