import useCard from "@/library/Hooks/useCard"

export default function CardBack() {
    const {playerTakeCard,BotPlay,currentCardId} = useCard()
    const handleTake = () =>{
        const isPlayed = playerTakeCard()
        if (isPlayed) {
            BotPlay(currentCardId)
        }
    }
    return (
        <div
        onClick={handleTake}
        className={`bg-card-back bg-cover bg-center p-[2px] w-[72px] h-[104px]
        rounded-[4px] flex justify-center items-center flex-col 
        shadow-md shadow-slate-800  border-black border-opacity-15
        `}>
        </div>
    )
}
