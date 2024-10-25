export default function StartButton({handleClick}:{handleClick:()=>void}) {
    return (
        <button 
        onClick={handleClick}
        className="bg-red-900 px-5 py-3 rounded-md">
            START
        </button>
    )
}