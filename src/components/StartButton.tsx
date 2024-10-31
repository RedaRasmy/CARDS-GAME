export default function StartButton({handleClick,text}:{handleClick:()=>void,text:string}) {
    return (
        <button 
        onClick={handleClick}
        className=" btn btn-outline btn-secondary px-7 w-[50%]">
            {text}
        </button>
    )
}