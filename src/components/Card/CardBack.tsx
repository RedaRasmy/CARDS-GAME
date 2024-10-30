import useCard from "@/library/Hooks/useCard"
import { useAppSelector } from "@/library/redux/store"

export default function CardBack({toTake=true}) {
    const {gameIsOn,playerTurn,modalOpen} = useAppSelector(state=>state.gameFlow)
    const indicators = useAppSelector(state=>state.settings.indicators)
    const {playerTakeCard,BotPlay,requirementsValue,goodCards} = useCard()
    // const modalOpen = useAppSelector(state=>state.gameFlow.modalOpen)
    const handleTake = () =>{
        // console.log('GAME IS ON: ',gameIsOn)
        if (gameIsOn && !modalOpen ){
            playerTakeCard()
            if (!playerTurn) {
                BotPlay(requirementsValue)
            }
        }
    }
    const style = (goodCards.length === 0 && toTake && gameIsOn && !modalOpen && indicators) && 'my-card-border'
    return (
        <div
        onClick={handleTake}
        className={`${style}  bg-card-back bg-cover bg-center box-border w-[72px] h-[104px]
        rounded-[4px] border-[3px] 
        border-black border-opacity-15 touch-manipulation
        `}>
        </div>
    )
}
