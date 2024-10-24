import useCard from "@/library/Hooks/useCard"

export default function CardBack() {
    const {playerTakeCard} = useCard()
    return (
        <div 
        onClick={playerTakeCard}
        className={`bg-card-back bg-cover bg-center p-[2px] w-[72px] h-[104px]
        rounded-[4px] flex justify-center items-center flex-col 
        shadow-md shadow-slate-800  border-black border-opacity-15
        `}>
        </div>
    )
}
