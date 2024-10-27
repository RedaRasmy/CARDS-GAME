import useCard from "@/library/Hooks/useCard"
import { useAppSelector } from "@/library/redux/store"

export default function CardBack() {
    const gameIsOn = useAppSelector(state=>state.gameFlow.gameIsOn)
    const playerTurn = useAppSelector(state=>state.gameFlow.playerTurn)
    const {playerTakeCard,BotPlay,requirementsValue} = useCard()
    const handleTake = () =>{
        if (gameIsOn){
            playerTakeCard()
            if (!playerTurn) {
                BotPlay(requirementsValue)
            }
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
