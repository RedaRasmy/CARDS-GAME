import useCard from "@/library/Hooks/useCard"
import { useAppSelector } from "@/library/redux/store"

export default function CardBack({toTake=true}) {
    const {gameIsOn,playerTurn} = useAppSelector(state=>state.gameFlow)
    const {playerTakeCard,BotPlay,requirementsValue,goodCards} = useCard()
    const modalOpen = useAppSelector(state=>state.gameFlow.modalOpen)
    const handleTake = () =>{
        // console.log('GAME IS ON: ',gameIsOn)
        if (gameIsOn && !modalOpen ){
            playerTakeCard()
            if (!playerTurn) {
                BotPlay(requirementsValue)
            }
        }
    }
    const style = goodCards.length === 0 && toTake && gameIsOn && 'my-card-border'
    return (
        <div
        onClick={handleTake}
        className={`${style} bg-card-back bg-cover bg-center p-[2px] w-[72px] h-[104px]
        rounded-[4px] flex justify-center items-center flex-col 
        shadow-md shadow-slate-800  border-black border-opacity-15
        `}>
        </div>
    )
}
